const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const publicPath = 'http://localhost:8080/'

const env = process.env.NODE_ENV

const config = {
  entry: [
    path.resolve(__dirname, "src/ErrorMessage.js"),
    path.resolve(__dirname, "example"),
    'webpack-hot-middleware/client?path=/__webpack_hmr'
  ],
  output: {
    path: path.resolve(__dirname, "example"),
    publicPath: publicPath,
    filename: "bundle.js",
    library: 'ErrorMessage',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new DashboardPlugin({ port: 3001 }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'example/index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}

module.exports = config
