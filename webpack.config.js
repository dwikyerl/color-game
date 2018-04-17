const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const javascript = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader"
  }
};

const html = {
  test: /\.html$/,
  use: [
    {
      loader: "html-loader",
      options: { minimize: true }
    }
  ]
};

const scss = {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader",
        options: { minimize: true }
      },
      { loader: "postcss-loader" },
      { loader: "sass-loader" }
    ]
  })
};

const css = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader",
        options: { minimize: true }
      }
    ]
  })
};

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    watchContentBase: true,
    historyApiFallback: true
  },
  module: {
    rules: [javascript, html, scss, css]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin({
      filename: "css/main.css"
    })
  ]
};
