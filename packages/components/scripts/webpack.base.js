const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
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
       * @description assetss | 静态资源配置
       * @param 图片、字体
       * @param 视频、音频
       */
      {
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: 'assets',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/images/[name][ext]'
        },
      },
      {
        test: /.(woff2|eot|ttf|otf)$/,
        type: 'assets',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/fonts/[name][ext]'
        }
      },
      {
        test: /.(mp4|mp3|webm)$/,
        type: 'assets',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/medias/[name][ext]'
        }
      },
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
    }),
    new webpack.DefinePlugin({
      "process.env.PRIMARY": JSON.stringify(process.env.PRIMARY)
    })
  ]
})