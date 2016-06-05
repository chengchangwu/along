var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: [
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
