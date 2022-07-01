import { Kind, VariableDefinitionNode } from 'graphql';

export const ListFloat: VariableDefinitionNode = {
  kind: Kind.VARIABLE_DEFINITION,
  variable: {
    kind: Kind.VARIABLE,
    name: {
      kind: Kind.NAME,
      value: 'hasArgsListFloat',
    },
  },
  type: {
    kind: Kind.LIST_TYPE,
    type: {
      kind: Kind.NAMED_TYPE,
      name: {
        kind: Kind.NAME,
        value: 'Float',
      },
    },
  },
  directives: [],
};
