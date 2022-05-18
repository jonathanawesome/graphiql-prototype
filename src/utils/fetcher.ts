import { createGraphiQLFetcher } from '@graphiql/toolkit';

export const fetcher = createGraphiQLFetcher({
  url: 'https://api.spacex.land/graphql/',
});
