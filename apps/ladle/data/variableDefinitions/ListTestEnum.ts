import { Kind, VariableDefinitionNode } from 'graphql';

export const ListTestEnum: VariableDefinitionNode = {
  kind: Kind.VARIABLE_DEFINITION,
  variable: {
    kind: Kind.VARIABLE,
    name: {
      kind: Kind.NAME,
      value: 'hasArgsListEnum',
    },
  },
  type: {
    kind: Kind.LIST_TYPE,
    type: {
      kind: Kind.NAMED_TYPE,
      name: {
        kind: Kind.NAME,
        value: 'TestEnum',
      },
    },
  },
  directives: [],
};
