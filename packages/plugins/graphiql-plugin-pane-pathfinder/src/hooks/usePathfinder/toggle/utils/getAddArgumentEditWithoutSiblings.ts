import { Location } from 'graphql';

// store
import { EditorEdit } from '@graphiql-prototype/store';

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
