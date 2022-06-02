/* eslint-disable */
import * as Types from '../../../generated/generated';
import * as gm from 'graphql-modules';
export namespace PersonsModule {
  interface DefinedFields {
    Person:
      | 'id'
      | 'firstName'
      | 'lastName'
      | 'type'
      | 'pets'
      | 'visits'
      | 'createdAt'
      | 'updatedAt';
    CreatePersonError: 'message' | 'path';
    PersonError: 'message' | 'path';
    Mutation: 'createPerson';
    Query: 'person' | 'persons' | 'employees' | 'petOwners';
    Pet: 'owner';
  }

  interface DefinedEnumValues {
    PersonType: 'PET_OWNER' | 'EMPLOYEE';
  }

  interface DefinedInputFields {
    PersonName: 'firstName' | 'lastName';
    CreatePersonInput: 'name' | 'type';
    PersonsFilters: 'type';
    EmployeesFilters: 'specificEmployeeIds';
  }

  export type Person = Pick<Types.Person, DefinedFields['Person']>;
  export type PersonType = DefinedEnumValues['PersonType'];
  export type Pet = Types.Pet;
  export type Visit = Types.Visit;
  export type DateTime = Types.DateTime;
  export type PersonName = Pick<Types.PersonName, DefinedInputFields['PersonName']>;
  export type CreatePersonInput = Pick<
    Types.CreatePersonInput,
    DefinedInputFields['CreatePersonInput']
  >;
  export type PersonsFilters = Pick<
    Types.PersonsFilters,
    DefinedInputFields['PersonsFilters']
  >;
  export type EmployeesFilters = Pick<
    Types.EmployeesFilters,
    DefinedInputFields['EmployeesFilters']
  >;
  export type CreatePersonError = Pick<
    Types.CreatePersonError,
    DefinedFields['CreatePersonError']
  >;
  export type ErrorForUI = Types.ErrorForUi;
  export type PersonError = Pick<Types.PersonError, DefinedFields['PersonError']>;
  export type PersonResult = Types.PersonResult;
  export type CreatePersonResult = Types.CreatePersonResult;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;

  export type PersonResolvers = Pick<
    Types.PersonResolvers,
    DefinedFields['Person'] | '__isTypeOf'
  >;
  export type CreatePersonErrorResolvers = Pick<
    Types.CreatePersonErrorResolvers,
    DefinedFields['CreatePersonError'] | '__isTypeOf'
  >;
  export type PersonErrorResolvers = Pick<
    Types.PersonErrorResolvers,
    DefinedFields['PersonError'] | '__isTypeOf'
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields['Mutation']
  >;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type PetResolvers = Pick<Types.PetResolvers, DefinedFields['Pet']>;

  export interface Resolvers {
    Person?: PersonResolvers;
    CreatePersonError?: CreatePersonErrorResolvers;
    PersonError?: PersonErrorResolvers;
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    Pet?: PetResolvers;
  }

  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Person?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      firstName?: gm.Middleware[];
      lastName?: gm.Middleware[];
      type?: gm.Middleware[];
      pets?: gm.Middleware[];
      visits?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    Pet?: {
      '*'?: gm.Middleware[];
      owner?: gm.Middleware[];
    };
    CreatePersonError?: {
      '*'?: gm.Middleware[];
      message?: gm.Middleware[];
      path?: gm.Middleware[];
    };
    PersonError?: {
      '*'?: gm.Middleware[];
      message?: gm.Middleware[];
      path?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createPerson?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      person?: gm.Middleware[];
      persons?: gm.Middleware[];
      employees?: gm.Middleware[];
      petOwners?: gm.Middleware[];
    };
  }
}
