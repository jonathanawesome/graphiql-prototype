import { Location } from 'graphql';
import { IPosition } from 'monaco-editor';

// store
import { useEditor } from '@graphiql-prototype/store';

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
    lineNumber: locationEndPosition.lineNumber,
    column: locationEndPosition.column + newTextLength,
  };
  return position;
};
