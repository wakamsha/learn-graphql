import { css } from '@emotion/css';
import { FetchTodoListDocument } from '@learn-graphql/api/src/gql/graphql';
import { useQuery } from '@learn-graphql/api/src/hooks/urql/useQuery';
import { useMemo } from 'react';
import { ListItem } from './ListItem';

/**
 * 登録済みの Todo をサーバーから取得して一覧表示します。
 *
 * @remarks
 * 新しく Todo が追加されたり既存の Todo が更新されたら、自動的にサーバーから再取得します。
 * これは urql のキャッシュポリシーが `cache-first` となっていることで生じる挙動です。
 * @see {@link https://formidable.com/open-source/urql/docs/basics/document-caching/}
 */
export const List = () => {
  /**
   * Todo 一覧の初期値が空でもキャッシュの自動更新を期待通り動作させるため、 `__typename` を強制的に追加します。
   *
   * @see {@link https://formidable.com/open-source/urql/docs/basics/document-caching/#document-cache-gotchas}
   */
  const context = useMemo(
    () => ({
      additionalTypenames: ['Todo'],
    }),
    [],
  );

  const [{ data, fetching, error }] = useQuery({
    query: FetchTodoListDocument,
    context,
  });

  console.info('render: List');

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message} 🤔</p>;
  }

  return (
    <ul className={styleRoot}>
      {data
        ? data.todoList.map((item) => (
            <li key={item.id}>
              <ListItem id={item.id} summary={item.summary} finished={item.finished} />
            </li>
          ))
        : null}
    </ul>
  );
};

const styleRoot = css`
  padding: 0;
  list-style: none;

  > li + li {
    border-top: 1px solid silver;
  }
`;
