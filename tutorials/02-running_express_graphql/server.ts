import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';

const app = express();
app.all(
  '/graphql', // `/graphql` に GraphQL サーバーをマッピングする
  createYoga({
    schema: createSchema({
      typeDefs: `
        type Query {
          hello: String
        }
      `,
      resolvers: {
        Query: {
          hello: () => `hello world!`,
        },
      },
    }),
    graphiql: true,
  }),
);

app.listen(4000);
console.info('Running a GraphQL API server at http://localhost:4000/graphql');
