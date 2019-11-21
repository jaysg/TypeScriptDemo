const path = require('path');
const merge = require('webpack-merge');
const config = require('./config');
const baseWebpackConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const getClientEnvironment = require('./env');
const env = getClientEnvironment(config.publicPath);

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//为了方便管理静态资源，充分利用缓存，我们需要将css单独打包
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

//preload和prefetch是一组能够预读资源，优化用户体验的工具
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const sourceMapsMode = config.productionJsSourceMap ? 'source-map' : 'none';

module.exports = merge.smart(baseWebpackConfig, {
    mode: 'production',
    devtool: sourceMapsMode,
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
                        test: /\.(less|css)$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                            },
                            'postcss-loader',
                            {
                                loader: 'less-loader',
                                options: {
                                    javascriptEnabled: true,
                                }
                            }
                        ]
                    },
                    {
                        test: /\.svg$/,
                        use: ['@svgr/webpack']
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
        new CleanWebpackPlugin(),
        new PreloadWebpackPlugin({
            rel: 'preload',
            as(entry) {
                if (/\.css$/.test(entry)) return 'style';
                if (/\.woff$/.test(entry)) return 'font';
                if (/\.png$/.test(entry)) return 'image';
                return 'script';
            },
            include: ['app']
            // include:'allChunks'
        }),
        new HtmlWebpackPlugin({
            template: config.indexPath,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeOptionalTags: false,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeAttributeQuotes: true,
                removeCommentsFromCDATA: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new InterpolateHtmlPlugin(env.raw),
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
        new PreloadWebpackPlugin({
            rel: 'preload',
            as(entry) {
                if (/\.css$/.test(entry)) return 'style';
                if (/\.woff$/.test(entry)) return 'font';
                if (/\.png$/.test(entry)) return 'image';
                return 'script';
            },
            include: ['app']
            // include:'allChunks'
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 2,
            maxInitialRequests: 5,
            cacheGroups: {
                // 提取公共模块
                commons: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name: 'common'
                }
            }
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: true ? { map: { inline: false } } : {}
            }),
            new TerserPlugin({
                sourceMap: config.productionJsSourceMap
            })
        ]
    }
})