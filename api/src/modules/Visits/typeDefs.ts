import { gql } from 'graphql-modules';

export const VisitsTypeDefs = gql`
  type Visit {
    "A unique identifier for this Breed within the MeowWoof system."
    id: ID!
    scheduledStart: DateTime
    scheduledEnd: DateTime
    checkInTime: DateTime
    checkOutTime: DateTime
    totalCost: Float
    pet: Pet
    person: Person
    type: VisitType
    status: VisitStatus
    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type Pet {
    "A Pet has possibly visited the MeowWoof veterinary clinic."
    visits: [Visit]
  }

  # enums
  enum VisitStatus {
    SCHEDULED
    IN_PROGRESS
    COMPLETE
  }

  enum VisitType {
    CHECKUP
    EMERGENCY
  }

  # inputs
  input VisitCreateInput {
    personId: ID!
    petId: ID!
    scheduledStart: String!
    type: VisitType!
  }

  input VisitsFilters {
    visitStatus: VisitStatus
    visitType: VisitType
    limit: Int
  }

  # error types
  type CreateVisitError implements ErrorForUI {
    message: String!
    path: String!
  }

  type VisitError implements ErrorForUI {
    message: String!
    path: String!
  }

  # unions
  union VisitResult = Visit | VisitError
  union CreateVisitResult = Visit | CreateVisitError

  # operations
  extend type Mutation {
    createVisit(input: VisitCreateInput!): CreateVisitResult!
  }

  extend type Query {
    visit(id: ID!): VisitResult!
    visits(input: VisitsFilters): [Visit]!
  }
`;
