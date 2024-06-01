const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/src/index.tsx',
  mode: 'development',
  output: {
    filename: './client/index.js',
    path: path.resolve(__dirname, 'lib'),
  },
  devtool: 'eval',
  watch: true,
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    ['@babel/preset-react', {'runtime': 'automatic'}],
                    '@babel/preset-typescript'
                  ]
                }
              },
              {
                loader: 'ts-loader'
              },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './client/src/index.html' })],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
// { loader: 'babel-loader'}
