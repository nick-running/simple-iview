// let ip = 'http://192.168.1.6'
let ip = 'http://127.0.0.1'
// let ip = 'http://192.168.0.102'
// let ip = 'http://192.168.2.101'
module.exports = {
  publicPath: '/',
  // publicPath: '/static/eg_list',
  outputDir: 'dist',
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
      '/api_date': {
        target: 'http://timor.tech',
        // ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api_date': ''
        }
      },
      '/api': {
        target: 'https://www.mxnzp.com',
        // ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      // '/api': {
      //   target: `${ip}:8868`,
      //   // ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // },
      // '/foo': {
      //   target: '<other_url>'
      // }
    }
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  }
}
