import { gql } from 'graphql-modules';

export const PetsTypeDefs = gql`
  """
  A domesticated animal kept for pleasure rather than utility. A Pet has an owner, is of a specific breed, and possibly has visited MeowWoof.
  """
  type Pet {
    """
    A unique identifier for this Pet within the MeowWoof system.
    """
    id: String!
    """
    A Pet has a name that is not unique in the MeowWoof system.
    """
    name: String
    #"""
    #A Pet has one owner.
    #"""
    #owner: Person
    #"""
    #A Pet is of a breed.
    #"""
    #breed: Breed
    #"""
    #A Pet has possibly visited the MeowWoof veterinary clinic.
    #"""
    #visits: [Visit]
    """
    An ISO 8601-formatted string representing the time this Pet was added to the system.
    """
    createdAt: DateTime
    """
    An ISO 8601-formatted string representing the time this Pet record was last updated.
    """
    updatedAt: DateTime
  }

  """
  Required arguments when adding a new Pet to the system.
  """
  input CreatePetInput {
    name: String!
    ownerId: ID!
    breedName: String!
  }

  """
  Arguments used when searching and/or filtering Pets.
  """
  input PetsFilters {
    ownerId: ID
    breedName: String
  }

  # error types

  type PetError implements ErrorForUI {
    message: String!
    path: String!
  }

  type CreatePetError implements ErrorForUI {
    message: String!
    path: String!
  }

  # unions
  union PetResult = Pet | PetError
  union CreatePetResult = Pet | CreatePetError

  # operations
  type Mutation {
    """
    Adds a Pet to the MeowWoof system,
    """
    createPet(input: CreatePetInput!): CreatePetResult!
  }

  type Query {
    """
    Finds a Pet given a name. Returns a Pet object or an ErrorForUI.
    """
    pet(id: ID!): PetResult!

    """
    Finds Pets given specific input arguments. Returns an array of Pets matching the input filters or an empty array.
    """
    pets(input: PetsFilters!): [Pet]!
  }
`;
