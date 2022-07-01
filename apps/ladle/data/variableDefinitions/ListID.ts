import { Kind, VariableDefinitionNode } from 'graphql';

export const ListID: VariableDefinitionNode = {
  kind: Kind.VARIABLE_DEFINITION,
  variable: {
    kind: Kind.VARIABLE,
    name: {
      kind: Kind.NAME,
      value: 'hasArgsListID',
    },
  },
  type: {
    kind: Kind.LIST_TYPE,
    type: {
      kind: Kind.NAMED_TYPE,
      name: {
        kind: Kind.NAME,
        value: 'ID',
      },
    },
  },
  directives: [],
};
