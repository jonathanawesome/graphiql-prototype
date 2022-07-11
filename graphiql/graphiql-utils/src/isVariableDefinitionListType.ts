import { Kind, TypeNode } from 'graphql';

export const isVariableDefinitionListType = ({ type }: { type: TypeNode }): boolean => {
  if (type.kind === Kind.NON_NULL_TYPE) {
    return isVariableDefinitionListType({ type: type.type });
  } else if (type.kind === Kind.NAMED_TYPE) {
    return false;
  }
  return true;
};
