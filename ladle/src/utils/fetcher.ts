import { createGraphiQLFetcher } from '@graphiql/toolkit';

export const fetcher = createGraphiQLFetcher({
  url: 'http://localhost:4000/graphql',
  // url: 'https://api.spacex.land/graphql/',
});
