/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GraphQLFieldMap,
  GraphQLOutputType,
  isInterfaceType,
  isListType,
  isNonNullType,
  isObjectType,
} from 'graphql';

export const getTypeFields = ({
  type,
}: {
  type: GraphQLOutputType;
}): GraphQLFieldMap<any, any> | null => {
  if (isObjectType(type)) {
    return type.getFields();
  } else if (isInterfaceType(type)) {
    return type.getFields();
  } else if (isListType(type)) {
    return getTypeFields({ type: type.ofType });
  } else if (isNonNullType(type)) {
    return getTypeFields({ type: type.ofType });
  }

  return null;
};
