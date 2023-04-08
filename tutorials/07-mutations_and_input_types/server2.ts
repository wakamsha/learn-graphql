import cors from 'cors';
import crypto from 'crypto';
import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';

const typeDefs = `
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput!): Message
    updateMessage(id: ID!, input: MessageInput!): Message
  }
`;

type MessageInput = {
  content: string;
  author: string;
};

class Message {
  public content: string;
  public author: string;

  constructor(public readonly id: string, { content, author }: MessageInput) {
    this.content = content;
    this.author = author;
  }
}

const db = new Map<string, Message>();

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(
  '/graphql',
  createYoga({
    schema: createSchema({
      typeDefs,
      resolvers: {
        Query: {
          getMessage: (_, { id }: { id: string }) => {
            if (!db.has(id)) {
              throw new Error(`no message exists with id ${id}`);
            }
            return db.get(id);
          },
        },

        Mutation: {
          createMessage: (_parent, { input }: { input: MessageInput }) => {
            const id = crypto.randomUUID();
            const message = new Message(id, input);
            db.set(id, message);
            return db.get(id);
          },

          updateMessage: (_parent, { id, input }: { id: string; input: MessageInput }) => {
            if (!db.has(id)) {
              throw new Error(`no message exists with id ${id}`);
            }
            db.set(id, new Message(id, input));
            return db.get(id);
          },
        },
      },
    }),
    graphiql: true,
  }),
);

app.listen(4000);
console.info('Running a GraphQL API server at http://localhost:4000/graphql');
console.info('Running a Static Site at http://localhost:4000');
