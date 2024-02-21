/**
 * @description productions
 */

const getBaseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


// 优化 压缩，分治
module.exports = merge(getBaseConfig(false), {
  /**
   * @description 优化配置
   * @param minimizer | 压缩方案配置
   * @param CssMinimizerPlugin | css压缩
   * @param TerserPlugin | 压缩js
   * @param splitChunks | 分割代码
   */
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log', 'console.warn'] // 去除console.log
          }
        }
      })
    ],
    splitChunks: {
      // 缓存配置
      chunks: 'async',
      miniSize: 20000,
      minChunks: 1,
      cacheGroups: {
        // 三方依赖
        vendors: {
          priority: 1, // 优先级
          test: /node_modules/,
          name: 'vendors',
        },
        common: {
          name: 'commons',
          minChunks: 3, // 最小共用次数
        }
      }
    }
  }
})
