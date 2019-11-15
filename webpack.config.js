const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/js')
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['de']
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin()]
  }
};
