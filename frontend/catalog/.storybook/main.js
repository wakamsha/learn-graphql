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
  framework: {
    name: '@storybook/react-vite',
  },
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: true,
  },
};
