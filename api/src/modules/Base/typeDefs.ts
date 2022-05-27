import { gql } from 'graphql-modules';

export const BaseTypeDefs = gql`
  scalar DateTime

  """
  A common error interface to expose to clients
  """
  interface ErrorForUI {
    message: String!
    path: String!
  }
`;
