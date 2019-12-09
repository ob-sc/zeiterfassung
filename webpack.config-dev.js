/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const newHWP = dir => {
  return new HtmlWebpackPlugin({
    filename: `${dir}/index.html`,
    template: './src/html/template.html',
    inject: 'head',
    admin: fs.readFileSync('./src/html/admin.html'),
    title: dir,
    body: fs.readFileSync(`./src/html/${dir}.html`)
  });
};

const newRootHWP = dir => {
  return new HtmlWebpackPlugin({
    filename: `${dir}.html`,
    template: './src/html/root.html',
    inject: 'head',
    body: fs.readFileSync(`./src/html/${dir}.html`)
  });
};

module.exports = {
  mode: 'development',
  stats: {
    colors: true,
    maxModules: 500,
    excludeModules: false,
    modulesSort: '!size'
  },
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
      }
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
    newRootHWP('index'),
    newRootHWP('register'),
    newHWP('abrechnung'),
    newHWP('aushilfen'),
    newHWP('auswerten'),
    newHWP('eintragen'),
    newHWP('mitarbeiter'),
    newHWP('readme'),
    newHWP('zeiten')
  ]
};
