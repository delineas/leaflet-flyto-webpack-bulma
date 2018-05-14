const path = require('path');

const entryPath = path.join(__dirname, 'src'),
  outputPath = path.join(__dirname, 'dist');

module.exports = {
  entry: './src/main.js',
  devtool: "source-map",
  output: {
    filename: 'bundle.js',
    path: outputPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          context: '/',
          name: 'assets/images/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          context: '/',
          name: 'assets/fonts/[name].[ext]'
        }
      },
      {
        test: /\.csv$/,
        loader: 'file-loader',
        options: {
          context: '/',
          name: 'assets/data/[name].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
        exclude: /node_modules/,
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  }
};