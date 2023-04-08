import cors from 'cors';
import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';

type User = {
  id: string;
  name: string;
  equip: 'vocal' | 'guitar' | 'bass' | 'drum';
};

const typeDefs = `
  enum Equip {
    vocal
    guitar
    bass
    drum
  }

  type User {
    id: String
    name: String
    equip: Equip
  }

  type Query {
    users: [User]
    user(id: String): User
  }
`;

const rootValue = {
  users: () => Array.from(db.entries()).map(([, value]) => value),
  user: (_: unknown, { id }: { id: string }) => db.get(id),
};

const db = new Map<string, User>([
  ['robert', { id: 'robert', name: 'Robert Plant', equip: 'vocal' }],
  ['jimmy', { id: 'jimmy', name: 'Jimmy Page', equip: 'guitar' }],
  ['jones', { id: 'jones', name: 'John Paul Jones', equip: 'bass' }],
  ['bonham', { id: 'bonham', name: 'John Bonham', equip: 'drum' }],
]);

const app = express();

app.use(cors());

app.use(
  '/graphql',
  createYoga({
    schema: createSchema({
      typeDefs,
      resolvers: {
        Query: rootValue,
      },
    }),
    graphiql: true,
  }),
);

app.listen(4000);
console.info('Running a GraphQL API server at http://localhost:4000/graphql');
