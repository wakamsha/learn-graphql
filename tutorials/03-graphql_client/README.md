# 03-graphql_client

[GraphQL Clients | GraphQL](https://graphql.org/graphql-js/graphql-clients/)

GraphQL クライアントライブラリも存在しますが、単純な HTTP の POST リクエストによって簡単にクエリを発行することができます。
REST API では用途によって GET/DELETE/POST/PUT などを使い分けますが、GraphQL では全て POST を使ってクエリを発行します。

## server1

Express GraphQL Server で作成した GraphQL サーバーに対し以下のような curl コマンドを実行すると JSON 形式でデータが返却されます。

```shell
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ hello }"}' \
http://localhost:4000/graphql
```

```json
{ "data": { "hello": "hello world!" } }
```

## server2

Express を起動して [http://localhost:4000](http://localhost:4000) にアクセスすると `public/` ディレクトリ配下の静的ページが表示されます。このページから HTTP の POST リクエストによってクエリを発行し、JSON 形式でデータを取得します。

```json
{ "data": { "rollDice": [3, 1, 1] } }
```
