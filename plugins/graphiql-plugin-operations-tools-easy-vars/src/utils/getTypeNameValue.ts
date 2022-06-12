import { Kind, TypeNode } from 'graphql';

// returns "String" | "Int" | "Float" | "ID" | "Boolean" | "SomeEnumName"
export const getTypeNameValue = ({ type }: { type: TypeNode }): string => {
  if (type.kind === Kind.NON_NULL_TYPE || type.kind === Kind.LIST_TYPE) {
    return getTypeNameValue({ type: type.type });
  }
  return type.name.value;
};
