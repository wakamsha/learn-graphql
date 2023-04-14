# Workspace: Frontend

このワークスペースには以下のものが含まれます。

|         name | summary                                                                                                                                      |
| -----------: | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `app-apollo` | React + Vite + TypeScript による SPA です。GraphQL Client に [`Apollo Client`](https://www.apollographql.com/docs/react/) を使用しています。 |
|   `app-urql` | React + Vite + TypeScript による SPA です。GraphQL Client に [`urql`](https://formidable.com/open-source/urql/) を使用しています。           |
|    `catalog` | [Storybook](https://storybook.js.org) による UI カタログです。当該プロジェクト配下の全サブパッケージにある stories を列挙します。            |

このワークスペースにあるパッケージは、全て単体の web フロントエンドアプリケーションとしてビルド、デプロイ可能なものです。各パッケージは必要に応じて Packages ワークスペース配下のパッケージに依存します。
