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

export const rangeInsertBeforePreviousAncestorClosingBracket = ({
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
  endColumn,
  location,
}: {
  endColumn: number;
  location: Location;
}): IRange => {
  return {
    startLineNumber: location.startToken.line,
    startColumn: location.startToken.column,
    endLineNumber: location.startToken.line,
    endColumn,
  };
};
