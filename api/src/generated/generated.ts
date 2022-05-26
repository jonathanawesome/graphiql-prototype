/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Breed = {
  __typename: 'Breed';
  /** An ISO 8601-formatted string representing the time this Breed was added to the system. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** A unique identifier for this Breed within the MeowWoof system. */
  name: Scalars['String'];
  /** A list of Pets of this breed. */
  pets?: Maybe<Array<Maybe<Pet>>>;
  /** A Breed is of a single Species. */
  species?: Maybe<Species>;
  /** A list of SubBreeds of this Breed */
  subBreeds?: Maybe<Array<Maybe<SubBreed>>>;
  /** An ISO 8601-formatted string representing the time this Breed record was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BreedError = ErrorForUi & {
  __typename: 'BreedError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type BreedResult = Breed | BreedError;

/** Arguments used when searching and/or filtering Breeds. */
export type BreedsFilters = {
  species: Species;
};

export type CreateBreedError = ErrorForUi & {
  __typename: 'CreateBreedError';
  message: Scalars['String'];
  path: Scalars['String'];
};

/** Required arguments when adding a new Breed to the system. */
export type CreateBreedInput = {
  name: Scalars['String'];
  species: Species;
};

export type CreateBreedResult = Breed | CreateBreedError;

export type CreatePersonError = ErrorForUi & {
  __typename: 'CreatePersonError';
  message: Scalars['String'];
  path: Scalars['String'];
};

/** Required arguments when adding a new Person to the system. */
export type CreatePersonInput = {
  name: PersonName;
  type: PersonType;
};

export type CreatePersonResult = CreatePersonError | Person;

export type CreatePetError = ErrorForUi & {
  __typename: 'CreatePetError';
  message: Scalars['String'];
  path: Scalars['String'];
};

/** Required arguments when adding a new Pet to the system. */
export type CreatePetInput = {
  breedName: Scalars['String'];
  name: Scalars['String'];
  ownerId: Scalars['ID'];
};

export type CreatePetResult = CreatePetError | Pet;

export type CreateVisitError = ErrorForUi & {
  __typename: 'CreateVisitError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type CreateVisitResult = CreateVisitError | Visit;

/** A common error interface to expose to clients */
export type ErrorForUi = {
  message: Scalars['String'];
  path: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  _?: Maybe<Scalars['String']>;
  /** Adds a Breed to the MeowWoof system, */
  createBreed: CreateBreedResult;
  /** Adds a Person to the MeowWoof system, */
  createPerson: CreatePersonResult;
  /** Adds a Pet to the MeowWoof system, */
  createPet: CreatePetResult;
  createVisit: CreateVisitResult;
};

export type MutationCreateBreedArgs = {
  input: CreateBreedInput;
};

export type MutationCreatePersonArgs = {
  input: CreatePersonInput;
};

export type MutationCreatePetArgs = {
  input: CreatePetInput;
};

export type MutationCreateVisitArgs = {
  input: VisitCreateInput;
};

/** A Person can be either an employee of MeowWoof or a pet owner that brings their pet to MeowWoof. */
export type Person = {
  __typename: 'Person';
  /** An ISO 8601-formatted string representing the time this Person was added to the system. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** All Persons in the system must be registered with a first name. */
  firstName?: Maybe<Scalars['String']>;
  /** A unique identifier for this Person within the MeowWoof system. */
  id: Scalars['ID'];
  /** All Persons in the system must be registered with a last name. */
  lastName?: Maybe<Scalars['String']>;
  /** A list of pets owned by this PET_OWNER.. */
  pets?: Maybe<Array<Maybe<Pet>>>;
  /** A Person is either an EMPLOYEE or a PET_OWNER. */
  type?: Maybe<PersonType>;
  /** An ISO 8601-formatted string representing the time this Person record was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** A list of past, active, and upcoming PET_OWNER visits to MeowWoof. */
  visits?: Maybe<Array<Maybe<Visit>>>;
};

export type PersonError = ErrorForUi & {
  __typename: 'PersonError';
  message: Scalars['String'];
  path: Scalars['String'];
};

/** A common input for a Person's first and last name. */
export type PersonName = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type PersonResult = Person | PersonError;

/** A Person is either an EMPLOYEE or a PET_OWNER. */
export type PersonType = 'EMPLOYEE' | 'PET_OWNER';

/** Arguments used when searching and/or filtering persons. */
export type PersonsFilters = {
  type: PersonType;
};

/** A Pet has an owner, is of a specific breed, and possibly has visited MeowWoof. */
export type Pet = {
  __typename: 'Pet';
  /** A Pet is of a breed. */
  breed?: Maybe<Breed>;
  /** An ISO 8601-formatted string representing the time this Pet was added to the system. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** A unique identifier for this Pet within the MeowWoof system. */
  id: Scalars['String'];
  /** A Pet has a name that is not unique in the MeowWoof system. */
  name?: Maybe<Scalars['String']>;
  /** A Pet has one owner. */
  owner?: Maybe<Person>;
  /** An ISO 8601-formatted string representing the time this Pet record was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** A Pet has possibly visited the MeowWoof veterinary clinic. */
  visits?: Maybe<Array<Maybe<Visit>>>;
};

export type PetError = ErrorForUi & {
  __typename: 'PetError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type PetResult = Pet | PetError;

/** Arguments used when searching and/or filtering Pets. */
export type PetsFilters = {
  breedName?: InputMaybe<Scalars['String']>;
  ownerId?: InputMaybe<Scalars['ID']>;
};

export type Query = {
  __typename: 'Query';
  _?: Maybe<Scalars['String']>;
  /** Finds a Breed given a name. Returns a Breed object or an ErrorForUI. */
  breed: BreedResult;
  /** Finds Breeds given specific input arguments. Returns an array of Breeds matching the input filters or an empty array. */
  breeds: Array<Maybe<Breed>>;
  /** Finds a Person given an ID. Returns a Person object or an ErrorForUI. */
  person: PersonResult;
  /** Finds Persons given specific input arguments. Returns an array of Persons matching the input filters or an empty array. */
  persons: Array<Maybe<Person>>;
  /** Finds a Pet given a name. Returns a Pet object or an ErrorForUI. */
  pet: PetResult;
  /** Finds Pets given specific input arguments. Returns an array of Pets matching the input filters or an empty array. */
  pets: Array<Maybe<Pet>>;
  visit: VisitResult;
  visits: Array<Maybe<Visit>>;
};

export type QueryBreedArgs = {
  name: Scalars['String'];
};

export type QueryBreedsArgs = {
  input: BreedsFilters;
};

export type QueryPersonArgs = {
  id: Scalars['ID'];
};

export type QueryPersonsArgs = {
  input: PersonsFilters;
};

export type QueryPetArgs = {
  id: Scalars['ID'];
};

export type QueryPetsArgs = {
  input: PetsFilters;
};

export type QueryVisitArgs = {
  id: Scalars['String'];
};

export type QueryVisitsArgs = {
  input: VisitsFilters;
};

/** An enum of possible Species */
export type Species = 'CAT' | 'DOG';

export type SubBreed = {
  __typename: 'SubBreed';
  /** The Breed to which this SubBreed belongs. */
  breed?: Maybe<Breed>;
  /** An ISO 8601-formatted string representing the time this SubBreed was added to the system. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** A unique identifier for this SubBreed within the MeowWoof system. */
  id: Scalars['String'];
  /** A non-unique name for this SubBreed. */
  name?: Maybe<Scalars['String']>;
  /** An ISO 8601-formatted string representing the time this SubBreed record was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Visit = {
  __typename: 'Visit';
  checkInTime?: Maybe<Scalars['DateTime']>;
  checkOutTime?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  person?: Maybe<Person>;
  pet?: Maybe<Pet>;
  scheduledEnd?: Maybe<Scalars['DateTime']>;
  scheduledStart?: Maybe<Scalars['DateTime']>;
  status?: Maybe<VisitStatus>;
  totalCost?: Maybe<Scalars['Float']>;
  type?: Maybe<VisitType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type VisitCreateInput = {
  personId: Scalars['String'];
  petId: Scalars['String'];
  scheduledStart: Scalars['String'];
  type: VisitType;
};

export type VisitError = ErrorForUi & {
  __typename: 'VisitError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type VisitResult = Visit | VisitError;

export type VisitStatus = 'COMPLETE' | 'IN_PROGRESS' | 'SCHEDULED';

export type VisitType = 'CHECKUP' | 'EMERGENCY';

export type VisitsFilters = {
  visitStatus?: InputMaybe<VisitStatus>;
  visitType?: InputMaybe<VisitType>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Breed: ResolverTypeWrapper<Breed>;
  BreedError: ResolverTypeWrapper<BreedError>;
  BreedResult: ResolversTypes['Breed'] | ResolversTypes['BreedError'];
  BreedsFilters: BreedsFilters;
  CreateBreedError: ResolverTypeWrapper<CreateBreedError>;
  CreateBreedInput: CreateBreedInput;
  CreateBreedResult: ResolversTypes['Breed'] | ResolversTypes['CreateBreedError'];
  CreatePersonError: ResolverTypeWrapper<CreatePersonError>;
  CreatePersonInput: CreatePersonInput;
  CreatePersonResult: ResolversTypes['CreatePersonError'] | ResolversTypes['Person'];
  CreatePetError: ResolverTypeWrapper<CreatePetError>;
  CreatePetInput: CreatePetInput;
  CreatePetResult: ResolversTypes['CreatePetError'] | ResolversTypes['Pet'];
  CreateVisitError: ResolverTypeWrapper<CreateVisitError>;
  CreateVisitResult: ResolversTypes['CreateVisitError'] | ResolversTypes['Visit'];
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ErrorForUI:
    | ResolversTypes['BreedError']
    | ResolversTypes['CreateBreedError']
    | ResolversTypes['CreatePersonError']
    | ResolversTypes['CreatePetError']
    | ResolversTypes['CreateVisitError']
    | ResolversTypes['PersonError']
    | ResolversTypes['PetError']
    | ResolversTypes['VisitError'];
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Person: ResolverTypeWrapper<Person>;
  PersonError: ResolverTypeWrapper<PersonError>;
  PersonName: PersonName;
  PersonResult: ResolversTypes['Person'] | ResolversTypes['PersonError'];
  PersonType: PersonType;
  PersonsFilters: PersonsFilters;
  Pet: ResolverTypeWrapper<Pet>;
  PetError: ResolverTypeWrapper<PetError>;
  PetResult: ResolversTypes['Pet'] | ResolversTypes['PetError'];
  PetsFilters: PetsFilters;
  Query: ResolverTypeWrapper<{}>;
  Species: Species;
  String: ResolverTypeWrapper<Scalars['String']>;
  SubBreed: ResolverTypeWrapper<SubBreed>;
  Visit: ResolverTypeWrapper<Visit>;
  VisitCreateInput: VisitCreateInput;
  VisitError: ResolverTypeWrapper<VisitError>;
  VisitResult: ResolversTypes['Visit'] | ResolversTypes['VisitError'];
  VisitStatus: VisitStatus;
  VisitType: VisitType;
  VisitsFilters: VisitsFilters;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Breed: Breed;
  BreedError: BreedError;
  BreedResult: ResolversParentTypes['Breed'] | ResolversParentTypes['BreedError'];
  BreedsFilters: BreedsFilters;
  CreateBreedError: CreateBreedError;
  CreateBreedInput: CreateBreedInput;
  CreateBreedResult:
    | ResolversParentTypes['Breed']
    | ResolversParentTypes['CreateBreedError'];
  CreatePersonError: CreatePersonError;
  CreatePersonInput: CreatePersonInput;
  CreatePersonResult:
    | ResolversParentTypes['CreatePersonError']
    | ResolversParentTypes['Person'];
  CreatePetError: CreatePetError;
  CreatePetInput: CreatePetInput;
  CreatePetResult: ResolversParentTypes['CreatePetError'] | ResolversParentTypes['Pet'];
  CreateVisitError: CreateVisitError;
  CreateVisitResult:
    | ResolversParentTypes['CreateVisitError']
    | ResolversParentTypes['Visit'];
  DateTime: Scalars['DateTime'];
  ErrorForUI:
    | ResolversParentTypes['BreedError']
    | ResolversParentTypes['CreateBreedError']
    | ResolversParentTypes['CreatePersonError']
    | ResolversParentTypes['CreatePetError']
    | ResolversParentTypes['CreateVisitError']
    | ResolversParentTypes['PersonError']
    | ResolversParentTypes['PetError']
    | ResolversParentTypes['VisitError'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Mutation: {};
  Person: Person;
  PersonError: PersonError;
  PersonName: PersonName;
  PersonResult: ResolversParentTypes['Person'] | ResolversParentTypes['PersonError'];
  PersonsFilters: PersonsFilters;
  Pet: Pet;
  PetError: PetError;
  PetResult: ResolversParentTypes['Pet'] | ResolversParentTypes['PetError'];
  PetsFilters: PetsFilters;
  Query: {};
  String: Scalars['String'];
  SubBreed: SubBreed;
  Visit: Visit;
  VisitCreateInput: VisitCreateInput;
  VisitError: VisitError;
  VisitResult: ResolversParentTypes['Visit'] | ResolversParentTypes['VisitError'];
  VisitsFilters: VisitsFilters;
};

export type BreedResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Breed'] = ResolversParentTypes['Breed']
> = {
  createdAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pets: Resolver<Maybe<Array<Maybe<ResolversTypes['Pet']>>>, ParentType, ContextType>;
  species: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType>;
  subBreeds: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SubBreed']>>>,
    ParentType,
    ContextType
  >;
  updatedAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BreedErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BreedError'] = ResolversParentTypes['BreedError']
> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BreedResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BreedResult'] = ResolversParentTypes['BreedResult']
> = {
  __resolveType: TypeResolveFn<'Breed' | 'BreedError', ParentType, ContextType>;
};

export type CreateBreedErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CreateBreedError'] = ResolversParentTypes['CreateBreedError']
> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateBreedResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CreateBreedResult'] = ResolversParentTypes['CreateBreedResult']
> = {
  __resolveType: TypeResolveFn<'Breed' | 'CreateBreedError', ParentType, ContextType>;
};

export type CreatePersonErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CreatePersonError'] = ResolversParentTypes['CreatePersonError']
> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePersonResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CreatePersonResult'] = ResolversParentTypes['CreatePersonResult']
> = {
  __resolveType: TypeResolveFn<'CreatePersonError' | 'Person', ParentType, ContextType>;
};

export type CreatePetErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CreatePetError'] = ResolversParentTypes['CreatePetError']
> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePetResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CreatePetResult'] = ResolversParentTypes['CreatePetResult']
> = {
  __resolveType: TypeResolveFn<'CreatePetError' | 'Pet', ParentType, ContextType>;
};

export type CreateVisitErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CreateVisitError'] = ResolversParentTypes['CreateVisitError']
> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateVisitResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CreateVisitResult'] = ResolversParentTypes['CreateVisitResult']
> = {
  __resolveType: TypeResolveFn<'CreateVisitError' | 'Visit', ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ErrorForUiResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ErrorForUI'] = ResolversParentTypes['ErrorForUI']
> = {
  __resolveType: TypeResolveFn<
    | 'BreedError'
    | 'CreateBreedError'
    | 'CreatePersonError'
    | 'CreatePetError'
    | 'CreateVisitError'
    | 'PersonError'
    | 'PetError'
    | 'VisitError',
    ParentType,
    ContextType
  >;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  _: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createBreed: Resolver<
    ResolversTypes['CreateBreedResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateBreedArgs, 'input'>
  >;
  createPerson: Resolver<
    ResolversTypes['CreatePersonResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePersonArgs, 'input'>
  >;
  createPet: Resolver<
    ResolversTypes['CreatePetResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePetArgs, 'input'>
  >;
  createVisit: Resolver<
    ResolversTypes['CreateVisitResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateVisitArgs, 'input'>
  >;
};

export type PersonResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']
> = {
  createdAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  firstName: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pets: Resolver<Maybe<Array<Maybe<ResolversTypes['Pet']>>>, ParentType, ContextType>;
  type: Resolver<Maybe<ResolversTypes['PersonType']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  visits: Resolver<Maybe<Array<Maybe<ResolversTypes['Visit']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PersonErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PersonError'] = ResolversParentTypes['PersonError']
> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PersonResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PersonResult'] = ResolversParentTypes['PersonResult']
> = {
  __resolveType: TypeResolveFn<'Person' | 'PersonError', ParentType, ContextType>;
};

export type PetResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Pet'] = ResolversParentTypes['Pet']
> = {
  breed: Resolver<Maybe<ResolversTypes['Breed']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  visits: Resolver<Maybe<Array<Maybe<ResolversTypes['Visit']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PetErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PetError'] = ResolversParentTypes['PetError']
> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PetResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PetResult'] = ResolversParentTypes['PetResult']
> = {
  __resolveType: TypeResolveFn<'Pet' | 'PetError', ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  _: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  breed: Resolver<
    ResolversTypes['BreedResult'],
    ParentType,
    ContextType,
    RequireFields<QueryBreedArgs, 'name'>
  >;
  breeds: Resolver<
    Array<Maybe<ResolversTypes['Breed']>>,
    ParentType,
    ContextType,
    RequireFields<QueryBreedsArgs, 'input'>
  >;
  person: Resolver<
    ResolversTypes['PersonResult'],
    ParentType,
    ContextType,
    RequireFields<QueryPersonArgs, 'id'>
  >;
  persons: Resolver<
    Array<Maybe<ResolversTypes['Person']>>,
    ParentType,
    ContextType,
    RequireFields<QueryPersonsArgs, 'input'>
  >;
  pet: Resolver<
    ResolversTypes['PetResult'],
    ParentType,
    ContextType,
    RequireFields<QueryPetArgs, 'id'>
  >;
  pets: Resolver<
    Array<Maybe<ResolversTypes['Pet']>>,
    ParentType,
    ContextType,
    RequireFields<QueryPetsArgs, 'input'>
  >;
  visit: Resolver<
    ResolversTypes['VisitResult'],
    ParentType,
    ContextType,
    RequireFields<QueryVisitArgs, 'id'>
  >;
  visits: Resolver<
    Array<Maybe<ResolversTypes['Visit']>>,
    ParentType,
    ContextType,
    RequireFields<QueryVisitsArgs, 'input'>
  >;
};

export type SubBreedResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SubBreed'] = ResolversParentTypes['SubBreed']
> = {
  breed: Resolver<Maybe<ResolversTypes['Breed']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisitResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Visit'] = ResolversParentTypes['Visit']
> = {
  checkInTime: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  checkOutTime: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  person: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType>;
  pet: Resolver<Maybe<ResolversTypes['Pet']>, ParentType, ContextType>;
  scheduledEnd: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  scheduledStart: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  status: Resolver<Maybe<ResolversTypes['VisitStatus']>, ParentType, ContextType>;
  totalCost: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  type: Resolver<Maybe<ResolversTypes['VisitType']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisitErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['VisitError'] = ResolversParentTypes['VisitError']
> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisitResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['VisitResult'] = ResolversParentTypes['VisitResult']
> = {
  __resolveType: TypeResolveFn<'Visit' | 'VisitError', ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Breed: BreedResolvers<ContextType>;
  BreedError: BreedErrorResolvers<ContextType>;
  BreedResult: BreedResultResolvers<ContextType>;
  CreateBreedError: CreateBreedErrorResolvers<ContextType>;
  CreateBreedResult: CreateBreedResultResolvers<ContextType>;
  CreatePersonError: CreatePersonErrorResolvers<ContextType>;
  CreatePersonResult: CreatePersonResultResolvers<ContextType>;
  CreatePetError: CreatePetErrorResolvers<ContextType>;
  CreatePetResult: CreatePetResultResolvers<ContextType>;
  CreateVisitError: CreateVisitErrorResolvers<ContextType>;
  CreateVisitResult: CreateVisitResultResolvers<ContextType>;
  DateTime: GraphQLScalarType;
  ErrorForUI: ErrorForUiResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  Person: PersonResolvers<ContextType>;
  PersonError: PersonErrorResolvers<ContextType>;
  PersonResult: PersonResultResolvers<ContextType>;
  Pet: PetResolvers<ContextType>;
  PetError: PetErrorResolvers<ContextType>;
  PetResult: PetResultResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  SubBreed: SubBreedResolvers<ContextType>;
  Visit: VisitResolvers<ContextType>;
  VisitError: VisitErrorResolvers<ContextType>;
  VisitResult: VisitResultResolvers<ContextType>;
};

export type DateTime = Scalars['DateTime'];
