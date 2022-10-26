import { EditorEdit, useEditor } from '@graphiql-prototype/store';
import { Kind, Location, OperationDefinitionNode, Token, TokenKind } from 'graphql';
import { IPosition, IRange } from 'monaco-editor';
import {
  AncestorArgument,
  AncestorField,
  AncestorInlineFragment,
  AncestorTypes,
} from './types';

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

// export const isExistingVariableDefinitions = () => {
//   const activeDefinition = useEditor.getState().activeDefinition;

//   if (
//     activeDefinition?.kind === Kind.OPERATION_DEFINITION &&
//     activeDefinition.variableDefinitions &&
//     activeDefinition.variableDefinitions.length > 0
//   ) {
//     return true;
//   }
//   return false;
// };

export const getVariableDefinitionsCount = (): number => {
  const activeDefinition = useEditor.getState().activeDefinition;

  if (
    activeDefinition?.kind === Kind.OPERATION_DEFINITION &&
    activeDefinition.variableDefinitions
  ) {
    return activeDefinition.variableDefinitions.length;
  }
  return 0;
};

export const getSelectedArgumentsCount = ({
  previousAncestor,
}: {
  previousAncestor: AncestorField;
}): number => {
  if (
    previousAncestor.selection &&
    'arguments' in previousAncestor.selection &&
    previousAncestor.selection.arguments
  ) {
    return previousAncestor.selection.arguments.length;
  }
  return 0;
};

// export const hasSiblingArguments = ({
//   mode,
//   previousAncestor,
// }: {
//   mode: 'ADD' | 'REMOVE';
//   previousAncestor: AncestorField;
// }) => {
//   // console.log('hasSiblingArguments', { previousAncestor });
//   const greaterThan = mode === 'ADD' ? 0 : 1;

//   if (
//     previousAncestor.selection &&
//     'arguments' in previousAncestor.selection &&
//     previousAncestor.selection.arguments &&
//     previousAncestor.selection.arguments.length > greaterThan
//   ) {
//     return true;
//   }
//   return false;
// };

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

export const getActiveDefinitionRange = (): IRange | null => {
  const activeDefinition = useEditor.getState().activeDefinition;
  if (activeDefinition?.loc) {
    return {
      startColumn: activeDefinition.loc.startToken.column,
      endColumn: activeDefinition.loc.endToken.column + 1,
      startLineNumber: activeDefinition.loc.startToken.line,
      endLineNumber: activeDefinition.loc.endToken.line,
    };
  }
  return null;
};

export const getRemoveRangeNew = ({
  mode,
  target,
  text,
}: {
  mode: 'ARGUMENT' | 'VARIABLE_DEFINITION';
  target: AncestorArgument;
  text: string;
}): IRange | null => {
  const model = useEditor.getState().monacoEditors['operations']?.getModel();

  let range: IRange | null = null;
  let location: Location | null = null;
  let isLastArgumentOrVariable = false;
  let startPosition: IPosition | undefined = undefined;
  let endPosition: IPosition | undefined = undefined;

  // let's get our initial range
  if (mode === 'ARGUMENT') {
    location = target.selection?.loc as Location;
    isLastArgumentOrVariable =
      target.selection?.loc?.endToken.next?.kind === TokenKind.PAREN_R &&
      target.selection?.loc?.startToken.prev?.kind === TokenKind.PAREN_L;

    startPosition = model?.getPositionAt(target.selection?.loc?.start as number);
    endPosition = model?.getPositionAt(target.selection?.loc?.end as number);
  } else {
    // mode is "VARIABLE_DEFINITION"
    const activeDefinition = useEditor.getState().activeDefinition;

    const definition = (
      activeDefinition as OperationDefinitionNode
    ).variableDefinitions?.find(
      (v) =>
        v.variable.name.value === target.argument.name &&
        v.type.kind === Kind.NAMED_TYPE &&
        v.type.name.value === target.argument.type.toString()
    );

    location = definition?.loc as Location;
    isLastArgumentOrVariable =
      (activeDefinition as OperationDefinitionNode).variableDefinitions?.length === 1;

    startPosition = model?.getPositionAt(definition?.loc?.start as number);
    endPosition = model?.getPositionAt(definition?.loc?.end as number);
  }

  const { startToken, endToken } = location;

  if (isLastArgumentOrVariable) {
    // return here because we know it's the last argument or variable and we want to remove opening and closiing parenthesis
    return {
      startLineNumber: startToken.prev?.line as number,
      startColumn: startToken.prev?.column as number,
      endLineNumber: endToken.next?.line as number,
      endColumn: (endToken.next?.column as number) + 1,
    };
  }

  range = {
    startLineNumber: startPosition?.lineNumber as number,
    startColumn: startPosition?.column as number,
    endLineNumber: endPosition?.lineNumber as number,
    endColumn: endPosition?.column as number,
  };

  const testForLeadingComma = getRangeFromStringInActiveDefinition({
    string: `, ${text}`,
  });

  if (testForLeadingComma) {
    range = testForLeadingComma;
  }

  const testForTrailingComma = getRangeFromStringInActiveDefinition({
    string: `${text}, `,
  });

  if (!range && testForTrailingComma) {
    range = testForTrailingComma;
  }

  const monacoLineContent = model?.getLineContent(startPosition?.lineNumber as number);

  const lineIndentCount = monacoLineContent?.search(/\S/) || 0;

  const isSingleLine = !!(
    monacoLineContent && monacoLineContent.length < lineIndentCount + text.length + 3
  );

  if (isSingleLine) {
    // text is on a line by itself so we update our range
    range = {
      ...(range as IRange),
      startColumn: 0,
      endColumn: 0,
      endLineNumber: range.endLineNumber + 1,
    };
  }

  console.log('getRemoveRangeNew', {
    range,
  });

  return range;
};

// export const getRemoveRangeForArgumentOrVariable = ({
//   text,
// }: {
//   text: string;
// }): IRange | null => {
//   let range: IRange | null = null;

//   // const testForLeadingComma = getRangeFromStringInActiveDefinition({
//   //   string: `, ${text}`,
//   // });

//   // if (testForLeadingComma) {
//   //   range = testForLeadingComma;
//   // }

//   // const testForTrailingComma = getRangeFromStringInActiveDefinition({
//   //   string: `${text}, `,
//   // });

//   // if (!range && testForTrailingComma) {
//   //   range = testForTrailingComma;
//   // }

//   if (!range && getRangeFromStringInActiveDefinition({ string: text })) {
//     range = getRangeFromStringInActiveDefinition({ string: text });
//   }

//   // if this text is on a single line, by itself, we need to remove the entire line
//   const model = useEditor.getState().monacoEditors['operations']?.getModel();

//   const monacoLineContent = model?.getLineContent(range?.startLineNumber as number);

//   const lineIndentCount = monacoLineContent?.search(/\S/) || 0;

//   if (monacoLineContent && monacoLineContent.length < lineIndentCount + text.length + 3) {
//     // text is on a line by itself so we update our range
//     return {
//       // ...(range as IRange),
//       startLineNumber: range?.startLineNumber as number,
//       startColumn: 0,
//       endColumn: 0,
//       endLineNumber: (range?.startLineNumber as number) + 1,
//     };
//   } else {
//     // text is not on a line by itself, leave the range be
//     return range;
//   }
// };

export const getRangeFromStringInActiveDefinition = ({
  string,
}: {
  string: string;
}): IRange | null => {
  const model = useEditor.getState().monacoEditors['operations']?.getModel();

  const activeDefinitionRange = getActiveDefinitionRange();

  if (model && activeDefinitionRange) {
    const matches = model.findMatches(
      string,
      activeDefinitionRange,
      false,
      false,
      null,
      true
    );

    // console.log('matches', { matches, string });

    if (matches.length > 1) {
      console.warn('more than one match returned');
    } else if (matches.length === 0) {
      console.warn('no matches returned');
    } else {
      return matches[0].range;
    }
  }

  return null;
};

export const getRemoveRangeForLastVariableDefinition = ({
  operationDefinition,
  target,
}: {
  operationDefinition: OperationDefinitionNode;
  target: AncestorArgument;
}): IRange => {
  const definition = operationDefinition?.variableDefinitions?.find(
    (v) =>
      v.variable.name.value === target.argument.name &&
      v.type.kind === Kind.NAMED_TYPE &&
      v.type.name.value === target.argument.type.toString()
  );

  const { startToken, endToken } = definition?.loc as Location;

  const range = {
    startLineNumber: startToken.prev?.line as number,
    startColumn: startToken.prev?.column as number,
    endLineNumber: endToken.next?.line as number,
    endColumn: (endToken.next?.column as number) + 1,
  };

  return range;
};

export const getRemoveRangeForLastArgument = ({
  target,
}: {
  target: AncestorArgument;
}): IRange => {
  const { startToken, endToken } = target.selection?.loc as Location;

  return {
    startLineNumber: startToken.prev?.line as number,
    startColumn: startToken.prev?.column as number,
    endLineNumber: endToken.next?.line as number,
    endColumn: (endToken.next?.column as number) + 1,
  };
};

export const getAddVariableEditWithExistingVariables = ({
  variableTargetLocation,
  variableText,
}: {
  variableTargetLocation: Location;
  variableText: string;
}): EditorEdit => {
  let text = variableText;

  const closeVariableParenthesis = findNextTokenKindInLocation({
    startToken: variableTargetLocation.startToken,
    tokenKind: TokenKind.PAREN_R,
  });

  if (closeVariableParenthesis?.line !== closeVariableParenthesis?.prev?.line) {
    text = `  ${text}\n`;
  } else {
    text = `, ${text}`;
  }

  return {
    range: {
      startLineNumber: closeVariableParenthesis?.line as number,
      endLineNumber: closeVariableParenthesis?.line as number,
      startColumn: closeVariableParenthesis?.column as number,
      endColumn: closeVariableParenthesis?.column as number,
    },
    text,
  };
};

export const getAddVariableEditWithoutExistingVariables = ({
  variableTargetLocation,
  variableText,
}: {
  variableTargetLocation: Location;
  variableText: string;
}): EditorEdit => {
  const text = `(${variableText})`;

  const {
    startToken: { line, next },
  } = variableTargetLocation;

  return {
    range: {
      startLineNumber: line,
      endLineNumber: line,
      startColumn: (next?.column as number) + (next?.value as string).length,
      endColumn: (next?.column as number) + (next?.value as string).length,
    },
    text,
  };
};

export const getAddArgumentEditWithoutSiblings = ({
  argumentTargetLocation,
  argumentText,
}: {
  argumentTargetLocation: Location;
  argumentText: string;
}): EditorEdit => {
  const text = `(${argumentText})`;

  const {
    startToken: { column, line, value },
  } = argumentTargetLocation;

  return {
    range: {
      startLineNumber: line,
      endLineNumber: line,
      startColumn: column + value.length,
      endColumn: column + value.length,
    },
    text,
  };
};

export const getAddArgumentEditWithSiblings = ({
  argumentTargetLocation,
  argumentText,
}: {
  argumentTargetLocation: Location;
  argumentText: string;
}): EditorEdit => {
  let text = argumentText;

  const closeArgumentParenthesis = findNextTokenKindInLocation({
    startToken: argumentTargetLocation.startToken,
    tokenKind: TokenKind.PAREN_R,
  });

  if (closeArgumentParenthesis?.line !== closeArgumentParenthesis?.prev?.line) {
    text = `  ${text}\n  `;
  } else {
    text = `, ${text}`;
  }
  return {
    range: {
      startLineNumber: closeArgumentParenthesis?.line as number,
      endLineNumber: closeArgumentParenthesis?.line as number,
      startColumn: closeArgumentParenthesis?.column as number,
      endColumn: closeArgumentParenthesis?.column as number,
    },
    text,
  };
};

export const createVariableText = ({
  argumentName,
  argumentTypeAsString,
}: {
  argumentName: string;
  argumentTypeAsString: string;
}) => `$${argumentName}: ${argumentTypeAsString}`;

export const createArgumentText = ({ argumentName }: { argumentName: string }) =>
  `${argumentName}: $${argumentName}`;
