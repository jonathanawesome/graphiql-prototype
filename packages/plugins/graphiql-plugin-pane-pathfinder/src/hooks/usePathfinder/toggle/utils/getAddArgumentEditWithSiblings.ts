import { Location, TokenKind } from 'graphql';

// store
import { EditorEdit } from '@graphiql-prototype/store';

// utils
import { findNextTokenKindInLocation } from './findNextTokenKindInLocation';

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
