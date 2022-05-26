import { gql } from 'graphql-modules';

export const BaseTypeDefs = gql`
  scalar DateTime

  # root types
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }

  """
  A common error interface to expose to clients
  """
  interface ErrorForUI {
    message: String!
    path: String!
  }
`;
