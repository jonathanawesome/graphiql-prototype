import {
  GraphQLObjectType,
  GraphQLOutputType,
  isListType,
  isNonNullType,
  isObjectType,
} from 'graphql';

export const getObjectType = (type: GraphQLOutputType): GraphQLObjectType | null => {
  if (isListType(type)) {
    return getObjectType(type.ofType);
  }

  if (isNonNullType(type)) {
    return getObjectType(type.ofType);
  }

  if (isObjectType(type)) {
    return type;
  }

  return null;
};
