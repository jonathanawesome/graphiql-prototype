/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLInputType, GraphQLNamedType, isWrappingType, GraphQLType } from 'graphql';

export const unwrapInputType = ({
  inputType,
}: {
  inputType: GraphQLInputType;
}): GraphQLNamedType => {
  let unwrappedType = inputType;
  while (isWrappingType(unwrappedType)) {
    unwrappedType = unwrappedType.ofType;
  }
  return unwrappedType;
};

export function unwrapType(type: GraphQLType): GraphQLNamedType {
  let unwrappedType = type;
  while (isWrappingType(unwrappedType)) {
    unwrappedType = unwrappedType.ofType;
  }
  return unwrappedType;
}
