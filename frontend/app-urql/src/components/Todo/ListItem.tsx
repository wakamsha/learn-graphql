import { css, cx } from '@emotion/css';
import { DeleteTodoDocument, UpdateTodoDocument, type FetchTodoListQuery } from '@learn-graphql/api/src/gql/graphql';
import { useMutation } from '@learn-graphql/api/src/hooks/urql/useMutation';
import { useState } from 'react';

type Props = Pick<FetchTodoListQuery['todoList'][number], 'id' | 'summary' | 'finished'>;

export const ListItem = ({ id, summary, finished: finishedRaw }: Props) => {
  const [updateState, updateExec] = useMutation(UpdateTodoDocument);

  const [, deleteExec] = useMutation(DeleteTodoDocument);

  // チェックボックスのチェックフラグ
  // API レスポンス値を初期値とする。
  const [finished, setFinished] = useState(finishedRaw);

  // ListItem の可視・不可視フラグ。
  // CSS の opacity 値を制御する。
  const [hidden, setHidden] = useState(false);

  // ListItem の表示・非表示フラグ。
  // CSS の display 値を制御する。
  const [removing, setRemoving] = useState(false);

  /**
   * チェックボックスがクリックされたら発火するイベントハンドラー。
   *
   * チェックフラグを更新したのちに更新 API を実行することで、データも更新する。
   *
   * @remarks
   * 視覚上のチェック ON/OFF をサーバーからの refetch だけでなく React State を使ってフロントエンド独自でも行っているのは、
   * ユーザーがチェックボックスを操作した直後に UI に速やかに反映するためである。
   * 単に ON/OFF の状態を管理するだけならサーバーからのレスポンスだけでも十分だが、更新 API 実行から refetch が完了するまでの時間だけ遅延することとなり、
   * その間はチェックボックスが古い状態で固まってしまう。
   * これを回避すべく、視覚上における ON/OFF とデータにおける ON/OFF を別々に処理している。
   */
  const handleToggleFinished = () => {
    setFinished((state) => !state);
    updateExec({
      id,
      summary,
      finished: !finished,
    });
  };

  /**
   * ListItem を不可視状態にする。
   *
   * ListItem の `opacity` を 0 にすることで、アニメーションを伴いながら不可視状態にする。
   */
  const handleDelete = () => {
    setHidden(true);
  };

  /**
   * ListItem が不可視状態になったら発火するイベントハンドラー。
   *
   * ListItem の `display` を `none` にすることで要素ごと消し去る。
   * その後に削除 API を実行することでデータから消去する。
   *
   * @remarks
   * ListItem の削除をサーバーからの refetch だけでなく CSS を使ってフロントエンド独自でも行っているのは、
   * ユーザーが削除ボタンをクリックした直後に UI 上から速やかに消去するためである。
   * 単に UI 上から消去するだけなら refetch だけでも十分可能だが、削除 API 実行から refetch が完了するまでの時間だけ遅延することととなり、
   * その間は UI 上に残り続けてしまう。
   * これを回避すべく、視覚上における削除とデータにおける削除を別々に処理している。
   */
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

      <button className={styleDeleteButton} onClick={handleDelete} title="削除">
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
