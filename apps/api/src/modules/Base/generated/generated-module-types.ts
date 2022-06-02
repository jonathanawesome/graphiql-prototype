/* eslint-disable */
import * as Types from '../../../generated/generated';
import * as gm from 'graphql-modules';
export namespace BaseModule {
  interface DefinedFields {
    ErrorForUI: 'message' | 'path';
  }

  export type ErrorForUI = Pick<Types.ErrorForUi, DefinedFields['ErrorForUI']>;

  export type Scalars = Pick<Types.Scalars, 'DateTime'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;

  export type ErrorForUIResolvers = Pick<
    Types.ErrorForUiResolvers,
    DefinedFields['ErrorForUI']
  >;

  export interface Resolvers {
    DateTime?: Types.Resolvers['DateTime'];
  }

  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
  }
}
