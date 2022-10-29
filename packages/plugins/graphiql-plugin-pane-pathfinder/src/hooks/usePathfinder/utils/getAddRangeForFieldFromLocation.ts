import { Location, TokenKind } from 'graphql';
import { IRange } from 'monaco-editor';

// utils
import { findNextTokenKindInLocation } from './findNextTokenKindInLocation';

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
