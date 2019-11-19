const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const APP_PATH = path.resolve(__dirname, '../src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const argv = require('yargs').argv;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');

const bundleAnalyzerReport = argv.report; // 根据命令参数是否含有 'report' 来决定是否生成报告

//单独打包css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//复制静态资源到dist
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 这个配置将合并到最后的配置中
const webpackConfig = {
    plugins: []
};

if (bundleAnalyzerReport) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: path.join(config.assetsRoot, './report.html')
    }));
}

// 改用merge来合并配置
module.exports = merge(webpackConfig, {
    entry: {
        app: './src/index.tsx',
        vendor: ['react', 'react-dom'] // 不变的代码分包
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: config.assetsRoot,
        publicPath: config.publicPath,
        chunkFilename: "[name].chunk.js"
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.svg$/,
                        use: ['@svgr/webpack']
                    },
                    {
                        test: /\.(html)$/,
                        loader: 'html-loader'
                    },
                    {
                        test: /\.(j|t)sx?$/,
                        include: APP_PATH,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        '@babel/preset-react',  // jsx支持
                                        ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 2 }] // 按需使用polyfill
                                    ],
                                    plugins: [
                                        ['@babel/plugin-proposal-class-properties', { 'loose': true }] // class中的箭头函数中的this指向组件
                                    ],
                                    cacheDirectory: true // 加快编译速度
                                }
                            },
                            {
                                loader: 'awesome-typescript-loader',
                                options: {
                                    reportFiles: [
                                        'src/**/*.{ts,tsx}'
                                    ]
                                },
                            }
                        ]
                    },
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
                            name: 'img/[name].[hash:8].[ext]',
                            outputPath: config.assetsDirectory,
                            publicPath: config.assetsRoot
                        }
                    },
                    {
                        exclude: [/\.(js|mjs|ts|tsx|less|css|jsx)$/, /\.html$/, /\.json$/],
                        loader: 'file-loader',
                        options: {
                            name: 'media/[path][name].[hash:8].[ext]',
                            outputPath: config.assetsDirectory,
                            publicPath: config.assetsRoot
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css"                     // 提取出来的css文件路径以及命名
        }),
        new CopyWebpackPlugin([
            {
                from: 'public',
                ignore: ['index.html']
            }
        ]),
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
        }
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // 自动判断后缀名，引入时可以不带后缀
        alias: {
            '@': path.resolve(__dirname, '../src/') // 以 @ 表示src目录
        }
    },
});