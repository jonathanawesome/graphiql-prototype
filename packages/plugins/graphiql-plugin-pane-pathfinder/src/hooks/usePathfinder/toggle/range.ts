import { Location } from 'graphql';
import { IRange } from 'monaco-editor';

export const rangeRemoveForSingleLine = ({
  location,
}: {
  location: Location;
}): IRange => {
  return {
    startLineNumber: location.endToken.line,
    startColumn: 0,
    endLineNumber: location.endToken.line + 1,
    endColumn: 0,
  };
};

export const rangeRemoveForFieldWithSelections = ({
  location,
}: {
  location: Location;
}): IRange => {
  return {
    startLineNumber: location.startToken.line,
    startColumn: 0,
    endLineNumber: location.endToken.line + 1,
    endColumn: 0,
  };
};

export const rangeRemoveForAllSelectionsOfField = ({
  location,
}: {
  location: Location;
}): IRange => {
  return {
    startLineNumber: location.startToken.prev?.line as number,
    startColumn: location.startToken.prev?.column as number,
    endLineNumber: location.endToken.next?.line as number,
    endColumn: (location.endToken.next?.column as number) + 1,
  };
};

export const rangeInsertBeforeClosingBracket = ({
  location,
}: {
  location: Location;
}): IRange => {
  return {
    startLineNumber: location.endToken.line,
    startColumn: 0,
    endLineNumber: location.endToken.line,
    endColumn: 0,
  };
};

export const rangeInsertAfterField = ({
  // endColumn,
  location,
}: {
  // endColumn: number;
  location: Location;
}): IRange => {
  console.log('rangeInsertAfterField', { location });
  // if the start and end token column numbers are the same, it means we have an empty parent field
  const col =
    location.startToken.column === location.endToken.column
      ? location.endToken.column + location.startToken.value.length
      : location.endToken.column + 1;
  return {
    startLineNumber: location.startToken.line,
    startColumn: col,
    endLineNumber: location.startToken.line,
    endColumn: col,
  };
};
