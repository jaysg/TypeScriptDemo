const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const webpack = require('webpack');
const config = require('./config');
const getClientEnvironment = require('./env');
const assetsConfig = require('./assets.config')

const env = getClientEnvironment(assetsConfig.publicPath);

module.exports = merge.smart(baseWebpackConfig, {
    mode: 'development',
    devtool:'source-map',
    output: {
        filename: 'js/[name].[hash:8].js',
        publicPath: assetsConfig.publicPath // 这里可以省略
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
            template: assetsConfig.indexPath,
            minify: {
                html5: true
            },
            hash: false
        }),
        new InterpolateHtmlPlugin(env.raw),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        ...config.devServer,
        proxy: {
            "/api/v2": {
                target: "https://janssen.dockertest.ilabservice.cloud",
                changeOrigin: true,
            }
        },
    },
    stats: {
        colors: true,
        children: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        builtAt: false,
        entrypoints: false,
        assets: false,
        version: false
    }
})