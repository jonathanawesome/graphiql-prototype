import { useEditor } from '@graphiql-prototype/store';
import { Location, Token, TokenKind } from 'graphql';
import { IPosition, IRange } from 'monaco-editor';
import { AncestorField, AncestorInlineFragment, AncestorTypes } from './types';

export const getAncestorText = ({
  ancestor,
}: {
  ancestor: AncestorField | AncestorInlineFragment;
}) => {
  if (ancestor.type === 'FIELD') {
    return ancestor.field.name;
  }
  if (ancestor.type === 'INLINE_FRAGMENT') {
    return `... on ${ancestor.onType}`;
  }
  return 'WHOOPS';
};

export const hasSiblingSelections = ({
  mode,
  previousAncestor,
}: {
  mode: 'ADD' | 'REMOVE';
  previousAncestor: AncestorTypes;
}): boolean => {
  const greaterThan = mode === 'ADD' ? 0 : 1;
  if (
    (previousAncestor.type === 'INLINE_FRAGMENT' || previousAncestor.type === 'FIELD') &&
    previousAncestor.selection &&
    'selectionSet' in previousAncestor.selection &&
    previousAncestor.selection.selectionSet
  ) {
    return previousAncestor.selection.selectionSet.selections.length > greaterThan;
  }
  if (
    previousAncestor.type === 'ROOT' &&
    previousAncestor.operationDefinition &&
    'selectionSet' in previousAncestor.operationDefinition &&
    previousAncestor.operationDefinition.selectionSet
  ) {
    return (
      previousAncestor.operationDefinition.selectionSet.selections.length > greaterThan
    );
  }
  return false;
};

export const getLocationFromAncestor = ({ ancestor }: { ancestor: AncestorTypes }) => {
  if (
    (ancestor.type === 'INLINE_FRAGMENT' || ancestor.type === 'FIELD') &&
    ancestor.selection
  ) {
    return ancestor.selection.loc;
  }
  if (ancestor.type === 'ROOT' && ancestor.operationDefinition) {
    return ancestor.operationDefinition.loc;
  }
  return null;
};

export const findNextTokenKindInLocation = ({
  startToken,
  tokenKind,
}: {
  startToken: Token;
  tokenKind: TokenKind;
}): Token | null => {
  const nextToken = startToken.next;

  if (!nextToken) {
    return null;
  }

  if (nextToken.kind === tokenKind) {
    console.log('findNextTokenKindInLocation | nextToken', {
      nextToken,
      kind: nextToken.kind,
    });
    return nextToken;
  } else {
    return findNextTokenKindInLocation({ startToken: nextToken, tokenKind });
  }
};

export const getAddRangeForFieldFromLocation = ({
  hasSelections,
  location,
}: {
  hasSelections: boolean;
  location: Location;
}): IRange => {
  let range: IRange = {
    startLineNumber: 0,
    startColumn: 0,
    endLineNumber: 0,
    endColumn: 0,
  };

  if (hasSelections) {
    range = {
      startLineNumber: location.endToken.line,
      startColumn: 0,
      endLineNumber: location.endToken.line,
      endColumn: 0,
    };
  } else {
    if (location.startToken.next?.kind === TokenKind.PAREN_L) {
      // this field has arguments

      const closingParenthesis = findNextTokenKindInLocation({
        startToken: location.startToken,
        tokenKind: TokenKind.PAREN_R,
      });

      range = {
        startLineNumber: closingParenthesis?.line as number,
        startColumn: (closingParenthesis?.column as number) + 2,
        endLineNumber: closingParenthesis?.line as number,
        endColumn: (closingParenthesis?.column as number) + 3,
      };
    } else {
      //this field doesn't have arguments

      range = {
        startLineNumber: location.startToken.line,
        startColumn: location.startToken.column + location.startToken.value.length + 1,
        endLineNumber: location.startToken.line,
        endColumn: location.startToken.column + location.startToken.value.length + 1,
      };
    }
  }

  return range;
};

export const getRemoveRangeForFieldFromLocation = ({
  location,
  mode,
}: {
  location: Location;
  mode: 'ALL_SELECTIONS_ON_FIELD' | 'SINGLE_CHILD_FIELD' | 'FIELD_WITH_SELECTIONS';
}): IRange => {
  let range: IRange = {
    startLineNumber: 0,
    startColumn: 0,
    endLineNumber: 0,
    endColumn: 0,
  };

  if (mode === 'ALL_SELECTIONS_ON_FIELD') {
    range = {
      startLineNumber: location.startToken.prev?.line as number,
      startColumn: (location.startToken.prev?.column as number) - 1,
      endLineNumber: location.endToken.next?.line as number,
      endColumn: (location.endToken.next?.column as number) + 1,
    };
  }

  if (mode === 'SINGLE_CHILD_FIELD') {
    range = {
      startLineNumber: location.endToken.line,
      startColumn: 0,
      endLineNumber: location.endToken.line + 1,
      endColumn: 0,
    };
  }

  if (mode === 'FIELD_WITH_SELECTIONS') {
    range = {
      startLineNumber: location.startToken.line,
      startColumn: 0,
      endLineNumber: location.endToken.line + 1,
      endColumn: 0,
    };
  }

  return range;
};

export const getPositionAtEndOfLocation = ({
  location,
  newTextLength,
}: {
  location: Location;
  newTextLength: number;
}): IPosition => {
  const { operations: operationsEditor } = useEditor.getState().monacoEditors;

  const locationEndPosition = operationsEditor
    ?.getModel()
    ?.getPositionAt(location.end) as IPosition;

  const position = {
    ...locationEndPosition,
    column: locationEndPosition.column + newTextLength,
  };
  return position;
};
