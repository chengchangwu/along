var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: [
    './lib/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'along.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
}
