const path = require('path');
module.exports = {
    assetsRoot: path.resolve(__dirname, '../dist'),//打包目录
    assetsDirectory: 'assets/',
    publicPath: '/',
    indexPath: path.resolve(__dirname, '../public/index.html')
}
