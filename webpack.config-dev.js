const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

// FÜr Dev Builds
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/js')
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['de']
    })
  ]
};
