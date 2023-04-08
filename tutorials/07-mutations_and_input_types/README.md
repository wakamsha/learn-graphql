# 07-mutations_and_input_types

[Mutations and Input Types | GraphQL](https://graphql.org/graphql-js/mutations-and-input-types/)

データの挿入やデータの変更などを行う API では Query ではなく Mutation として定義する必要がある。

```graphql
type Mutation {
  # 変更結果を戻り値にすると便利。
  setMessage(message: String): String
}

type Query {
  getMessage: String
}
```

## Run

```shell
pnpm dev
```

ブラウザで [http://localhost:4000/graphql](http://localhost:4000/graphql) にアクセスすると WebUI で GraphQL のクエリを実行できる GraphiQL にアクセスできる。

画面の左側に以下のクエリを入力して実行すると、その結果が返ってくる。

```graphql
mutation {
  # ダブルクォートを使うこと
  setMessage(message: "hello world")
}
```

```json
{
  "data": {
    "setMessage": "hello world"
  }
}
```

```graphql
{
  getMessage
}
```

```json
{
  "data": {
    "getMessage": "hello world"
  }
}
```

## Input キーワード

"create" と "update" とで入力パラメータが同じというケースが考えられる。この場合、 `type` の代わりに `input` を使うことで「入力型」として共通化できる。

```graphql
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
```

入力タイプはフィールドとして、基本型、リスト型、入力型を持てるが、オブジェクト型は持てない。

画面の左側に以下のクエリを入力して実行すると値が保存され、更に結果が帰ってくる。

```graphql
mutation {
  # 戻り値にオブジェクト型をそのまま指定することはできない。
  # オブジェクト型内の基本型 or リスト型を列挙すること。
  createMessage(input: { author: "wakamsha", content: "hello world!" }) {
    id
    author
    content
  }
}
```

```json
{
  "data": {
    "createMessage": {
      "id": "7c2267db-5612-4e18-90cf-5c18c3c3fe5c",
      "author": "wakamsha",
      "content": "hello world!"
    }
  }
}
```

```graphql
mutation {
  updateMessage(id: "7c2267db-5612-4e18-90cf-5c18c3c3fe5c", input: { author: "john", content: "goodbye world!" }) {
    author
    content
  }
}
```

```json
{
  "data": {
    "createMessage": {
      "author": "john",
      "content": "goodbye world!"
    }
  }
}
```

## 追加実装

`pnpm dev2` で起動する GraphQL エンドポイントは CORS を有効化しているため、他ドメインからのデータの挿入やデータの変更を許可します。そのため、 `apps` ワークスペース配下のパッケージのような他のドメインで稼働する SPA にて GraphQL クライアントをデバッグするのに活用できます。
