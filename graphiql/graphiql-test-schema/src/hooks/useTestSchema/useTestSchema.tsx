import { GraphQLField, GraphQLObjectType } from 'graphql';
import create from 'zustand';

// test schema
import { testSchema } from './testSchema';

// types
import { TestSchemaStore } from './types';

export const useTestSchema = create<TestSchemaStore>((set, get) => ({
  schema: testSchema,
  queryType: testSchema.getQueryType() as GraphQLObjectType,
  mutationType: testSchema.getMutationType() as GraphQLObjectType,
  subscriptionType: testSchema.getSubscriptionType() as GraphQLObjectType,
  getQueryField: (fieldName) => {
    const queryType = get().queryType;
    const queryFields = queryType.getFields();
    const result = Object.values(queryFields).find((field) => field.name === fieldName);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return result as GraphQLField<any, any>;
  },
}));
