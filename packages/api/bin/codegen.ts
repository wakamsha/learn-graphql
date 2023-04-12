import { CodegenConfig } from '@graphql-codegen/cli';
import { resolve } from 'path';

/**
 * GraphQL のスキーマ定義とオペレーション定義から
 * TypeScript の型定義と `DocumentNode` オブジェクトを生成します。
 *
 * @see {@link https://the-guild.dev/graphql/codegen/plugins/presets/preset-client}
 */
const config: CodegenConfig = {
  schema: ['schemas/*.graphql'],
  documents: [resolve(__dirname, '../../../**/*.graphql')],
  ignoreNoDocuments: true,
  generates: {
    'src/gql/': {
      preset: 'client',
      config: {
        enumsAsTypes: true,
        strictScalars: true,
        defaultScalarType: 'unknown',
        useTypeImports: true,
        nonOptionalTypename: true,
        scalars: {
          Date: 'Date',
        },
      },
    },
  },
  hooks: { afterOneFileWrite: ['prettier -w'] },
};

export default config;
