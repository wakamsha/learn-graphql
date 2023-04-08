# Workspace: Tutorial

このワークスペースにあるパッケージは、[GraphQL 公式サイトで紹介されている GraphQL.js 用チュートリアル](https://graphql.org/) を項目ごとに写経したものです。チュートリアルにあるサンプルコードは VanillaJS で書かれていますが、このワークスペースでは TypeScript に置き換えています。

[Getting Started With GraphQL.js | GraphQL](https://graphql.org/graphql-js/)

## 特記事項

チュートリアルでは [GraphQL Clients](https://graphql.org/graphql-js/graphql-clients/) から [express-graphql](https://www.npmjs.com/package/express-graphql) を使用したサンプルコードが紹介されていますが、この node モジュールは既に開発が終了しており使用が非推奨となっています。そのため本ワークスペースでは代替モジュールとして [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) を使い実装しています。

express-graphql の README には [graphql-http](https://www.npmjs.com/package/graphql-http) も移行先として紹介されていますが、こちらは見送りました。GraphQL 純正モジュールではあるものの、 [graphiql](https://www.npmjs.com/package/graphiql) をバンドルしていないため、チュートリアルにあるコードを写経して学ぶ際のツールとして適切ではないと判断したためです。
