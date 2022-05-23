import {
  GraphQLArgument,
  // ConstValueNode,
  // FloatValueNode,
  // GraphQLArgument,
  // GraphQLEnumType,
  GraphQLField,
  GraphQLNamedType,
  // GraphQLScalarType,
  // IntValueNode,
  isEnumType,
  isRequiredArgument,
  // isScalarType,
  Kind,
  ListTypeNode,
  NamedTypeNode,
  NonNullTypeNode,
  // NullValueNode,
  parseType,
  // StringValueNode,
  TypeNode,
  // ValueNode,
  VariableDefinitionNode,
  // VariableNode,
} from 'graphql';
import { EasyVariable } from '../hooks/useVariables/useVariables';
import { useVariables } from '@/hooks';

/** utils */
import { capitalize } from './misc';

const buildNamedTypeNode = ({ typeNode }: { typeNode: NamedTypeNode }): NamedTypeNode => {
  // console.log('running buildNamedTypeNode', typeNode);

  return {
    kind: Kind.NAMED_TYPE,
    name: {
      kind: Kind.NAME,
      value: typeNode.name.value,
    },
  };
};

const buildNonNullTypeNode = ({
  typeNode,
}: {
  typeNode: NonNullTypeNode;
}): NonNullTypeNode => {
  // console.log('running buildNonNullTypeNode', typeNode);

  if (typeNode.type.kind === Kind.LIST_TYPE) {
    return {
      kind: Kind.NON_NULL_TYPE,
      type: buildListTypeNode({ typeNode: typeNode.type }),
    };
  } else {
    // not ListType...must be a NamedType
    return {
      kind: Kind.NON_NULL_TYPE,
      type: buildNamedTypeNode({ typeNode: typeNode.type }),
    };
  }
};

const buildListTypeNode = ({ typeNode }: { typeNode: ListTypeNode }): ListTypeNode => {
  // console.log('running buildListTypeNode', typeNode);

  if (typeNode.type.kind === Kind.LIST_TYPE) {
    return {
      kind: Kind.LIST_TYPE,
      type: buildListTypeNode({ typeNode: typeNode.type }),
    };
  }

  if (typeNode.type.kind === Kind.NON_NULL_TYPE) {
    return {
      kind: Kind.LIST_TYPE,
      type: buildNonNullTypeNode({ typeNode: typeNode.type }),
    };
  }

  // not a list, not non null...must be named
  return {
    kind: Kind.LIST_TYPE,
    type: {
      kind: Kind.NAMED_TYPE,
      name: {
        kind: Kind.NAME,
        value: typeNode.type.name.value,
      },
    },
  };
};

const buildTypeNode = ({ typeNode }: { typeNode: TypeNode }): TypeNode => {
  // console.log('running buildTypeNode', { typeNode });

  if (typeNode.kind === Kind.NON_NULL_TYPE) {
    return buildNonNullTypeNode({ typeNode });
  }

  if (typeNode.kind === Kind.LIST_TYPE) {
    return buildListTypeNode({ typeNode });
  }
  return typeNode;
};

export const buildVariableNameValue = ({
  fieldName,
  parentArgName,
  argName,
}: {
  fieldName: string;
  parentArgName: string | null;
  argName: string;
}): string => {
  const parentArgOrEmptyString = parentArgName
    ? capitalize({
        string: parentArgName,
      })
    : '';
  return `${fieldName}${parentArgOrEmptyString}${capitalize({ string: argName })}`;
};

export const buildNewVariableDefinition = ({
  fieldName,
  parentArgName,
  forArg,
}: {
  fieldName: string;
  parentArgName: string | null;
  forArg: GraphQLArgument;
}): VariableDefinitionNode => {
  const argPrintedType = forArg.type.toString();
  const typeNode = parseType(argPrintedType);
  return {
    kind: Kind.VARIABLE_DEFINITION,
    variable: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: buildVariableNameValue({
          fieldName,
          parentArgName,
          argName: forArg.name,
        }),
      },
    },
    type: buildTypeNode({ typeNode }),
  };
};

export const getRequiredVariableDefinitionsForField = ({
  field,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any>;
}): VariableDefinitionNode[] => {
  return field.args.flatMap((arg) => {
    if (isRequiredArgument(arg)) {
      const argPrintedType = arg.type.toString();
      const typeNode = parseType(argPrintedType);
      return {
        kind: Kind.VARIABLE_DEFINITION,
        variable: {
          kind: Kind.VARIABLE,
          name: {
            kind: Kind.NAME,
            value: buildVariableNameValue({
              fieldName: field.name,
              parentArgName: null,
              argName: arg.name,
            }),
          },
        },
        type: buildTypeNode({ typeNode }),
      };
    } else {
      return [];
    }
  });
};

export const generateAndSetEasyVariable = ({
  // valueNode,
  variableName = 'no name provided',
  unwrappedType,
}: {
  // valueNode: ValueNode;
  variableName: string;
  unwrappedType: GraphQLNamedType;
}): void => {
  //value here is a ValueNode
  const setEasyVariables = useVariables.getState().setEasyVariables;
  let easyVariable: EasyVariable | null = null;
  if (isEnumType(unwrappedType)) {
    const options = unwrappedType.getValues();
    easyVariable = {
      [variableName]: options.map((option) => option.name),
    };
  } else {
    // Scalars
    // let scalarValue: string | number | undefined;
    switch (unwrappedType.name) {
      case 'Boolean':
        easyVariable = {
          [variableName]: ['true', 'false'],
        };
        break;

      case 'BigDecimal':
      case 'Float':
      case 'Int':
      case 'Long':
        console.log("I'm an Int", { unwrappedType });
        // scalarValue =
        //   (valueNode as NullValueNode)?.kind === 'NullValue'
        //     ? ''
        //     : (valueNode as FloatValueNode | IntValueNode)?.value ?? '';
        easyVariable = {
          [variableName]: 123,
        };
        break;

      default:
        // scalarValue = isVariable
        //   ? `$${(value as VariableNode).name.value}`
        //   : (value as NullValueNode)?.kind === 'NullValue'
        //   ? ''
        //   : (value as StringValueNode)?.value ?? '';
        easyVariable = {
          [variableName]: 'someString',
        };
    }
  }
  setEasyVariables({ addOrRemove: 'ADD', easyVariable });
};