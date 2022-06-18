// import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { FetcherParams } from '@graphiql/toolkit';

export const fetcher =
  ({ headers, url }: { headers?: HeadersInit; url: string }) =>
  async (graphQLParams: FetcherParams) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(graphQLParams),
    });
    return response.json().catch(() => response.text());
  };

// export const fetcher = ({ url }: { url: string }) =>
//   createGraphiQLFetcher({
//     url,
//   });
