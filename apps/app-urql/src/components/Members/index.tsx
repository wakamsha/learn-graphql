import { GetMembersDocument } from '@learn-graphql/api/generated/graphql';
import { useQuery } from '@learn-graphql/api/hooks/useQuery';
import { type CSSProperties } from 'react';

export const Members = () => {
  const [{ data, fetching, error }] = useQuery({
    query: GetMembersDocument,
  });

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Oh no... {error.message}</p>;
  }

  return (
    <section>
      <h2>Members</h2>
      <pre style={styleCodeBlock}>
        <code style={styleCode}>{JSON.stringify(data?.members, null, 2)}</code>
      </pre>
    </section>
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
