/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const newHWP = (dir, loc) => {
  if (loc === 'root') {
    return new HtmlWebpackPlugin({
      filename: `${dir}.html`,
      template: './src/hbs/root.hbs',
      inject: 'head',
      title: dir
    });
  }
  return new HtmlWebpackPlugin({
    filename: `${dir}/index.html`,
    template: './src/hbs/index.hbs',
    inject: 'head',
    title: dir
  });
};

module.exports = {
  mode: 'development',
  stats: 'minimal',
  watch: true,
  watchOptions: {
    ignored: ['node_modules']
  },
  entry: './src/js/index.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['de']
    }),
    newHWP('index', 'root'),
    newHWP('register', 'root'),
    newHWP('abrechnung'),
    newHWP('aushilfen'),
    newHWP('auswerten'),
    newHWP('eintragen'),
    newHWP('mitarbeiter'),
    newHWP('readme'),
    newHWP('zeiten')
  ]
};
