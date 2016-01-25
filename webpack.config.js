var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: [
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  }
}
