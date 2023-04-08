/* eslint-disable no-underscore-dangle */
import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';

const typeDefs = `
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`;

class RandomDie {
  #_numSides: number;

  constructor(numSides: number) {
    this.#_numSides = numSides;
  }

  get numSides(): number {
    return this.#_numSides;
  }

  rollOnce(): number {
    return 1 + Math.floor(Math.random() * this.#_numSides);
  }

  // 引数はオブジェクトで渡されるので分割代入で受け取っている
  roll({ numRolls }: { numRolls: number }): number[] {
    return [...Array(numRolls)].map(() => this.rollOnce());
  }
}

const rootValue = {
  getDie: (_: unknown, { numSides = 6 }: { numSides: number }) => new RandomDie(numSides),
};

const app = express();

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
