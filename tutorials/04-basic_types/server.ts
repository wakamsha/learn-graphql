import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';

const app = express();
app.use(express.static('public'));

app.use(
  '/graphql',
  createYoga({
    schema: createSchema({
      typeDefs: `
        type Query {
          quoteOfTheDay: String
          random: Float!
          rollThreeDice: [Int]
        }
      `,
      resolvers: {
        Query: {
          quoteOfTheDay: () => (Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'),
          random: () => Math.random(),
          rollThreeDice: () => [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6)),
        },
      },
    }),
    graphiql: true,
  }),
);

app.listen(4000);
console.info('Running a GraphQL API server at http://localhost:4000/graphql');
