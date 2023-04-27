import { useFragment, type FragmentType } from '@learn-graphql/api/src/gql/fragment-masking';
import { BandMemberFragmentDoc } from '@learn-graphql/api/src/gql/graphql';
import { type CSSProperties } from 'react';

type Props = {
  member: FragmentType<typeof BandMemberFragmentDoc>;
};

export const MemberItem = ({ member }: Props) => {
  const { name, instrument } = useFragment(BandMemberFragmentDoc, member);

  return (
    <div style={styleBase}>
      <div style={styleName}>{name}</div>
      <div style={styleInst}>{instrument}</div>
    </div>
  );
};

const styleBase: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: 8,
};

const styleName: CSSProperties = {
  fontWeight: 'bold',
};

const styleInst: CSSProperties = {
  fontSize: 14,
  color: 'gray',
};
