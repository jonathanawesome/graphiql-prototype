import { GraphQLField, GraphQLObjectType, GraphQLSchema } from 'graphql';

type QueryFieldNames =
  | 'test'
  | 'deferrable'
  | 'streamable'
  | 'person'
  | 'longDescriptionType'
  | 'union'
  | 'id'
  | 'isTest'
  | 'image'
  | 'deprecatedField'
  | 'hasArgs';

export type TestSchemaStore = {
  schema: GraphQLSchema;
  queryType: GraphQLObjectType;
  mutationType: GraphQLObjectType;
  subscriptionType: GraphQLObjectType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getQueryField: (fieldName: QueryFieldNames) => GraphQLField<any, any>;
};
