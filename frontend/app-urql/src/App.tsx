import { useClient } from '@learn-graphql/api/src/hooks/urql/useClient';
import { type CSSProperties } from 'react';
import { Band } from './components/Band';
import { Member } from './components/Member';

export const App = () => {
  const { Provider, client } = useClient('http://localhost:4000/graphql');

  return (
    <Provider value={client}>
      <main style={styleMain}>
        <h1>
          Fetch App <small style={styleTitleSub}>Powered by urql</small>
        </h1>
        <div style={styleContents}>
          <Band />
          <Member />
        </div>
      </main>
    </Provider>
  );
};

const styleMain: CSSProperties = {
  margin: 'auto',
  maxWidth: 1080,
};

const styleContents: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 32,
};

const styleTitleSub: CSSProperties = {
  fontSize: '0.48em',
  color: 'gray',
};
