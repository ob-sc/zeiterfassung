/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  stats: 'minimal',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    publicPath: '/',
    contentBase: './public',
    watchContentBase: true,
    proxy: {
      '**': {
        target: 'http://localhost:8000',
        secure: false
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    })
  ]
});
