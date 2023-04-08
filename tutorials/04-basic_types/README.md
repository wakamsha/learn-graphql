# 04-basic_types

[Basic Types | GraphQL](https://graphql.org/graphql-js/basic-types/)

GraphQL スキーマ言語がデフォルトでサポートする型と JavaScript の型の対比は以下の通り。

| GraphQL   | 概要             | JavaScript | 備考                                         |
| --------- | ---------------- | ---------- | -------------------------------------------- |
| `String`  | 文字列型         | `string`   |                                              |
| `Int`     | 整数型           | `number`   |                                              |
| `Float`   | 浮動小数点数型   | `number`   |                                              |
| `Boolean` | 真偽型           | `boolean`  |                                              |
| `ID`      | ユニークな識別子 | `string`   | GraphQL はこの id 値を元にキャッシュ等を行う |

基本的に全て Nullable。 `null` を許容しない場合は型名の末尾に `!` を付ける。

```graphql
type Query {
  hello: String!
}
```

リスト型（≒ Array）は型名を `[]` で囲む。

```graphql
type Query {
  messages: [String]
}
```
