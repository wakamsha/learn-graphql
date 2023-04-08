import cors from 'cors';
import express from 'express';
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';

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

// Define the User type
const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
  },
});

// Define the Query type
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: (_: unknown, { id }: { id: string }) => db.get(id),
    },
  },
});

const schema = new GraphQLSchema({ query: queryType });

const app = express();
app.use(cors());
app.all(
  '/graphql',
  createHandler({
    schema,
  }),
);

app.listen({ port: 4000 });
console.info('Running a GraphQL API server at localhost:4000/graphql');
