import { Kind, TypeNode } from 'graphql';

// returns display type, such as "[ID!]!"
export const getDisplayStringFromVariableDefinitionTypeNode = ({
  type,
}: {
  type: TypeNode;
}) => {
  let str = '';
  if (type.kind === Kind.NON_NULL_TYPE) {
    if (type.type.kind === Kind.LIST_TYPE) {
      if (type.type.type.kind === Kind.NON_NULL_TYPE) {
        if (type.type.type.type.kind === Kind.NAMED_TYPE) {
          str = `[${type.type.type.type.name.value}!]!`;
        }
      }
      if (type.type.type.kind === Kind.NAMED_TYPE) {
        str = `[${type.type.type.name.value}]!`;
      }
    } else if (type.type.kind === Kind.NAMED_TYPE) {
      str = `${type.type.name.value}!`;
    }
  } else if (type.kind === Kind.LIST_TYPE) {
    if (type.type.kind === Kind.NON_NULL_TYPE) {
      if (type.type.type.kind === Kind.NAMED_TYPE) {
        str = `[${type.type.type.name.value}!]`;
      }
    }
    if (type.type.kind === Kind.NAMED_TYPE) {
      str = `[${type.type.name.value}]`;
    }
  } else if (type.kind === Kind.NAMED_TYPE) {
    str = `${type.name.value}`;
  }
  return str;
};
