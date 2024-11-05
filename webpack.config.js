const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BytenodeWebpackPlugin } = require('@herberttn/bytenode-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    server: './src/main.ts',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BytenodeWebpackPlugin({ keepSource: true }),
  ],
  optimization: {
    minimize: false,
  },
  performance: {
    maxEntrypointSize: 1000000000,
    maxAssetSize: 1000000000,
  },
  output: {
    path: path.resolve(__dirname, 'prod'),
    filename: '[name].js',
  },
};
