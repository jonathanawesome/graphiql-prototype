import { Kind, VariableDefinitionNode } from 'graphql';

export const TestEnum: VariableDefinitionNode = {
  kind: Kind.VARIABLE_DEFINITION,
  variable: {
    kind: Kind.VARIABLE,
    name: {
      kind: Kind.NAME,
      value: 'hasArgsEnum',
    },
  },
  type: {
    kind: Kind.NAMED_TYPE,
    name: {
      kind: Kind.NAME,
      value: 'TestEnum',
    },
  },
  directives: [],
};
