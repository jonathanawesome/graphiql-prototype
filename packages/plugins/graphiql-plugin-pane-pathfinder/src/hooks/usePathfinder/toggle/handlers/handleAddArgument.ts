import { TokenKind } from 'graphql';
import type { Location } from 'graphql';

// constants
import { TARGET_EDITOR } from '../../constants';

// hooks
import { EditorEdit, useEditor } from '@graphiql-prototype/store';

// types
import { AncestorField, AncestorRoot } from '../../types';

// utils
import {
  findNextTokenKindInLocation,
  getVariableDefinitionsCount,
  getSelectedArgumentsCount,
  // hasSiblingArguments as hasSiblingArgumentsFunc,
  // isExistingVariableDefinitions as isExistingVariableDefinitionsFunc,
} from '../../utils';

const getAddVariableEditWithExistingVariables = ({
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

const getAddVariableEditWithoutExistingVariables = ({
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

const getAddArgumentEditWithoutSiblings = ({
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

const getAddArgumentEditWithSiblings = ({
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

export const handleAddArgument = ({
  argumentText,
  previousAncestor,
  rootAncestor,
  variableText,
}: {
  argumentText: string;
  previousAncestor: AncestorField;
  rootAncestor: AncestorRoot;
  variableText: string;
}) => {
  const pushEdit = useEditor.getState().pushEdit;

  const position = useEditor.getState().monacoEditors['operations']?.getPosition() || {
    column: 1,
    lineNumber: 1,
  };

  const selectedArgumentsCount = getSelectedArgumentsCount({ previousAncestor });
  const variableDefinitionsCount = getVariableDefinitionsCount();

  // const hasSiblingArguments = hasSiblingArgumentsFunc({ mode: 'ADD', previousAncestor });
  // const isExistingVariableDefinitions = isExistingVariableDefinitionsFunc();

  console.log('handleAddArgument', {
    selectedArgumentsCount,
    variableDefinitionsCount,
    // hasSiblingArguments,
    // isExistingVariableDefinitions,
  });

  const argumentTargetLocation = previousAncestor.selection?.loc as Location;

  const variableTargetLocation = rootAncestor.operationDefinition?.loc as Location;

  if (selectedArgumentsCount === 0 && variableDefinitionsCount === 0) {
    console.log(
      '1 - handleAddArgument - selectedArgumentsCount === 0 && variableDefinitionsCount === 0',
      {}
    );

    pushEdit({
      edits: [
        getAddVariableEditWithoutExistingVariables({
          variableTargetLocation,
          variableText,
        }),
        getAddArgumentEditWithoutSiblings({ argumentTargetLocation, argumentText }),
      ],
      position,
      targetEditor: TARGET_EDITOR,
    });

    return useEditor.getState().setDocumentState();
  }

  if (selectedArgumentsCount === 0 && variableDefinitionsCount > 0) {
    console.log(
      '2 - handleAddArgument - selectedArgumentsCount === 0 && variableDefinitionsCount > 0',
      {}
    );

    pushEdit({
      edits: [
        getAddVariableEditWithExistingVariables({ variableTargetLocation, variableText }),
        getAddArgumentEditWithoutSiblings({ argumentTargetLocation, argumentText }),
      ],
      position,
      targetEditor: TARGET_EDITOR,
    });

    return useEditor.getState().setDocumentState();
  }

  if (selectedArgumentsCount > 0 && variableDefinitionsCount > 0) {
    console.log(
      '3 - handleAddArgument - selectedArgumentsCount > 0 && variableDefinitionsCount > 0',
      {}
    );

    pushEdit({
      edits: [
        getAddVariableEditWithExistingVariables({ variableTargetLocation, variableText }),
        getAddArgumentEditWithSiblings({ argumentTargetLocation, argumentText }),
      ],
      position,
      targetEditor: TARGET_EDITOR,
    });

    return useEditor.getState().setDocumentState();
  }

  return console.log('unhandled addArgument...why are we here?');
};
