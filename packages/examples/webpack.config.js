const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => ({
  entry: path.join(__dirname, './src/index.tsx'),
  mode: 'development',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.join(__dirname, './dist'),
    clean: true,
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        oneOf: [
          {
            test: /.module.(less|css)$/,
            include: path.join(__dirname, './src'),
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  module: {
                    localIdentName: '[path][name]__[local]--[hash:base64:4]'
                  }
                }
              },
              'postcss-loader',
              'less-loader'
            ]
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      "@": path.join(__dirname, './src'),
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
    })
  ],
  devServer: {
    port: 3000,
    compress: false, // 不压缩
    hot: true, // 热更新
    historyApiFallback: true, // 支持 history 模式 解决404 问题
    static: {
      directory: path.join(__dirname, './public'),
    }
  }
})