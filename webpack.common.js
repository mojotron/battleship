const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/scripts/controller.js',
  plugins: [new HtmlWebpackPlugin({ template: './src/template.html' })],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
