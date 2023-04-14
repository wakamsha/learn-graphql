import { useClient } from '@learn-graphql/api/src/hooks/urql/useClient';
import { startMsw } from '@learn-graphql/core/src/utils/Catalog';
import { Preview } from '@storybook/react';

startMsw();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => {
      const { Provider, client } = useClient('http://localhost:4000/graphql', {
        requestHeaders: {
          // urql デフォルトの MIME タイプから `text/event-stream` を除外したものを指定する。
          // worker として起動した msw は `text/event-stream` をリクエストヘッダーに含むリクエストはインターセプトせず素通りさせる仕様となっている。
          // そのため urql を使う際はこの措置が必要となる。
          // @see urql code. {@link https://github.com/urql-graphql/urql/blob/247544379cd5c32a2b026aea4b9771302a4896a6/packages/core/src/internal/fetchOptions.ts#L126}
          // @see msw code. {@link https://github.com/mswjs/msw/blob/670dda7b97f6430418d6faf09698f9a1bca5cf07/src/mockServiceWorker.js#L91-L94}
          Accept: 'application/graphql-response+json, application/graphql+json, application/json, multipart/mixed',
        },
      });

      return (
        <Provider value={client}>
          <Story />
        </Provider>
      );
    },
  ],
};

export default preview;
