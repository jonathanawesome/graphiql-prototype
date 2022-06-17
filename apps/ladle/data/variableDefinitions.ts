import { Kind, VariableDefinitionNode } from 'graphql';

export const variableDefinitions: VariableDefinitionNode[] = [
  {
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
  },
  {
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
  },
  {
    kind: Kind.VARIABLE_DEFINITION,
    variable: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: 'hasArgsFloat',
      },
    },
    type: {
      kind: Kind.NAMED_TYPE,
      name: {
        kind: Kind.NAME,
        value: 'Float',
      },
    },
    directives: [],
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    kind: Kind.VARIABLE_DEFINITION,
    variable: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: 'hasArgsDefaultValue',
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
  },
  {
    kind: Kind.VARIABLE_DEFINITION,
    variable: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: 'hasArgsListString',
      },
    },
    type: {
      kind: Kind.LIST_TYPE,
      type: {
        kind: Kind.NAMED_TYPE,
        name: {
          kind: Kind.NAME,
          value: 'String',
        },
      },
    },
    directives: [],
  },
  {
    kind: Kind.VARIABLE_DEFINITION,
    variable: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: 'hasArgsListInt',
      },
    },
    type: {
      kind: Kind.LIST_TYPE,
      type: {
        kind: Kind.NAMED_TYPE,
        name: {
          kind: Kind.NAME,
          value: 'Int',
        },
      },
    },
    directives: [],
  },
  {
    kind: Kind.VARIABLE_DEFINITION,
    variable: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: 'hasArgsListBoolean',
      },
    },
    type: {
      kind: Kind.LIST_TYPE,
      type: {
        kind: Kind.NAMED_TYPE,
        name: {
          kind: Kind.NAME,
          value: 'Boolean',
        },
      },
    },
    directives: [],
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    kind: Kind.VARIABLE_DEFINITION,
    variable: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: 'hasArgsDeprecatedArg',
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
  },
];
