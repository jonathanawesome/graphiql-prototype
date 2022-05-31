import { gql } from 'graphql-modules';

export const BaseTypeDefs = gql`
  scalar DateTime

  """
  A common error interface to expose to clients.
  """
  interface ErrorForUI {
    "A message specific to this error case."
    message: String!
    "The path from which this error originated."
    path: String!
  }
`;
