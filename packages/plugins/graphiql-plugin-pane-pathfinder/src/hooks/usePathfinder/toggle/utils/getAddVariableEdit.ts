import { Location, TokenKind } from 'graphql';
import { IRange } from 'monaco-editor';

// types
import { AncestorRoot } from '../../types';
import { EditorEdit } from '@graphiql-prototype/store';

// utils
import { findNextTokenKindInLocation } from './findNextTokenKindInLocation';
import { getVariableDefinitionsCount } from './getVariableDefinitionsCount';

export const getAddVariableEdit = ({
  incomingText,
  rootAncestor,
}: {
  incomingText: string;
  rootAncestor: AncestorRoot;
}): EditorEdit => {
  let text = incomingText;
  let range: IRange | null = null;

  const variableDefinitionsCount = getVariableDefinitionsCount();

  const variableTargetLocation = rootAncestor.operationDefinition?.loc as Location;

  if (variableDefinitionsCount > 0) {
    // with existing variable definitions
    const closeVariableParenthesis = findNextTokenKindInLocation({
      startToken: variableTargetLocation.startToken,
      tokenKind: TokenKind.PAREN_R,
    });

    if (closeVariableParenthesis?.line !== closeVariableParenthesis?.prev?.line) {
      text = `  ${text}\n`;
    } else {
      text = `, ${text}`;
    }

    range = {
      startLineNumber: closeVariableParenthesis?.line as number,
      endLineNumber: closeVariableParenthesis?.line as number,
      startColumn: closeVariableParenthesis?.column as number,
      endColumn: closeVariableParenthesis?.column as number,
    };
  } else {
    // without existing variable definitions
    text = `(${text})`;

    const {
      startToken: { line, next },
    } = variableTargetLocation;

    const { column, value } = { ...next };

    range = {
      startLineNumber: line,
      endLineNumber: line,
      startColumn: (column as number) + (value as string).length,
      endColumn: (column as number) + (value as string).length,
    };
  }

  return { range, text };
};
