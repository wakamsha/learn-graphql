import { makeFragmentData } from '@learn-graphql/api/src/gql/fragment-masking';
import { BandMemberFragmentDoc, FetchBandDetailDocument } from '@learn-graphql/api/src/gql/graphql';
import { mswDecorator, type Meta, type StoryObj } from '@learn-graphql/core/src/utils/Catalog';
import { Band } from '.';

export default {
  component: Band,
} as Meta<typeof Band>;

export const Usage: StoryObj<typeof Band> = {
  decorators: [
    mswDecorator((gql) => [
      gql.query(FetchBandDetailDocument, (_, res, ctx) =>
        res(
          ctx.data({
            __typename: 'Query',
            band: {
              __typename: 'Band',
              name: 'The Stone Roses',
              description:
                'ザ・ストーン・ローゼズ（The Stone Roses）は、イギリスのロックバンド。1983年にマンチェスターにて結成され、ニュー・オーダーやハッピー・マンデーズ、ザ・シャーラタンズといったバンドとともに、マッドチェスター・ムーヴメントの中心的存在として活躍。',
            },
            members: [
              {
                __typename: 'Member',
                ...makeFragmentData(
                  {
                    __typename: 'Member',
                    name: 'Ian Brown',
                    instrument: 'vocal',
                  },
                  BandMemberFragmentDoc,
                ),
              },
              {
                __typename: 'Member',
                ...makeFragmentData(
                  {
                    __typename: 'Member',
                    name: 'John Squire',
                    instrument: 'guitar',
                  },
                  BandMemberFragmentDoc,
                ),
              },
              {
                __typename: 'Member',
                ...makeFragmentData(
                  {
                    __typename: 'Member',
                    name: 'Gary Mounfield',
                    instrument: 'bass',
                  },
                  BandMemberFragmentDoc,
                ),
              },
              {
                __typename: 'Member',
                ...makeFragmentData(
                  {
                    __typename: 'Member',
                    name: 'Alan Wren',
                    instrument: 'drum',
                  },
                  BandMemberFragmentDoc,
                ),
              },
            ],
          }),
        ),
      ),
    ]),
  ],
};
