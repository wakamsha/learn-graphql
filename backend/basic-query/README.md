# basic-query

クエリを受け取って結果を返すだけのシンプルなバックエンドアプリです。

## Run

```shell
pnpm start
```

ブラウザで [http://localhost:4000/graphql](http://localhost:4000/graphql) にアクセスすると WebUI で GraphQL のクエリを実行できる GraphiQL にアクセスできます。

画面の左側に以下のクエリを入力して実行すると結果が返ってきます。

```graphql
{
  user {
    id
    name
  }
}
```

```json
{
  "data": {
    "users": [
      {
        "id": "robert",
        "name": "Robert Plant"
      },
      {
        "id": "jimmy",
        "name": "Jimmy Page"
      },
      {
        "id": "jones",
        "name": "John Paul Jones"
      },
      {
        "id": "bonham",
        "name": "John Bonham"
      }
    ]
  }
}
```

```graphql
{
  user(id: "jimmy") {
    id
    name
    equip
  }
}
```

```json
{
  "data": {
    "user": {
      "id": "jimmy",
      "name": "Jimmy Page",
      "equip": "guitar"
    }
  }
}
```
