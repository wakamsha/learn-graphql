import { css, cx } from '@emotion/css';
import { DeleteTodoDocument, UpdateTodoDocument, type FetchTodoListQuery } from '@learn-graphql/api/src/gql/graphql';
import { useMutation } from '@learn-graphql/api/src/hooks/urql/useMutation';
import { useState } from 'react';

type Props = Pick<FetchTodoListQuery['todoList'][number], 'id' | 'summary' | 'finished'>;

export const ListItem = ({ id, summary, finished: finishedRaw }: Props) => {
  const [updateState, updateExec] = useMutation(UpdateTodoDocument);

  const [, deleteExec] = useMutation(DeleteTodoDocument);

  const [finished, setFinished] = useState(finishedRaw);

  const [hidden, setHidden] = useState(false);

  const [removing, setRemoving] = useState(false);

  const handleToggleFinished = () => {
    setFinished((state) => !state);

    updateExec({
      id,
      summary,
      finished: !finished,
    });
  };

  const handleDelete = () => {
    setHidden(true);
  };

  const handleTransitionEnd = () => {
    setRemoving(true);

    deleteExec({
      id,
    });
  };

  return (
    <div
      className={cx(styleRoot, removing && styleRootRemoving)}
      aria-hidden={hidden}
      onTransitionEnd={handleTransitionEnd}
    >
      <label className={styleLabel}>
        <input type="checkbox" checked={finished} onChange={handleToggleFinished} disabled={updateState.fetching} />
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
  padding: 8px;
  opacity: 1;
  transition: opacity 0.15s;

  &[aria-hidden='true'] {
    opacity: 0;
  }
`;

const styleRootRemoving = css`
  display: none;
`;

const styleLabel = css`
  display: flex;
  grid-area: label;
  gap: 4px;
  align-items: center;
`;

const styleDeleteButton = css`
  grid-area: delete-button;
  cursor: pointer;
`;

const styleErrorMessage = css`
  grid-area: message;
  color: red;
`;
