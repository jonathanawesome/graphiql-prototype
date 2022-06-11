import { GraphQLInputType, isNonNullType } from 'graphql';

export const unwrapNonNullInputType = ({ type }: { type: GraphQLInputType }) => {
  if (isNonNullType(type)) {
    return type.ofType;
  } else {
    return type;
  }
};
