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

// import {
//   buildSchema,
//   GraphQLFieldMap,
//   GraphQLObjectType,
//   GraphQLSchema,
//   isObjectType,
// } from 'graphql';
// import { useEffect, useState } from 'react';

// // test schema
// import testSchema from './testSchema.js';

// export const useTestSchema = () => {
//   const [schema, setSchema] = useState<GraphQLSchema | null>(null);
//   const [queryType, setQueryType] = useState<GraphQLObjectType | null>(null);
//   const [queryFields, setQueryFields] = useState<GraphQLFieldMap<any, any> | null>(null);
//   const [mutationType, setMutationType] = useState<GraphQLObjectType | null>(null);

//   const getQueryField = ({ fieldToFind }: { fieldToFind: string }) => {
//     if (queryFields) {
//       const result = Object.values(queryFields).find((field) => {
//         return field.name === fieldToFind;
//       });
//       if (result) {
//         return result;
//       } else {
//         return null;
//       }
//     }
//     return null;
//   };

//   const getQueryFieldArgument = ({
//     fieldToFind,
//     argumentToFind,
//   }: {
//     fieldToFind: string;
//     argumentToFind: string;
//   }) => {
//     if (queryFields) {
//       const result = Object.values(queryFields).find((field) => {
//         return field.name === fieldToFind;
//       });
//       const arg = result?.args.find((a) => a.name === argumentToFind);
//       if (arg) {
//         return arg;
//       } else {
//         return null;
//       }
//     }
//     return null;
//   };

//   useEffect(() => {
//     if (!schema) {
//       setSchema(testSchema);
//     }
//     if (schema) {
//       const queryType = schema.getQueryType();
//       if (isObjectType(queryType)) {
//         setQueryType(queryType);
//         setQueryFields(queryType.getFields());
//       }
//       const mutationType = schema.getMutationType();
//       if (isObjectType(mutationType)) {
//         setMutationType(mutationType);
//       }
//     }
//   }, [schema]);

//   return { schema, queryType, mutationType, getQueryField, getQueryFieldArgument };
// };
