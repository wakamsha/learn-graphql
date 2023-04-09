const { resolve } = require('path');

module.exports = {
  staticDirs: [resolve(__dirname, '../static/')],

  stories: [
    {
      directory: '../../app-urql/src',
      titlePrefix: 'app-urql',
    },
  ],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    // 各サブパッケージ配下のコードにある path alias を Storybook に認識させる。
    config.resolve.alias = {
      ...config.resolve.alias,
      '@learn-graphql/api': resolve(__dirname, '../../../packages/api/src'),
    };
    return config;
  },
};
