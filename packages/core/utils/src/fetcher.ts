import type { FetcherParams } from '@graphiql/toolkit';

export const fetcher = async ({
  headers,
  params,
  url,
}: {
  headers: HeadersInit;
  params: FetcherParams;
  url: string;
}) => {
  const t0 = performance.now();
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });

  if (res.ok) {
    const t1 = performance.now();
    console.log(`Fetch took ${Math.round(t1 - t0)} milliseconds.`, { headers, params });
    return res.json();
  } else {
    return res.json().then((json) => {
      console.log('Fetch failed:', {
        status: res.status,
        ok: false,
        message: json.message,
        body: json,
      });
    });
  }
};
