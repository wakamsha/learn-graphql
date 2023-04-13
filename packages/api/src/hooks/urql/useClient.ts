import { useMemo } from 'react';
import { Provider, cacheExchange, createClient, fetchExchange, type ClientOptions } from 'urql';

type Options = {
  /**
   * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
   */
  requestHeaders: Exclude<NonNullable<Exclude<ClientOptions['fetchOptions'], () => unknown>>['headers'], undefined>;
};

export function useClient(url: string, options?: Options) {
  const client = useMemo(
    () =>
      createClient({
        url,
        exchanges: [cacheExchange, fetchExchange],
        ...(options
          ? {
              fetchOptions: {
                headers: options.requestHeaders,
              },
            }
          : {}),
      }),
    [options, url],
  );

  return {
    client,
    Provider,
  };
}
