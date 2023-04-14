import { GetMembersDocument } from '@learn-graphql/api/src/gql/graphql';
import { mswDecorator, type Meta } from '@learn-graphql/core/src/utils/Catalog';
import { Members } from '.';

const meta: Meta = {
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
export default meta;

export const Usage = {};
