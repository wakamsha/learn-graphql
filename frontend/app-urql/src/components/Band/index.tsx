import { FetchBandDetailDocument } from '@learn-graphql/api/src/gql/graphql';
import { useQuery } from '@learn-graphql/api/src/hooks/urql/useQuery';
import { useState, type CSSProperties, type ChangeEvent } from 'react';
import { MemberItem } from './MemberItem';

export const Band = () => {
  const [bandId, setBandId] = useState('zep');

  const [{ data, fetching, error }] = useQuery({
    query: FetchBandDetailDocument,
    variables: {
      bandId,
    },
  });

  const handleChangeBandId = (event: ChangeEvent<HTMLSelectElement>) => {
    setBandId(event.target.value);
  };

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Oh no... {error.message}</p>;
  }

  return (
    <section>
      <h2>Band Detail</h2>

      <select value={bandId} onChange={handleChangeBandId}>
        <option value="zep">Led Zeppelin</option>
        <option value="sabbath">Black Sabbath</option>
      </select>

      {data ? (
        <>
          <h3>{data.band.name}</h3>
          <p>{data.band.description}</p>
          <h4>Band members</h4>
          <ul style={styleMembers}>
            {data.members.map((member, index) => (
              <li key={index}>
                <MemberItem member={member} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
};

const styleMembers: CSSProperties = {
  paddingLeft: '1em',
};
