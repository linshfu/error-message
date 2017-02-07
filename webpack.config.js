const webpack = require('webpack')

const env = process.env.NODE_ENV

const config = {
  output: {
    library: 'ErrorMessage',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

module.exports = config
