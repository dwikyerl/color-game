const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const javascript = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: "babel-loader"
};

module.exports = {
  module: {
    rules: [javascript]
  }
};
