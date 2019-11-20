const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

// Für prod Builds
module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    filename: 'main.[chunkhash].js',
    path: path.resolve(__dirname, 'public/js')
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: 'main.[contenthash].css'
      filename: 'main.css'
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['de']
    }),
    new ManifestPlugin()
  ],
  optimization: {
    minimizer: [new TerserPlugin()]
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
  }
};
