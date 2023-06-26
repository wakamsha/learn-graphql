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
      presetConfig: {
        fragmentMasking: {
          // `useFragment` を `getFragmentData` に名称変更する。
          // デフォルトの名称だと React がカスタムフックと誤解して用法が大幅に制限されるため。
          // @see: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#the-usefragment-helper
          unmaskFunctionName: 'getFragmentData',
        },
      },
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
