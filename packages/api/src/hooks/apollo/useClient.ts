import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useMemo } from 'react';

export function useClient(uri: string) {
  const client = useMemo(
    () =>
      new ApolloClient({
        uri,
        cache: new InMemoryCache(),
      }),
    [uri],
  );

  return {
    client,
    Provider: ApolloProvider,
  };
}
