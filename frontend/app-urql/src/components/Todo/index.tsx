import { AddForm } from './AddForm';
import { List } from './List';

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
