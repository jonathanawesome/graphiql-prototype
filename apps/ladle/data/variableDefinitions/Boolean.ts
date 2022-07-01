import { Kind, VariableDefinitionNode } from 'graphql';

export const Boolean: VariableDefinitionNode = {
  kind: Kind.VARIABLE_DEFINITION,
  variable: {
    kind: Kind.VARIABLE,
    name: {
      kind: Kind.NAME,
      value: 'hasArgsBoolean',
    },
  },
  type: {
    kind: Kind.NAMED_TYPE,
    name: {
      kind: Kind.NAME,
      value: 'Boolean',
    },
  },
  directives: [],
};
