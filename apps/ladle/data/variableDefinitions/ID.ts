import { Kind, VariableDefinitionNode } from 'graphql';

export const ID: VariableDefinitionNode = {
  kind: Kind.VARIABLE_DEFINITION,
  variable: {
    kind: Kind.VARIABLE,
    name: {
      kind: Kind.NAME,
      value: 'hasArgsId',
    },
  },
  type: {
    kind: Kind.NAMED_TYPE,
    name: {
      kind: Kind.NAME,
      value: 'ID',
    },
  },
  directives: [],
};
