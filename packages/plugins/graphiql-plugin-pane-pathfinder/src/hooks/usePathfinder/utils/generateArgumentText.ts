import {
  ArgumentNode,
  GraphQLArgument,
  isEnumType,
  isListType,
  isScalarType,
  Kind,
  print,
  ValueNode,
} from 'graphql';

// hooks
import { usePathfinder } from '../usePathfinder';

// utils
import { getEnumValues, unwrapType } from '@graphiql-prototype/utils';

export const generateArgumentText = ({ argument }: { argument: GraphQLArgument }) => {
  const argumentHandlingMode = usePathfinder.getState().argumentHandlingMode;

  // defaults are set for "WITH_VARIABLE" handling mode
  let valueNode: ValueNode = {
    kind: Kind.VARIABLE,
    name: {
      kind: Kind.NAME,
      value: argument.name,
    },
  };
  let argumentNode: ArgumentNode = {
    kind: Kind.ARGUMENT,
    name: {
      kind: Kind.NAME,
      value: argument.name,
    },
    value: {
      ...valueNode,
    },
  };

  if (argumentHandlingMode === 'INLINE') {
    const { name } = unwrapType(argument.type);

    if (isScalarType(argument.type)) {
      if (name === 'String' || name === 'ID') {
        valueNode = {
          kind: Kind.STRING,
          value: name === 'String' ? 'string' : 'ID',
        };
      } else if (name === 'Int') {
        valueNode = {
          kind: Kind.INT,
          value: String(parseInt('321', 10)),
        };
      } else if (name === 'Float') {
        valueNode = {
          kind: Kind.FLOAT,
          value: String(parseFloat('1.23')),
        };
      } else if (name === 'Boolean') {
        valueNode = {
          kind: Kind.BOOLEAN,
          value: true,
        };
      }
    } else if (isEnumType(argument.type)) {
      const enumValues = getEnumValues({
        enumTypeName: argument.type.toString(),
      });
      valueNode = {
        kind: Kind.ENUM,
        value: enumValues ? enumValues[0].value : 'WHOOPS',
      };
    } else if (isListType(argument.type)) {
      valueNode = {
        kind: Kind.LIST,
        values: [],
      };
    } else {
      // default to object
      valueNode = {
        kind: Kind.OBJECT,
        fields: [],
      };
    }

    argumentNode = {
      ...argumentNode,
      value: {
        ...valueNode,
      },
    };
  }

  return print(argumentNode);
};
