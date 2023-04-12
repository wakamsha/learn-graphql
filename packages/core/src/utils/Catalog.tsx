import { type Args, type DecoratorFunction } from '@storybook/csf';
import { type ReactFramework } from '@storybook/react';
import { graphql, setupWorker, type RequestHandler } from 'msw';
import { useEffect } from 'react';

const worker = setupWorker();

export async function startMsw() {
  await worker.start({ onUnhandledRequest: 'bypass' });
}

type MswGraphql = typeof graphql;

export function mswDecorator(
  mock: (gql: MswGraphql) => RequestHandler[],
): DecoratorFunction<ReactFramework & { canvasElement: unknown }, Args> {
  const Wrapper = ({ children }: { children: JSX.Element }) => {
    useEffect(() => {
      worker.use(...mock(graphql));

      return () => {
        worker.resetHandlers();
      };
    }, []);

    return children;
  };

  return (Story) => (
    <Wrapper>
      <Story />
    </Wrapper>
  );
}
