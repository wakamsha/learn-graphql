import { type Member } from '@learn-graphql/api/gql/graphql';
import cors from 'cors';
import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';

const typeDefs = `
  enum Equip {
    vocal
    guitar
    bass
    drum
  }

  type Member {
    id: String
    name: String
    equip: Equip
  }

  type Query {
    members: [Member!]!
    member(id: String!): Member
  }
`;

const resolvers = {
  Query: {
    members: () => Array.from(db.entries()).map(([, value]) => value),
    member: (_: unknown, { id }: { id: string }) => db.get(id),
  },
};

const db = new Map<string, Member>([
  ['robert', { __typename: 'Member', id: 'robert', name: 'Robert Plant', equip: 'vocal' }],
  ['jimmy', { __typename: 'Member', id: 'jimmy', name: 'Jimmy Page', equip: 'guitar' }],
  ['jones', { __typename: 'Member', id: 'jones', name: 'John Paul Jones', equip: 'bass' }],
  ['bonham', { __typename: 'Member', id: 'bonham', name: 'John Bonham', equip: 'drum' }],
]);

const app = express();

app.use(cors());

app.use(
  '/graphql',
  createYoga({
    schema: createSchema({
      typeDefs,
      resolvers,
    }),
    graphiql: true,
  }),
);

app.listen(4000);
console.info('Running a GraphQL API server at http://localhost:4000/graphql');
