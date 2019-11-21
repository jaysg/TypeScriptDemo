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

//复制静态资源到dist
const CopyWebpackPlugin = require('copy-webpack-plugin');

const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const getClientEnvironment = require('./env');
const env = getClientEnvironment(config.publicPath);

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
    devtool: 'cheap-module-eval-source-map',
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
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: /node_modules/,
                include: [APP_PATH],
                loader: 'eslint-loader',
                options: {
                    emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
                    emitError: true, // 这个配置需要打开，才能在控制台输出error信息
                    fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
                }
            },
            {
                oneOf: [
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
                                    silent: true
                                },
                            }
                        ]
                    },
                    {
                        test: /\.(c|le)ss$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'postcss-loader',
                            'less-loader',
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
                    },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: config.indexPath,
            showErrors: true
        }),
        // 在html模板中能够使用环境变量
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        new InterpolateHtmlPlugin(env.raw),
        // 在js代码中能够使用环境变量(demo: process.env.NODE_ENV === 'production')
        new webpack.DefinePlugin(env.stringified),
        // 忽略moment的国际化库
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        new CopyWebpackPlugin([
            {
                from: 'public',
                ignore: ['index.html']
            }
        ]),
    ],
    optimization: {},
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // 自动判断后缀名，引入时可以不带后缀
        alias: {
            '@': path.resolve(__dirname, '../src/') // 以 @ 表示src目录
        }
    },
});