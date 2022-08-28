import { GraphQLInputType, Kind, parseType, VariableDefinitionNode } from 'graphql';
import { buildTypeNode } from './buildTypeNode';

export const buildNewVariableDefinition = ({
  type,
  variableName,
}: {
  type: GraphQLInputType;
  variableName: string;
}): VariableDefinitionNode => {
  const printedType = type.toString();
  const typeNode = parseType(printedType);
  return {
    kind: Kind.VARIABLE_DEFINITION,
    variable: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: variableName,
      },
    },
    type: buildTypeNode({ typeNode }),
  };
};
