/* eslint-disable */
import * as Types from '../../../generated/generated';
import * as gm from 'graphql-modules';
export namespace BaseModule {
  interface DefinedFields {
    Query: '_';
    Mutation: '_';
    ErrorForUI: 'message' | 'path';
  }

  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type ErrorForUI = Pick<Types.ErrorForUi, DefinedFields['ErrorForUI']>;

  export type Scalars = Pick<Types.Scalars, 'DateTime'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;

  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields['Mutation']
  >;
  export type ErrorForUIResolvers = Pick<
    Types.ErrorForUiResolvers,
    DefinedFields['ErrorForUI']
  >;

  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    DateTime?: Types.Resolvers['DateTime'];
  }

  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      _?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      _?: gm.Middleware[];
    };
  }
}
