import { GraphQLInputType, GraphQLArgument, isNonNullType } from 'graphql';

export const unwrapNonNullArgumentType = ({
  argumentType,
}: {
  argumentType: GraphQLArgument['type'];
}): GraphQLInputType => {
  if (isNonNullType(argumentType)) {
    return argumentType.ofType;
  }
  return argumentType;
};
