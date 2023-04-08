import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';

const typeDefs = `
  type Mutation {
    setMessage(message: String!): String!
  }

  type Query {
    getMessage: String!
  }
`;

const db = new Map<string, string>();

const app = express();

app.use(
  '/graphql',
  createYoga({
    schema: createSchema({
      typeDefs,
      resolvers: {
        Query: {
          getMessage: () => db.get('message') || '🤔',
        },
        Mutation: {
          setMessage: (_parent, { message }: { message: string }) => {
            db.set('message', message);
            return db.get('message');
          },
        },
      },
    }),
    graphiql: true,
  }),
);

app.listen(4000);
console.info('Running a GraphQL API server at http://localhost:4000/graphql');
