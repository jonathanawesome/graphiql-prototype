import { gql } from 'graphql-modules';

export const BreedTypeDefs = gql`
  "A group of usually domesticated animals presumably related by descent from common ancestors and visibly similar in most characters."
  type Breed {
    "A unique identifier for a Breed within the MeowWoof system."
    name: String!
    "A Breed is of a single Species."
    species: Species
    "A list of Pets of a breed."
    pets: [Pet]
    "A list of SubBreeds of a Breed"
    subBreeds: [SubBreed]
    "An ISO 8601-formatted string representing the time a Breed was added to the system."
    createdAt: DateTime
    "An ISO 8601-formatted string representing the time a Breed record was last updated."
    updatedAt: DateTime
  }

  extend type Pet {
    "A Pet is of a breed."
    breed: Breed
  }

  type SubBreed {
    "A unique identifier for a SubBreed within the MeowWoof system."
    id: ID!
    "A non-unique name for a SubBreed."
    name: String
    "The Breed to which a SubBreed belongs."
    breed: Breed
    "An ISO 8601-formatted string representing the time a SubBreed was added to the system."
    createdAt: DateTime
    "An ISO 8601-formatted string representing the time a SubBreed record was last updated."
    updatedAt: DateTime
  }

  "An enum of possible Species"
  enum Species {
    DOG
    CAT
  }

  "Required arguments when adding a new Breed to the system."
  input CreateBreedInput {
    "A unique name for this breed"
    name: String!
    "An enum indicating the species."
    species: Species!
  }

  "Not required Top Level Input Pbject"
  input TestNotRequired {
    "A dummy1 argument of type Boolean."
    dummy1: Boolean
  }

  "Arguments used when searching and/or filtering Breeds."
  input BreedsFilters {
    "An enum indicating the species."
    species: Species!
    "A dummy1 argument of type Boolean."
    dummy1: Boolean
    "A dummy2 argument of type Int."
    dummy2: Int
    "A dummy3 argument of type String."
    dummy3: String
    "A dummy4 argument of type ID."
    dummy4: ID
    nested: NestedInput
  }

  "A nested InputType...do folks do this?"
  input NestedInput {
    "arg1 argument of type Boolean."
    arg1: Boolean
    "arg2 argument of type Int."
    arg2: Int
    "arg3 argument of type String."
    arg3: String
    "arg4 argument of type ID."
    arg4: ID
  }

  # error types
  "A UI error used when a breed query fails to complete."
  type BreedError implements ErrorForUI {
    "A message specific to this error case."
    message: String!
    "The path from which this error originated."
    path: String!
  }

  "A UI error used when a createBreed mutation fails to complete."
  type CreateBreedError implements ErrorForUI {
    message: String!
    path: String!
  }

  # unions
  union BreedResult = Breed | BreedError
  union CreateBreedResult = Breed | CreateBreedError

  # operations
  extend type Mutation {
    "Adds a Breed to the MeowWoof system."
    createBreed(input: CreateBreedInput!): CreateBreedResult!
  }

  extend type Query {
    "Finds a Breed given a name. Returns a Breed object or an ErrorForUI."
    breed(
      "A unique name for this breed"
      name: String!
      "A fake String argument used for testing."
      fakeArg: String
    ): BreedResult!

    "Finds Breeds given specific input arguments. Returns an array of Breeds matching the input filters or an empty array."
    breeds(
      notRequiredInput: TestNotRequired
      input: BreedsFilters!
      test: String
    ): [Breed]!
  }
`;
