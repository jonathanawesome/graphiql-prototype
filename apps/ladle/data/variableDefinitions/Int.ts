import { Kind, VariableDefinitionNode } from 'graphql';

export const Int: VariableDefinitionNode = {
  kind: Kind.VARIABLE_DEFINITION,
  variable: {
    kind: Kind.VARIABLE,
    name: {
      kind: Kind.NAME,
      value: 'hasArgsInt',
    },
  },
  type: {
    kind: Kind.NAMED_TYPE,
    name: {
      kind: Kind.NAME,
      value: 'Int',
    },
  },
  directives: [],
};
