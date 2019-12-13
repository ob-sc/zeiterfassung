/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { hwp, hwpRoot } = require('./hwpData');

module.exports = {
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          }
        ]
      },
      { test: /\.hbs$/, loader: 'handlebars-loader' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['de']
    }),
    new HtmlWebpackPlugin(hwpRoot('index')),
    new HtmlWebpackPlugin(hwpRoot('register')),
    new HtmlWebpackPlugin(hwp('eintragen')),
    new HtmlWebpackPlugin(hwp('auswerten')),
    new HtmlWebpackPlugin(hwp('abrechnung')),
    new HtmlWebpackPlugin(hwp('aushilfen')),
    new HtmlWebpackPlugin(hwp('zeiten')),
    new HtmlWebpackPlugin(hwp('mitarbeiter')),
    new HtmlWebpackPlugin(hwp('hilfe'))
  ]
};
