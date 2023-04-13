import { GetMembersDocument } from '@learn-graphql/api/gql/graphql';
import { mswDecorator } from '@learn-graphql/core/utils/Catalog';
import { Members } from '.';

export default {
  component: Members,
  decorators: [
    mswDecorator((gql) => [
      gql.query(GetMembersDocument, (_, res, ctx) =>
        res(
          ctx.data({
            __typename: 'Query',
            members: [
              {
                __typename: 'Member',
                id: 'ian',
                name: 'Ian Brown',
              },
              {
                __typename: 'Member',
                id: 'john',
                name: 'John Squire',
              },
              {
                __typename: 'Member',
                id: 'mani',
                name: 'Gary Mounfield',
              },
              {
                __typename: 'Member',
                id: 'reni',
                name: 'Alan Wren',
              },
            ],
          }),
        ),
      ),
    ]),
  ],
};

export const Usage = {};
