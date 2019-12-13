const webpack = require('webpack');
const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
  mode: 'production',
  stats: 'errors-warnings',
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
      },
      { test: /\.hbs$/, loader: 'handlebars-loader' }
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
    newHWP('index', 'root'),
    newHWP('register', 'root'),
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
