import { useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2';
import {
  GraphQLFieldMap,
  GraphQLOutputType,
  isInterfaceType,
  isListType,
  isNonNullType,
  isObjectType,
  isUnionType,
} from 'graphql';

export const getTypeFields = ({
  type,
}: {
  type: GraphQLOutputType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): GraphQLFieldMap<any, any> | null => {
  const schema = useGraphiQL.getState().schema;
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
  } else if (isUnionType(type)) {
    console.log('isUnionType', { types: schema?.getPossibleTypes(type) });
    // return schema?.getPossibleTypes(type);
  }

  return null;
};
