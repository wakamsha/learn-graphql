import { GetMemberByIdDocument } from '@learn-graphql/api/gql/graphql';
import { mswDecorator } from '@learn-graphql/core/utils/Catalog';
import { Member } from '.';

export default {
  component: Member,
  decorators: [
    mswDecorator((gql) => [
      gql.query(GetMemberByIdDocument, (req, res, ctx) =>
        res(
          ctx.data({
            __typename: 'Query',
            member: {
              __typename: 'Member',
              ...(req.variables.id === 'ian'
                ? {
                    id: 'ian',
                    name: 'Ian Brown',
                    equip: 'vocal',
                  }
                : {
                    id: 'john',
                    name: 'John Squire',
                    equip: 'guitar',
                  }),
            },
          }),
        ),
      ),
    ]),
  ],
};

export const Usage = {};
