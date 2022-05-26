import { gql } from 'graphql-modules';

export const BreedTypeDefs = gql`
  type Breed {
    """
    A unique identifier for this Breed within the MeowWoof system.
    """
    name: String!
    """
    A Breed is of a single Species.
    """
    species: Species
    """
    A list of Pets of this breed.
    """
    pets: [Pet]
    """
    A list of SubBreeds of this Breed
    """
    subBreeds: [SubBreed]
    """
    An ISO 8601-formatted string representing the time this Breed was added to the system.
    """
    createdAt: DateTime
    """
    An ISO 8601-formatted string representing the time this Breed record was last updated.
    """
    updatedAt: DateTime
  }

  extend type Pet {
    """
    A Pet is of a breed.
    """
    breed: Breed
  }

  type SubBreed {
    """
    A unique identifier for this SubBreed within the MeowWoof system.
    """
    id: String!
    """
    A non-unique name for this SubBreed.
    """
    name: String
    """
    The Breed to which this SubBreed belongs.
    """
    breed: Breed
    """
    An ISO 8601-formatted string representing the time this SubBreed was added to the system.
    """
    createdAt: DateTime
    """
    An ISO 8601-formatted string representing the time this SubBreed record was last updated.
    """
    updatedAt: DateTime
  }

  """
  An enum of possible Species
  """
  enum Species {
    DOG
    CAT
  }

  """
  Required arguments when adding a new Breed to the system.
  """
  input CreateBreedInput {
    name: String!
    species: Species!
  }

  """
  Arguments used when searching and/or filtering Breeds.
  """
  input BreedsFilters {
    species: Species!
  }

  # error types
  type BreedError implements ErrorForUI {
    message: String!
    path: String!
  }

  type CreateBreedError implements ErrorForUI {
    message: String!
    path: String!
  }

  # unions
  union BreedResult = Breed | BreedError
  union CreateBreedResult = Breed | CreateBreedError

  # operations
  extend type Mutation {
    """
    Adds a Breed to the MeowWoof system,
    """
    createBreed(input: CreateBreedInput!): CreateBreedResult!
  }

  extend type Query {
    """
    Finds a Breed given a name. Returns a Breed object or an ErrorForUI.
    """
    breed(name: String!): BreedResult!

    """
    Finds Breeds given specific input arguments. Returns an array of Breeds matching the input filters or an empty array.
    """
    breeds(input: BreedsFilters!): [Breed]!
  }
`;
