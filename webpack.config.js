// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { DIR, EXT = 'ts' } = process.env;

module.exports = {
  mode: 'development',
  entry: `./examples/${DIR}/src/index.${EXT}`,
  plugins: [
    new HtmlWebpackPlugin({
      template: `./examples/${DIR}/public/index.html`,
    }),
  ],
  module: {
    rules: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { useBuiltIns: 'usage' }],
            '@babel/preset-react',
          ],
        },
      }],
    }, {
      test: /\.tsx?/,
      loader: 'ts-loader',
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-hooks-worker': __dirname,
    },
  },
  devServer: {
    port: process.env.PORT || '8080',
    contentBase: `./examples/${DIR}/public`,
  },
};
