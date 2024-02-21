/**
 * @description development|开发环境
 * @param getBaseCfg |使用基础配置
 * @param {Object} merge |将多个 webpack 配置文件合并成一个
 */

const getBaseConfig = require('./webpack.base.js');
const { merge } = require('webpack-merge');
const path = require('path');

console.log(getBaseConfig, 'getBaseConfig --- ');

module.exports = merge(getBaseConfig(true), {
  devtool: "source-map",
  devServer: {
    port: 3000,
    compress: false, // 不压缩
    hot: true, // 热更新
    historyApiFallback: true, // 支持 history 模式 解决404 问题
    static: {
      directory: path.join(__dirname, '../public'),
    }
  }
});
