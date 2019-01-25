module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
      proxy: {
        '/ebook': {
          target: 'http://localhost:80',
          ws: true,
          changOrigin: true
        }
      }
  }
}
