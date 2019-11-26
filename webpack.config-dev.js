/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
/* eslint-enable import/no-extraneous-dependencies */

const newHWP = (dir, titel) => {
  return new HtmlWebpackPlugin({
    filename: `../${dir}/index.html`,
    template: './src/html/template.html',
    admin: fs.readFileSync('./src/html/admin.html'),
    title: titel,
    body: fs.readFileSync(`./src/html/${dir}.html`)
  });
};

module.exports = {
  mode: 'development',
  stats: {
    colors: true,
    maxModules: 1000,
    excludeModules: false,
    modulesSort: '!size'
  },
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/js')
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: '../css/main.css'
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['de']
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/html/root.html',
      admin: '',
      title: 'Zeiterfassung Aushilfen',
      body: fs.readFileSync('./src/html/index.html')
    }),
    new HtmlWebpackPlugin({
      filename: '../register.html',
      template: './src/html/root.html',
      admin: '',
      title: 'Zeiterfassung Aushilfen',
      body: fs.readFileSync('./src/html/register.html')
    }),
    newHWP('abrechnung', 'Abrechnung'),
    newHWP('aushilfen', 'Aushilfen'),
    newHWP('auswerten', 'Arbeitszeitnachweis'),
    newHWP('eintragen', 'Eintragen'),
    newHWP('mitarbeiter', 'Mitarbeiter'),
    newHWP('readme', 'Hilfe'),
    newHWP('zeiten', 'Zeiten')
  ],
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
  }
};
