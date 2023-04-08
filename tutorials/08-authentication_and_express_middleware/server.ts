import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';

const typeDefs = `
  type Query {
    ip: String
  }
`;

const loggingMiddleware = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  console.info('id:', req.ip);
  next();
};

const rootValue = {
  ip: (_parent: unknown, _args: unknown, req: express.Request) => req.ip,
};

const app = express();
app.use(loggingMiddleware);
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
