const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (isDev) => ({
  entry: path.join(__dirname, '../src/index.tsx'),
  mode: isDev ? 'development' : 'production',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/'
  },

  module: {
    rules: [
      /**
       * @description ts 解析
       * @method loader
       */
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
        }
      },

      /**
       * @description css解析
       * @method postcss-loader
      */
      {
        oneOf: [
          {
            // 定义一下，使用xxx.module.(less | css)
            test: /.module.(less|css)$/,
            include: path.join(__dirname, '../src'),
            use: [
              !isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  // 开启 css modules
                  modules: {
                    localIdentName: '[path][name]__[local]--[hash:base64:4]'
                  }
                },
              },
              'postcss-loader',
              'less-loader'
            ]
          }
        ]
      },
      // {
      //   test: /\.(less)$/,
      //   use: [
      //     !isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'less-loader',
      //     'postcss-loader'
      //   ]
      // },
      // {
      //   test: /\.(css)$/,
      //   use: [
      //     !isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      //     "css-loader",
      //     "postcss-loader"
      //   ]
      // }
    ]
  },

  /**
   * @description resolve|解析配置
   */
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      "@": path.join(__dirname, '../src')
    }
  },

  /**
   * @description plugins|插件配置
   * @param HTMLWebpackPlugin |根据指定的模板生成HTML文件(含打包后注入的JS)
   */
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      inject: true, // 自动注入打包后的JS
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
    })
  ]
})