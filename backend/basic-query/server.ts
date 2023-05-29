import {
  type Band,
  type Member,
  type Todo,
  type TodoCreateInput,
  type TodoDeleteInput,
  type TodoUpdateInput,
} from '@learn-graphql/api/src/gql/graphql';
import cors from 'cors';
import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';

const typeDefs = `
  enum Instrument {
    vocal
    guitar
    bass
    drum
  }

  type Band {
    id: ID!
    name: String!
    description: String
  }

  type Member {
    bandId: ID!
    id: ID!
    name: String!
    instrument: Instrument
  }

  type Todo {
    id: ID!
    summary: String!
    finished: Boolean!
  }

  type Query {
    band(id: ID!): Band!
    members(bandId: ID!): [Member!]!
    member(id: ID!): Member!
    todoList: [Todo!]!
  }

  input TodoCreateInput {
    summary: String!
  }

  input TodoUpdateInput {
    id: ID!
    summary: String!
    finished: Boolean!
  }

  input TodoDeleteInput {
    id: ID!
  }

  type Mutation {
    createTodo(input: TodoCreateInput!): Todo!
    updateTodo(todo: TodoUpdateInput!): Todo!
    deleteTodo(input: TodoDeleteInput!): Todo!
  }
`;

const resolvers = {
  Query: {
    band: (_: unknown, { id }: { id: string }) => bandDb.get(id),
    members: (_: unknown, { bandId }: { bandId: string }) =>
      Array.from(memberDb.entries())
        .filter(([, value]) => value.bandId === bandId)
        .map(([, value]) => value),
    member: (_: unknown, { id }: { id: string }) => memberDb.get(id),
    todoList: () => Array.from(todoDb.values()),
  },
  Mutation: {
    createTodo: (_: unknown, { input: { summary } }: { input: TodoCreateInput }): Todo => {
      console.info({ summary });
      const id = `${Math.random()}`;
      const todo: Todo = {
        id,
        summary,
        finished: false,
        __typename: 'Todo',
      };
      todoDb.set(id, todo);

      return todo;
    },
    updateTodo: (_: unknown, { todo }: { todo: TodoUpdateInput }): Todo => {
      todoDb.set(todo.id, { ...todo, id: `${todo.id}`, __typename: 'Todo' });

      return todoDb.get(todo.id) as Todo;
    },
    deleteTodo: (_: unknown, { input }: { input: TodoDeleteInput }): Todo => {
      const todo = todoDb.get(input.id);
      todoDb.delete(input.id);

      return todo as Todo;
    },
  },
};

const bandDb = new Map<string, Band>([
  [
    'zep',
    {
      __typename: 'Band',
      id: 'zep',
      name: 'Led Zeppelin',
      description:
        'レッド・ツェッペリン（Led Zeppelin）は、1968年にロンドンで結成されたイギリスのロックバンド。ブルースやフォークミュージックなど、さまざまな影響を受けたスタイルでありながら、重厚なギターサウンドで、ハードロックやヘヴィメタルの先駆者の一つとして挙げられている。',
    },
  ],
  [
    'sabbath',
    {
      __typename: 'Band',
      id: 'sabbath',
      name: 'Black Sabbath',
      description:
        'ブラック・サバス（Black Sabbath）は、イングランド出身のロックバンド。1960年代から活動していた有名グループの一つで、ヘヴィメタルやドゥームの開祖とも言われた。',
    },
  ],
]);

const memberDb = new Map<string, Member>([
  ['robert', { __typename: 'Member', bandId: 'zep', id: 'robert', name: 'Robert Plant', instrument: 'vocal' }],
  ['jimmy', { __typename: 'Member', bandId: 'zep', id: 'jimmy', name: 'Jimmy Page', instrument: 'guitar' }],
  ['jones', { __typename: 'Member', bandId: 'zep', id: 'jones', name: 'John Paul Jones', instrument: 'bass' }],
  ['bonham', { __typename: 'Member', bandId: 'zep', id: 'bonham', name: 'John Bonham', instrument: 'drum' }],
  ['ozzy', { __typename: 'Member', bandId: 'sabbath', id: 'ozzy', name: 'Ozzy Osbourne', instrument: 'vocal' }],
  ['iommi', { __typename: 'Member', bandId: 'sabbath', id: 'iommi', name: 'Tony Iommi', instrument: 'guitar' }],
  ['geezer', { __typename: 'Member', bandId: 'sabbath', id: 'geezer', name: 'Geezer Butler', instrument: 'bass' }],
  ['bill', { __typename: 'Member', bandId: 'sabbath', id: 'bill', name: 'Bill Ward', instrument: 'drum' }],
]);

const todoDb = new Map<string | number, Todo>([
  ['a', { __typename: 'Todo', id: 'a', summary: 'my first todo', finished: false }],
]);

const app = express();

app.use(cors());

app.use(
  '/graphql',
  createYoga({
    schema: createSchema({
      typeDefs,
      resolvers,
    }),
    graphiql: true,
  }),
);

app.listen(4000);
console.info('Running a GraphQL API server at http://localhost:4000/graphql');
