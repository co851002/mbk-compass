const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: { doctype: 'html' }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.scss$/,
        use: 'import-glob-loader',
        include: [path.resolve(__dirname, 'src', 'sass')],
      },{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 3,
                sourceMap: true
              }
            },
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        }),
        include: [path.resolve(__dirname, 'src', 'sass')],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.(png|svg)$/,
        use: 'file-loader',
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('styles.[contenthash].css'),
    // new webpack.HashedModuleIdsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'runtime'
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    })
  ],
  output: {
    filename: 'build.[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  }
};
