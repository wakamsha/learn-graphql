# learn-graphql

GraphQL で API と疎通する web フロントエンドアプリを検証する monorepo です。

## Workspaces

### Backend

このワークスペースにあるパッケージは、いずれもシンプルな GraphQL Server App です。GraphQL Client を実装したフロントエンドアプリを設計する際の検証環境が主な用途です。

### Frontend

このワークスペースにあるパッケージは、全て単体の web フロントエンドアプリケーションとしてビルド、デプロイ可能なものです。

### Tutorials

このワークスペースにあるパッケージは、[GraphQL 公式サイトで紹介されている GraphQL.js 用チュートリアル](https://graphql.org/) を項目ごとに写経したものです。

## Prerequisites

|  Module | Ver.                     |
| ------: | ------------------------ |
| Node.js | `./.node-version` を参照 |
|    pnpm | `./.package.json` を参照 |

### Node.js

本リポジトリで利用可能な Node.js のバージョンは `./.node-version` ファイルにて管理しているため、開発者にはこのファイルをサポートしている Node.js バージョン管理ツールの利用を推奨します。以下は推奨するバージョン管理ツールの例です。

- [nodenv](https://github.com/nodenv/nodenv)
- [n](https://github.com/tj/n)
- [asdf](https://github.com/asdf-vm/asdf)
- [NVS](https://github.com/jasongin/nvs)
- [fnm](https://github.com/Schniz/fnm)

### pnpm

本リポジトリではパッケージマネージャーに pnpm を使用します。corepack コマンドを実行して pnpm を有効化します。

```bash
corepack enable
```

## Install dependencies

```bash
pnpm install
```

## Setup

```bash
pnpm api codegen
# `@learn-graphql/api` パッケージにて GraphQL のスキーマ定義とオペレーション定義から
# TypeScript の型定義と `DocumentNode` オブジェクトを生成します。
```

### VSCode ( Optional )

VSCode を使用している場合は、IDE の基本設定を反映させます。

```bash
cp .vscode/settings.recommended.json .vscode/settings.json
```
