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
          rollDice(numDice: Int!, numSides: Int): [Int]
        }       
      `,
      resolvers: {
        Query: {
          rollDice: (_, { numDice, numSides }: { numDice: number; numSides: number }) =>
            [...Array(numDice)].map(() => 1 + Math.floor(Math.random() * (numSides || 6))),
        },
      },
    }),
    graphiql: true,
  }),
);

app.listen(4000);
console.info('Running a GraphQL API server at http://localhost:4000/graphql');
