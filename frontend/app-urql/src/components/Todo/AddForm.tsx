import { CreateTodoDocument } from '@learn-graphql/api/src/gql/graphql';
import { useMutation } from '@learn-graphql/api/src/hooks/urql/useMutation';
import { useEffect, useState, type ChangeEvent } from 'react';

/**
 * 新しい Todo を追加します。
 * テキストボックスに summary を入力して submit することで Todo を新規登録します。
 */
export const AddForm = () => {
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
        <button onClick={handleSubmit} disabled={fetching || summary.length === 0}>
          Add
        </button>
      </form>
      {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
    </div>
  );
};
