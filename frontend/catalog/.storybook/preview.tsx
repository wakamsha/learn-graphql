// import { useClient } from '@learn-graphql/api/hooks/useClient';
// import { startMsw } from '@learn-graphql/core/utils/Catalog';
// import { type Args, type DecoratorFunction } from '@storybook/csf';
// import { type ReactFramework } from '@storybook/react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// export const decorators: Array<DecoratorFunction<ReactFramework & { canvasElement: unknown }, Args>> = [
//   (Story) => {
//     const { Provider, client } = useClient('http://localhost:4000/graphql');

//     return (
//       <Provider value={client}>
//         <Story />
//       </Provider>
//     );
//   },
// ];

// await startMsw();
