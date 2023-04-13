import { type Args, type DecoratorFunction } from '@storybook/csf';
import { type ReactFramework } from '@storybook/react';
import { graphql, setupWorker, type RequestHandler } from 'msw';
import { useEffect } from 'react';

const worker = setupWorker();

export async function startMsw() {
  await worker.start({ onUnhandledRequest: 'bypass' });
}

/**
 * MSW を使って API 通信をモックするデコレーター。
 *
 * MSW によるモッキングと、そのリセット処理を一手に担う。
 * Storybook の decorators に `mswDecorator(モック定義を返す関数)` の戻り値を渡して適用する。
 *
 * @remarks
 * モック定義を返す関数の部分は、[`graphql`](https://mswjs.io/docs/api/graphql) を受け取って `RequestHandler[]` を返す関数。
 * `RequestHandler` は [`setupWorker`](https://mswjs.io/docs/api/setup-worker) や [`worker.use`](https://mswjs.io/docs/api/setup-worker/use) に渡す値と同じもの。
 *
 * @see {@link https://mswjs.io/docs/api/graphql}
 * @see {@link https://mswjs.io/docs/api/setup-worker}
 * @see {@link https://mswjs.io/docs/api/setup-worker/use}
 *
 * @example
 * ```tsx
 * const meta = {
 *   component: SomeComponent,
 *   decorators: [
 *     mswDecorator((gql) => [
 *       gql.query(...)
 *     ])
 *   ],
 * };
 *
 * export default meta;
 * ```
 */
export function mswDecorator(
  mock: (gql: typeof graphql) => RequestHandler[],
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
