import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';

const app = express();

app.use(
  '/graphql', // `/graphql` に GraphQL サーバーをマッピングする
  createYoga({
    schema: createSchema({
      typeDefs: `
        type Query {
          hello(name: String): String
        }
      `,
      resolvers: {
        Query: {
          hello: (_, { name }: { name: string }) => `hello ${name}!`,
        },
      },
    }),
    graphiql: true,
  }),
);

app.listen(4000);
console.info('Running a GraphQL API server at http://localhost:4000/graphql');
