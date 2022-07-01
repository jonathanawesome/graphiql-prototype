import { Kind, VariableDefinitionNode } from 'graphql';

export const String: VariableDefinitionNode = {
  kind: Kind.VARIABLE_DEFINITION,
  variable: {
    kind: Kind.VARIABLE,
    name: {
      kind: Kind.NAME,
      value: 'hasArgsString',
    },
  },
  type: {
    kind: Kind.NAMED_TYPE,
    name: {
      kind: Kind.NAME,
      value: 'String',
    },
  },
  directives: [],
};
