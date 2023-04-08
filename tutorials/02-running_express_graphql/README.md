# 02-running_express_graphql

[Running an Express GraphQL Server | GraphQL](https://graphql.org/graphql-js/running-an-express-graphql-server/)

Express （+ graphql-yoga） を使って HTTP のエンドポイントに GraphQL サーバーをマウントする。

## Run

```shell
pnpm dev
```

ブラウザで [http://localhost:4000/graphql](http://localhost:4000/graphql) にアクセスすると WebUI で GraphQL のクエリを実行できる GraphiQL にアクセスできる。

画面の左側に以下のクエリを入力して実行すると結果が返ってくる。

```graphql
{
  hello
}
```
