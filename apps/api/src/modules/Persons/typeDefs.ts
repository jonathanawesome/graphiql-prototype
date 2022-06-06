import { gql } from 'graphql-modules';

export const PersonsTypeDefs = gql`
  """
  A Person can be either an employee of MeowWoof or a pet owner that brings their pet to MeowWoof.
  """
  type Person {
    """
    A unique identifier for this Person within the MeowWoof system.
    """
    id: ID!
    """
    All Persons in the system must be registered with a first name.
    """
    firstName: String
    """
    All Persons in the system must be registered with a last name.
    """
    lastName: String
    """
    A Person is either an EMPLOYEE or a PET_OWNER.
    """
    type: PersonType
    """
    A list of pets owned by this PET_OWNER..
    """
    pets: [Pet]
    """
    A list of past, active, and upcoming PET_OWNER visits to MeowWoof.
    """
    visits: [Visit]
    """
    An ISO 8601-formatted string representing the time this Person was added to the system.
    """
    createdAt: DateTime
    """
    An ISO 8601-formatted string representing the time this Person record was last updated.
    """
    updatedAt: DateTime
  }

  extend type Pet {
    """
    A Pet has one owner.
    """
    owner: Person
  }

  """
  A Person is either an EMPLOYEE or a PET_OWNER.
  """
  enum PersonType {
    PET_OWNER
    EMPLOYEE
  }

  """
  A common input for a Person's first and last name.
  """
  input PersonName {
    firstName: String!
    lastName: String!
  }

  """
  Required arguments when adding a new Person to the system.
  """
  input CreatePersonInput {
    name: PersonName!
    type: PersonType!
  }

  """
  Arguments used when searching and/or filtering persons.
  """
  input PersonsFilters {
    type: PersonType!
  }

  """
  Arguments used when searching and/or filtering EMPLOYEEs.
  """
  input EmployeesFilters {
    specificEmployeeIds: [ID!]!
  }

  # error types
  type CreatePersonError implements ErrorForUI {
    message: String!
    path: String!
  }

  type PersonError implements ErrorForUI {
    message: String!
    path: String!
  }

  # unions
  union PersonResult = Person | PersonError
  union CreatePersonResult = Person | CreatePersonError

  # operations
  extend type Mutation {
    """
    Adds a Person to the MeowWoof system,
    """
    createPerson(input: CreatePersonInput!): CreatePersonResult!
  }

  extend type Query {
    """
    Finds a Person given an ID. Returns a Person object or an ErrorForUI.
    """
    person(id: ID!): PersonResult!
    """
    Finds Persons given specific input arguments. Returns an array of Persons matching the input filters or an empty array.
    """
    persons(input: PersonsFilters!): [Person]!
    """
    Retrieves EMPLOYEEs only
    """
    employees(input: EmployeesFilters): [Person]!
    """
    Retrieves PET_OWNERs only
    """
    petOwners(limit: Int): [Person]!
  }
`;
