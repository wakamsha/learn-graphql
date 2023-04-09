import { useMemo } from 'react';
import { Provider, cacheExchange, createClient, fetchExchange } from 'urql';

export function useClient(url: string) {
  const client = useMemo(
    () =>
      createClient({
        url,
        exchanges: [cacheExchange, fetchExchange],
      }),
    [url],
  );

  return {
    client,
    Provider,
  };
}
