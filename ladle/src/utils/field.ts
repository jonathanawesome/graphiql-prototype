/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GraphQLFieldMap,
  GraphQLOutputType,
  isInterfaceType,
  isListType,
  isNonNullType,
  isObjectType,
  isUnionType,
} from 'graphql';
import { useGraphiQL } from '../hooks';

export const getTypeFields = ({
  type,
}: {
  type: GraphQLOutputType;
}): GraphQLFieldMap<any, any> | null => {
  // const schema = useGraphiQL.getState().schema;
  if (isObjectType(type)) {
    // console.log('isObjectType');

    return type.getFields();
  } else if (isInterfaceType(type)) {
    // console.log('isInterfaceType');

    return type.getFields();
  } else if (isListType(type)) {
    // console.log('isListType');

    return getTypeFields({ type: type.ofType });
  } else if (isNonNullType(type)) {
    // console.log('isNonNullType');
    return getTypeFields({ type: type.ofType });
  }
  // else if (isUnionType(type)) {
  //   console.log('isUnionType', { types: schema?.getPossibleTypes(type) });
  //   // return schema?.getPossibleTypes(type);
  // }

  return null;
};
