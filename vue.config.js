module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
  // devServer: {
  //     proxy: {
  //       '/ebook': {
  //         target: 'http://localhost:80',
  //         ws: true,
  //         changOrigin: true
  //       }
  //     }
  // } 这种方方法是简易方法反向代理访问本地服务器开发时候只要用 '/ebook'地址就可以，但是上线地址是不对的还是要利用跨域方式VUE_APP
}
