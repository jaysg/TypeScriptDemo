const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./config');

module.exports = merge.smart(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'js/[name].[hash:8].js',
        publicPath: config.publicPath // 这里可以省略
    },
    module: {
        rules: [
            {
                oneOf: []
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: config.indexPath,
            minify: {
                html5: true
            },
            hash: false
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        ...config.devServer
    }
})