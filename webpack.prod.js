const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const common = require("./webpack.common");

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
      { loader: "resolve-url-loader" },
      { loader: "sass-loader?sourceMap" }
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

const images = {
  test: /\.(png|jp(e*)g|svg|ico)$/,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 8000, // Convert images < 8kb to base64 strings
        name: "images/[hash]-[name].[ext]"
      }
    }
  ]
};

module.exports = merge(common, {
  module: {
    rules: [html, images, scss, css]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin({
      filename: "main.css"
    })
  ]
});
