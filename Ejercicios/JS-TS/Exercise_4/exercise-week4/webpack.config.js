const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    static:  path.join(__dirname, 'dist'), // Server’s root dir
    compress: true, // Enable gzip compresion when serving content
    port: 8080, // Default
    hot: false,
  },
  mode: "development",
  devtool: "source-map",
  context: path.join(__dirname, "./src"),
  entry: {
    index: "./index.js",
    "new-restaurant": "./new-restaurant.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname + "/dist"),
    publicPath: "/",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "../index.html",
      chunks: ["index", "commons", "vendors"],
    }), // By default generates index.html
    new HtmlWebpackPlugin({
      filename: "new-restaurant.html",
      template: "../new-restaurant.html",
      chunks: ["new-restaurant", "commons"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      { test: /\.hbs$/, loader: "handlebars-loader" },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test(module) {
            return module.resource && module.resource.includes("/node_modules");
          },
          name: "vendors",
          chunks: "all",
        },
        commons: {
          test(module) {
            return (
              module.resource && !module.resource.includes("/node_modules")
            );
          },
          chunks: "initial",
          name: "commons",
          minChunks: 2,
          minSize: 0,
        },
      },
    },
  },
  experiments: {
    topLevelAwait: true
  }
};