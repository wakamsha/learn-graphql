# 06-object_types

[Object Types | GraphQL](https://graphql.org/graphql-js/object-types/)

GraphQL のスキーマでは独自の振る舞いを持ったオブジェクトを定義できる。

例えば `04` で実装した `rollDice` のような「ランダムなダイス」に関連するメソッドを追加したくなった時は、個別に実装していくのでなく `RandomDie` というオブジェクト（入れ物）を用意し、これに生やしていくのが望ましい。

```graphql
type RandomDie {
  roll(numRolls: Int!): [Int]
}

type Query {
  getDie(numSides: Int): RandomDie
}
```

## Run

```shell
pnpm dev
```

ブラウザで [http://localhost:4000/graphql](http://localhost:4000/graphql) にアクセスすると WebUI で GraphQL のクエリを実行できる GraphiQL にアクセスできる。

画面の左側に以下のクエリを入力して実行すると結果が返ってくる。

```graphql
{
  getDie(numSides: 8) {
    rollOnce
    roll(numRolls: 3)
  }
}
```

```json
{
  "data": {
    "getDie": {
      "rollOnce": 2,
      "roll": [5, 2, 3]
    }
  }
}
```
