const merge = require('webpack-merge');
const config = require('./config');
const baseWebpackConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//为了方便管理静态资源，充分利用缓存，我们需要将css单独打包
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

module.exports = merge.smart(baseWebpackConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'js/[name].[contenthash:8].js', // contenthash：只有模块的内容改变，才会改变hash值
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: true ? { map: { inline: false } } : {}
            })
        ]
    },

    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(c|le)ss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            "css-loader",
                            'postcss-loader',
                            'less-loader',
                        ]
                    },
                    {
                        test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: 'img/[name].[contenthash:8].[ext]',
                            outputPath: config.assetsDirectory,
                            publicPath: config.assetsRoot
                        }
                    },
                    {
                        exclude: [/\.(js|mjs|ts|tsx|less|css|jsx)$/, /\.html$/, /\.json$/],
                        loader: 'file-loader',
                        options: {
                            name: 'media/[path][name].[contenthash:8].[ext]',
                            outputPath: config.assetsDirectory,
                            publicPath: config.assetsRoot
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
            // chunkFilename: '[name].[contenthash:8].chunk.css'
        }),
        // gzip压缩
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240, // 大于这个大小的文件才会被压缩
            minRatio: 0.8
        }),
    ],
    optimization: {
        minimizer: [
            // new UglifyjsWebpackPlugin({
            //   sourceMap: config.productionJsSourceMap
            // })
            new TerserPlugin({
                sourceMap: config.productionJsSourceMap
            })
        ]
    }
})