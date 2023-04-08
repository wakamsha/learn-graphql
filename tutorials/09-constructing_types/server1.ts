import cors from 'cors';
import express from 'express';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';

// Define the User type and the Query type.
const schema = buildSchema(`
  type User {
    id: String
    name: String
  }

  type Query {
    user(id: String): User
  }
`);

type User = {
  id: string;
  name: string;
};

// Maps id to User object
const db = new Map<string, User>([
  ['a', { id: 'a', name: 'alice' }],
  [
    'b',
    {
      id: 'b',
      name: 'bob',
    },
  ],
]);

const rootValue = {
  user: ({ id }: { id: string }) => db.get(id),
};

const app = express();
app.use(cors());
app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue,
  }),
);

app.listen({ port: 4000 });
console.info('Running a GraphQL API server at http://localhost:4000/graphql');
