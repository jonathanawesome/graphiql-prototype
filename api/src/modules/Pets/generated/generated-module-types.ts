/* eslint-disable */
import * as Types from '../../../generated/generated';
import * as gm from 'graphql-modules';
export namespace PetsModule {
  interface DefinedFields {
    Pet: 'id' | 'name' | 'createdAt' | 'updatedAt';
    PetError: 'message' | 'path';
    CreatePetError: 'message' | 'path';
    Mutation: 'createPet';
    Query: 'pet' | 'pets';
  }

  interface DefinedInputFields {
    CreatePetInput: 'name' | 'ownerId' | 'breedName';
    PetsFilters: 'ownerId' | 'breedName';
  }

  export type Pet = Pick<Types.Pet, DefinedFields['Pet']>;
  export type DateTime = Types.DateTime;
  export type CreatePetInput = Pick<
    Types.CreatePetInput,
    DefinedInputFields['CreatePetInput']
  >;
  export type PetsFilters = Pick<Types.PetsFilters, DefinedInputFields['PetsFilters']>;
  export type PetError = Pick<Types.PetError, DefinedFields['PetError']>;
  export type ErrorForUI = Types.ErrorForUi;
  export type CreatePetError = Pick<
    Types.CreatePetError,
    DefinedFields['CreatePetError']
  >;
  export type PetResult = Types.PetResult;
  export type CreatePetResult = Types.CreatePetResult;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;

  export type PetResolvers = Pick<
    Types.PetResolvers,
    DefinedFields['Pet'] | '__isTypeOf'
  >;
  export type PetErrorResolvers = Pick<
    Types.PetErrorResolvers,
    DefinedFields['PetError'] | '__isTypeOf'
  >;
  export type CreatePetErrorResolvers = Pick<
    Types.CreatePetErrorResolvers,
    DefinedFields['CreatePetError'] | '__isTypeOf'
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields['Mutation']
  >;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;

  export interface Resolvers {
    Pet?: PetResolvers;
    PetError?: PetErrorResolvers;
    CreatePetError?: CreatePetErrorResolvers;
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
  }

  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Pet?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    PetError?: {
      '*'?: gm.Middleware[];
      message?: gm.Middleware[];
      path?: gm.Middleware[];
    };
    CreatePetError?: {
      '*'?: gm.Middleware[];
      message?: gm.Middleware[];
      path?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createPet?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      pet?: gm.Middleware[];
      pets?: gm.Middleware[];
    };
  }
}
