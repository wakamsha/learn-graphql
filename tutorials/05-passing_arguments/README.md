# 05-passing_arguments

[Passing Arguments | GraphQL](https://graphql.org/graphql-js/passing-arguments/)

## Run

```shell
pnpm dev
```

ブラウザで [http://localhost:4000/graphql](http://localhost:4000/graphql) にアクセスすると WebUI で GraphQL のクエリを実行できる GraphiQL にアクセスできる。

画面の左側に以下のクエリを入力して実行すると結果が返ってくる。

```graphql
{
  rollDice(numDice: 4, numSides: 8)
}
```

```console
{
  "data": {
    "rollDice": [
      5,
      3,
      4,
      8
    ]
  }
}
```

JavaScript コード経由で GraphQL を実行する場合は、 `$` 構文を使用してクエリ内で変数を定義し、その変数を `variables` というマップを使って渡す。

```js
const dice = 4;
const sides = 8;

const query = `
  query RollDice($dice: Int!, $sides: Int) {
    rollDice(numDice: $dice, numSides: $sides)
  }
`;

const result = await fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { dice, sides },
  }),
});
```

`$` 構文を使うとクライアント側でエスケープについて考慮する必要がなくなる。
