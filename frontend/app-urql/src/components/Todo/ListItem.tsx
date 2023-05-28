import { css } from '@emotion/css';
import { DeleteTodoDocument, UpdateTodoDocument, type FetchTodoListQuery } from '@learn-graphql/api/src/gql/graphql';
import { useMutation } from '@learn-graphql/api/src/hooks/urql/useMutation';
import { useState } from 'react';

type Props = Pick<FetchTodoListQuery['todoList'][number], 'id' | 'summary' | 'finished'>;

export const ListItem = ({ id, summary, finished: finishedRaw }: Props) => {
  const [updateState, updateExec] = useMutation(UpdateTodoDocument);

  const [, deleteExec] = useMutation(DeleteTodoDocument);

  const [finished, setFinished] = useState(finishedRaw);

  const handleToggle = () => {
    setFinished((state) => !state);

    updateExec({
      id,
      summary,
      finished: !finished,
    });
  };

  const handleDelete = () => {
    deleteExec({
      id,
    });
  };

  return (
    <div className={styleRoot}>
      <label className={styleLabel}>
        <input type="checkbox" checked={finished} onChange={handleToggle} disabled={updateState.fetching} />
        {finished ? <s>{summary}</s> : <span>{summary}</span>}
      </label>

      <button className={styleDeleteButton} onClick={handleDelete}>
        🗑️
      </button>

      {updateState.error ? <span className={styleErrorMessage}>{updateState.error.message}</span> : null}
    </div>
  );
};

const styleRoot = css`
  display: grid;
  grid-template-areas:
    'label   delete-button'
    'message message';
  grid-template-columns: 1fr auto;
`;

const styleLabel = css`
  grid-area: label;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const styleDeleteButton = css`
  grid-area: delete-button;
`;

const styleErrorMessage = css`
  color: red;
  grid-area: message;
`;
