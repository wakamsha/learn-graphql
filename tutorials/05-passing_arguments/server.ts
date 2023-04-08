import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';

const typeDefs = `
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`;

const rootValue = {
  rollDice: (_: unknown, { numDice, numSides = 6 }: { numDice: number; numSides?: number }) =>
    [...Array(numDice).keys()].map(() => 1 + Math.floor(Math.random() * numSides)),
};

const app = express();

app.use(express.static('public'));

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
console.info('Running a Static Site at http://localhost:4000');
