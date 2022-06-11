import { GraphQLInputType, GraphQLNamedType, isWrappingType } from 'graphql';

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
