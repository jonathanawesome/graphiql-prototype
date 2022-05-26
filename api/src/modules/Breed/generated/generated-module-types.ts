/* eslint-disable */
import * as Types from '../../../generated/generated';
import * as gm from 'graphql-modules';
export namespace BreedModule {
  interface DefinedFields {
    Breed: 'name' | 'species' | 'pets' | 'subBreeds' | 'createdAt' | 'updatedAt';
    SubBreed: 'id' | 'name' | 'breed' | 'createdAt' | 'updatedAt';
    BreedError: 'message' | 'path';
    CreateBreedError: 'message' | 'path';
    Mutation: 'createBreed';
    Query: 'breed' | 'breeds';
    Pet: 'breed';
  }

  interface DefinedEnumValues {
    Species: 'DOG' | 'CAT';
  }

  interface DefinedInputFields {
    CreateBreedInput: 'name' | 'species';
    BreedsFilters: 'species';
  }

  export type Breed = Pick<Types.Breed, DefinedFields['Breed']>;
  export type Species = DefinedEnumValues['Species'];
  export type Pet = Types.Pet;
  export type SubBreed = Pick<Types.SubBreed, DefinedFields['SubBreed']>;
  export type DateTime = Types.DateTime;
  export type CreateBreedInput = Pick<
    Types.CreateBreedInput,
    DefinedInputFields['CreateBreedInput']
  >;
  export type BreedsFilters = Pick<
    Types.BreedsFilters,
    DefinedInputFields['BreedsFilters']
  >;
  export type BreedError = Pick<Types.BreedError, DefinedFields['BreedError']>;
  export type ErrorForUI = Types.ErrorForUi;
  export type CreateBreedError = Pick<
    Types.CreateBreedError,
    DefinedFields['CreateBreedError']
  >;
  export type BreedResult = Types.BreedResult;
  export type CreateBreedResult = Types.CreateBreedResult;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;

  export type BreedResolvers = Pick<
    Types.BreedResolvers,
    DefinedFields['Breed'] | '__isTypeOf'
  >;
  export type SubBreedResolvers = Pick<
    Types.SubBreedResolvers,
    DefinedFields['SubBreed'] | '__isTypeOf'
  >;
  export type BreedErrorResolvers = Pick<
    Types.BreedErrorResolvers,
    DefinedFields['BreedError'] | '__isTypeOf'
  >;
  export type CreateBreedErrorResolvers = Pick<
    Types.CreateBreedErrorResolvers,
    DefinedFields['CreateBreedError'] | '__isTypeOf'
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields['Mutation']
  >;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type PetResolvers = Pick<Types.PetResolvers, DefinedFields['Pet']>;

  export interface Resolvers {
    Breed?: BreedResolvers;
    SubBreed?: SubBreedResolvers;
    BreedError?: BreedErrorResolvers;
    CreateBreedError?: CreateBreedErrorResolvers;
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    Pet?: PetResolvers;
  }

  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Breed?: {
      '*'?: gm.Middleware[];
      name?: gm.Middleware[];
      species?: gm.Middleware[];
      pets?: gm.Middleware[];
      subBreeds?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    Pet?: {
      '*'?: gm.Middleware[];
      breed?: gm.Middleware[];
    };
    SubBreed?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      breed?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    BreedError?: {
      '*'?: gm.Middleware[];
      message?: gm.Middleware[];
      path?: gm.Middleware[];
    };
    CreateBreedError?: {
      '*'?: gm.Middleware[];
      message?: gm.Middleware[];
      path?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createBreed?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      breed?: gm.Middleware[];
      breeds?: gm.Middleware[];
    };
  }
}
