import {
  GraphQLArgument,
  GraphQLField,
  isRequiredArgument,
  Kind,
  ListTypeNode,
  NamedTypeNode,
  NonNullTypeNode,
  TypeNode,
  VariableDefinitionNode,
} from 'graphql';

/** utils */
import { capitalize } from './misc';

const buildNamedTypeNode = ({ typeNode }: { typeNode: NamedTypeNode }): NamedTypeNode => {
  console.log('running buildNamedTypeNode', typeNode);

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
  console.log('running buildNonNullTypeNode', typeNode);

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
  console.log('running buildListTypeNode', typeNode);

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
  console.log('running buildTypeNode', typeNode);
  if (typeNode.kind === Kind.NON_NULL_TYPE) {
    return buildNonNullTypeNode({ typeNode });
  }

  if (typeNode.kind === Kind.LIST_TYPE) {
    return buildListTypeNode({ typeNode });
  }
  return typeNode;
};

export const buildNewVariableDefinition = ({
  forArg,
  parentArgName,
  selectionName,
}: {
  forArg: GraphQLArgument;
  parentArgName: string;
  selectionName: string;
}): VariableDefinitionNode => {
  return {
    kind: Kind.VARIABLE_DEFINITION,
    variable: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: `${selectionName}${capitalize({
          string: parentArgName,
        })}${capitalize({ string: forArg.name })}`,
      },
    },
    type: buildTypeNode({ typeNode: forArg.astNode?.type as TypeNode }),
  };
};

export const getVariableDefinitionsForField = ({
  field,
  onlyRequired,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any>;
  onlyRequired: boolean;
}): VariableDefinitionNode[] => {
  return field.args.flatMap((arg) => {
    if (onlyRequired) {
      if (isRequiredArgument(arg)) {
        return {
          ...buildNewVariableDefinition({
            forArg: arg,
            parentArgName: field.name,
            selectionName: arg.name,
          }),
          // ...buildVariableDefinitionNode({
          //   variableName: `${field.name}${capitalize({ string: arg.name })}`,
          //   variableType: arg.type.toString(),
          // }),
        };
      } else {
        return [];
      }
    } else {
      return {
        ...buildNewVariableDefinition({
          forArg: arg,
          parentArgName: field.name,
          selectionName: arg.name,
        }),
        // ...buildVariableDefinitionNode({
        //   variableName: `${field.name}${capitalize({ string: arg.name })}`,
        //   variableType: arg.type.toString(),
        // }),
      };
    }
  });
};
