import { GraphQLType, GraphQLNamedType, isWrappingType } from 'graphql';

export function unwrapType(type: GraphQLType): GraphQLNamedType {
  let unwrappedType = type;
  while (isWrappingType(unwrappedType)) {
    unwrappedType = unwrappedType.ofType;
  }
  return unwrappedType;
}
