import { Location, TokenKind } from 'graphql';

// store
import { EditorEdit } from '@graphiql-prototype/store';

// utils
import { findNextTokenKindInLocation } from './findNextTokenKindInLocation';

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
