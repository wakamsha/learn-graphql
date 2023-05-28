import {
  CreateTodoDocument,
  FetchTodoListDocument,
  UpdateTodoDocument,
  type FetchTodoListQuery,
} from '@learn-graphql/api/src/gql/graphql';
import { useMutation } from '@learn-graphql/api/src/hooks/urql/useMutation';
import { useQuery } from '@learn-graphql/api/src/hooks/urql/useQuery';
import { useEffect, useState, type ChangeEvent } from 'react';

export const Todo = () => {
  console.info('render: TODO');

  return (
    <section>
      <h2>Todo</h2>
      <AddForm />
      <List />
    </section>
  );
};

/**
 * 新しい Todo を追加します。
 * テキストボックスに summary を入力して submit することで Todo を新規登録します。
 */
const AddForm = () => {
  const [summary, setSummary] = useState('');

  const [{ data, fetching, error }, execute] = useMutation(CreateTodoDocument);

  console.info('render: AddForm');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSummary(event.target.value);
  };

  const handleSubmit = () => {
    execute({
      summary,
    });
  };

  useEffect(() => {
    if (data === undefined || fetching || error !== undefined) return;

    setSummary('');
  }, [data, error, fetching]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input value={summary} onChange={handleChange} disabled={fetching} placeholder="what needs to be done?" />
        <button onClick={handleSubmit} disabled={fetching}>
          Add
        </button>
      </form>
      {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
    </div>
  );
};

/**
 * 登録済みの Todo をサーバーから取得して一覧表示します。
 *
 * @remarks
 * 新しく Todo が追加されたり既存の Todo が更新されたら、自動的にサーバーから再取得します。
 * これは urql のキャッシュポリシーが `cache-first` となっていることで生じる挙動です。
 * @see {@link https://formidable.com/open-source/urql/docs/basics/document-caching/}
 *
 * @todo
 * Todo 一覧の初期値が空だと自動再取得が走らないため、これを解消すること。
 * @see {@link https://formidable.com/open-source/urql/docs/basics/document-caching/#adding-typenames}
 */
const List = () => {
  const [{ data, fetching, error }] = useQuery({
    query: FetchTodoListDocument,
  });

  console.info('render: List');

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message} 🤔</p>;
  }

  return (
    <ul>
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

type ListItemProps = Pick<FetchTodoListQuery['todoList'][number], 'id' | 'summary' | 'finished'>;

const ListItem = ({ id, summary, finished: finishedRaw }: ListItemProps) => {
  const [{ fetching, error }, execute] = useMutation(UpdateTodoDocument);

  const [finished, setFinished] = useState(finishedRaw);

  const handleToggle = () => {
    setFinished((state) => !state);

    execute({
      id,
      summary,
      finished: !finished,
    });
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={finished} onChange={handleToggle} disabled={fetching} />
        {finished ? <s>{summary}</s> : <span>{summary}</span>}
      </label>
      {error ? <span style={{ color: 'red' }}>{error.message}</span> : null}
    </div>
  );
};
