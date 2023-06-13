import { GetMemberByIdDocument } from '@learn-graphql/api/src/gql/graphql';
import { mswDecorator, type Meta, type StoryObj } from '@learn-graphql/core/src/utils/Catalog';
import { Member } from '.';

export default {
  component: Member,
} as Meta<typeof Member>;

export const Usage: StoryObj<typeof Member> = {
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
