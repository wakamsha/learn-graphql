import { type Decorator, type Meta } from '@storybook/react';
import { graphql, setupWorker, type RequestHandler } from 'msw';
import { useEffect } from 'react';

export { type Meta };

const worker = setupWorker();

/**
 * MSW を起動します。
 */
export async function startMsw() {
  await worker.start({ onUnhandledRequest: 'bypass' });
}

/**
 * MSW を使って API 通信をモックするデコレーターです。
 *
 * MSW によるモッキングと、そのリセット処理を一手に担います。
 * Storybook の decorators に `mswDecorator(モック定義を返す関数)` の戻り値を渡して適用します。
 *
 * @remarks
 * モック定義を返す関数の部分は、[`graphql`](https://mswjs.io/docs/api/graphql) を受け取って `RequestHandler[]` を返します。
 * `RequestHandler` は [`setupWorker`](https://mswjs.io/docs/api/setup-worker) や [`worker.use`](https://mswjs.io/docs/api/setup-worker/use) に渡す値と同じです。
 *
 * @see {@link https://mswjs.io/docs/api/graphql}
 * @see {@link https://mswjs.io/docs/api/setup-worker}
 * @see {@link https://mswjs.io/docs/api/setup-worker/use}
 *
 * @example
 * ```tsx
 * import { type Meta } from '@learn-graphql/core/src/utils/Catalog';
 *
 * const meta: Meta = {
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
export function mswDecorator(mock: (gql: typeof graphql) => RequestHandler[]): Decorator {
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
