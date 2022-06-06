/* eslint-disable */
import * as Types from '../../../generated/generated';
import * as gm from 'graphql-modules';
export namespace VisitsModule {
  interface DefinedFields {
    Visit:
      | 'id'
      | 'scheduledStart'
      | 'scheduledEnd'
      | 'checkInTime'
      | 'checkOutTime'
      | 'totalCost'
      | 'pet'
      | 'person'
      | 'type'
      | 'status'
      | 'createdAt'
      | 'updatedAt';
    CreateVisitError: 'message' | 'path';
    VisitError: 'message' | 'path';
    Mutation: 'createVisit';
    Query: 'visit' | 'visits';
    Pet: 'visits';
  }

  interface DefinedEnumValues {
    VisitStatus: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETE';
    VisitType: 'CHECKUP' | 'EMERGENCY';
  }

  interface DefinedInputFields {
    VisitCreateInput: 'personId' | 'petId' | 'scheduledStart' | 'type';
    VisitsFilters: 'visitStatus' | 'visitType' | 'limit';
  }

  export type Visit = Pick<Types.Visit, DefinedFields['Visit']>;
  export type DateTime = Types.DateTime;
  export type Pet = Types.Pet;
  export type Person = Types.Person;
  export type VisitType = DefinedEnumValues['VisitType'];
  export type VisitStatus = DefinedEnumValues['VisitStatus'];
  export type VisitCreateInput = Pick<
    Types.VisitCreateInput,
    DefinedInputFields['VisitCreateInput']
  >;
  export type VisitsFilters = Pick<
    Types.VisitsFilters,
    DefinedInputFields['VisitsFilters']
  >;
  export type CreateVisitError = Pick<
    Types.CreateVisitError,
    DefinedFields['CreateVisitError']
  >;
  export type ErrorForUI = Types.ErrorForUi;
  export type VisitError = Pick<Types.VisitError, DefinedFields['VisitError']>;
  export type VisitResult = Types.VisitResult;
  export type CreateVisitResult = Types.CreateVisitResult;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;

  export type VisitResolvers = Pick<
    Types.VisitResolvers,
    DefinedFields['Visit'] | '__isTypeOf'
  >;
  export type CreateVisitErrorResolvers = Pick<
    Types.CreateVisitErrorResolvers,
    DefinedFields['CreateVisitError'] | '__isTypeOf'
  >;
  export type VisitErrorResolvers = Pick<
    Types.VisitErrorResolvers,
    DefinedFields['VisitError'] | '__isTypeOf'
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields['Mutation']
  >;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type PetResolvers = Pick<Types.PetResolvers, DefinedFields['Pet']>;

  export interface Resolvers {
    Visit?: VisitResolvers;
    CreateVisitError?: CreateVisitErrorResolvers;
    VisitError?: VisitErrorResolvers;
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    Pet?: PetResolvers;
  }

  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Visit?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      scheduledStart?: gm.Middleware[];
      scheduledEnd?: gm.Middleware[];
      checkInTime?: gm.Middleware[];
      checkOutTime?: gm.Middleware[];
      totalCost?: gm.Middleware[];
      pet?: gm.Middleware[];
      person?: gm.Middleware[];
      type?: gm.Middleware[];
      status?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    Pet?: {
      '*'?: gm.Middleware[];
      visits?: gm.Middleware[];
    };
    CreateVisitError?: {
      '*'?: gm.Middleware[];
      message?: gm.Middleware[];
      path?: gm.Middleware[];
    };
    VisitError?: {
      '*'?: gm.Middleware[];
      message?: gm.Middleware[];
      path?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createVisit?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      visit?: gm.Middleware[];
      visits?: gm.Middleware[];
    };
  }
}
