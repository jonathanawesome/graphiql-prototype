import { Location } from 'graphql';

// store
import { EditorEdit } from '@graphiql-prototype/store';

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
