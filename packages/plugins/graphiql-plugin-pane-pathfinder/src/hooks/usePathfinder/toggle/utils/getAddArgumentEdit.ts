import { Location, TokenKind } from 'graphql';
import { IRange } from 'monaco-editor';

// types
import { AncestorField } from '../../types';

// utils
import { findNextTokenKindInLocation } from './findNextTokenKindInLocation';
import { getSelectedArgumentsCount } from './getSelectedArgumentsCount';

export const getAddArgumentEdit = ({
  incomingText,
  previousAncestor,
}: {
  incomingText: string;
  previousAncestor: AncestorField;
}): { range: IRange; text: string } => {
  let text = incomingText;
  let range: IRange | null = null;

  const selectedArgumentsCount = getSelectedArgumentsCount({ previousAncestor });

  const argumentTargetLocation = previousAncestor.selection?.loc as Location;

  if (selectedArgumentsCount > 0) {
    // with siblings
    const closeArgumentParenthesis = findNextTokenKindInLocation({
      startToken: argumentTargetLocation.startToken,
      tokenKind: TokenKind.PAREN_R,
    });
    if (closeArgumentParenthesis?.line !== closeArgumentParenthesis?.prev?.line) {
      text = `  ${text}\n  `;
    } else {
      text = `, ${text}`;
    }
    range = {
      startLineNumber: closeArgumentParenthesis?.line as number,
      endLineNumber: closeArgumentParenthesis?.line as number,
      startColumn: closeArgumentParenthesis?.column as number,
      endColumn: closeArgumentParenthesis?.column as number,
    };
  } else {
    // without siblings
    text = `(${text})`;

    const {
      startToken: { column, line, value },
    } = argumentTargetLocation;

    range = {
      startLineNumber: line,
      endLineNumber: line,
      startColumn: column + value.length,
      endColumn: column + value.length,
    };
  }

  return { range, text };
};
