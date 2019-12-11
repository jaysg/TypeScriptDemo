module.exports = {
  plugins: {
    'postcss-aspect-ratio-mini': {}, // 处理元素容器的宽高比
    'postcss-write-svg': { //处理1px边框
      utf8: false
    },
    'postcss-px-to-viewport': {
      viewportWidth: 1920,
      viewportHeight: 1080,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    },
    cssnano: {
      'cssnano-preset-advanced': {
        zindex: false, // 这里一定要关掉，否则所有的z-index会被设为1
      }
    },
    autoprefixer: {},
    lost: {}
  }
};