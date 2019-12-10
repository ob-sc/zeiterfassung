const webpack = require('webpack');
const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const newHWP = dir => {
  return new HtmlWebpackPlugin({
    filename: `${dir}/index.[contenthash].html`,
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
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    filename: 'js/main.[chunkhash].js',
    path: path.resolve(__dirname, 'public')
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
              url: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash].css'
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
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()]
  }
};
