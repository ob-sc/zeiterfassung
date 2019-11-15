const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

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
