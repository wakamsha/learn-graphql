import { GetMemberByIdDocument } from '@learn-graphql/api/gql/graphql';
import { useQuery } from '@learn-graphql/api/hooks/useQuery';
import { useState, type CSSProperties, type ChangeEvent } from 'react';

export const Member = () => {
  const [id, setId] = useState('');

  return (
    <section>
      <h2>Member</h2>
      <Form onSubmit={setId} />
      <Result id={id} />
    </section>
  );
};

const Form = ({ onSubmit }: { onSubmit: (id: string) => void }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>
        <div>Member ID</div>
        <input value={value} onChange={handleChange} />
      </label>
      <button onClick={handleSubmit}>Fetch</button>
    </form>
  );
};

const Result = ({ id }: { id: string }) => {
  const [{ data, fetching, error }] = useQuery({
    query: GetMemberByIdDocument,
    variables: {
      id,
    },
  });

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Oh no... {error.message}</p>;
  }

  return (
    <pre style={styleCodeBlock}>
      <code style={styleCode}>{JSON.stringify(data?.member, null, 2)}</code>
    </pre>
  );
};

const styleCodeBlock: CSSProperties = {
  display: 'block',
  padding: 16,
  backgroundColor: '#F9F9F9',
};

const styleCode: CSSProperties = {
  fontFamily: 'SFMono-Regular,Consolas,Liberation Mono,Menlo',
  fontSize: 14,
  lineHeight: 1.6,
};
