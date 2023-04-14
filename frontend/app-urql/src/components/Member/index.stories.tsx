import { GetMemberByIdDocument } from '@learn-graphql/api/src/gql/graphql';
import { mswDecorator, type Meta } from '@learn-graphql/core/src/utils/Catalog';
import { Member } from '.';

const meta: Meta = {
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
export default meta;

export const Usage = {};
