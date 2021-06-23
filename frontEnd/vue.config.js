const autoprefixer = require('autoprefixer');
const path = require('path')
const pxtorem = require('postcss-pxtorem');

// const Version = new Date().getTime()

function resolve (dir) {
  return path.join(__dirname, dir)
}
let publicPath =process.env.NODE_ENV=='development'?'/':'/fundTransfer/javascripts/'

module.exports = {
  publicPath,
  outputDir: resolve('../backEndServer/public/fundTransfer/javascripts'), 
  indexPath:resolve('../backEndServer/views/index.html'),
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].js`,//.${Version}
      chunkFilename: `[name].js`
    },
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          red: '#C62222',
          'button-large-height': '45px',
          'button-large-line-height': '43px',
          'button-small-height': '25px',
          'button-small-line-height': '23px'
        }
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('src', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@axios', resolve('src/axios'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
    // 配置svg图标
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      }).end()
    config.module.rule('xml').test('/\.xml$/').use('xml-loader').loader('xml-loader').options({
      explicitArray: false,
    }).end()
  },
  devServer: {
    port: 8899, // 端口
    // disableHostCheck: true,
    compress: false, // 开启压缩
    overlay: {
      warnings: true,
      errors: true
    }
  },
  lintOnSave: false,
};
