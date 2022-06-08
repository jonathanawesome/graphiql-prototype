import { FetcherParams } from '@graphiql/toolkit';

export const fetcher =
  ({ url }: { url: string }) =>
  async (graphQLParams: FetcherParams) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(graphQLParams),
    });
    return response.json().catch(() => response.text());
  };
