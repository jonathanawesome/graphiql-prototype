import type { DefinitionNode, Location } from 'graphql';

export const getLocationAndRangeForDefinition = ({
  definition,
}: {
  definition: DefinitionNode;
}) => {
  const location = definition.loc as Location;
  const startLine = location.startToken.line;
  const endLine = location.endToken.line;
  const range = {
    startColumn: location.startToken.column,
    endColumn: location.endToken.column + 1,
    startLineNumber: startLine,
    endLineNumber: endLine,
  };
  return { range, startLine, endLine };
};
