module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  },
  output: {
    path: __dirname,
    filename: "bundle.js"
  }
};
