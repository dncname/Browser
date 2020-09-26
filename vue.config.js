
module.exports = {


  publicPath: "./",

  productionSourceMap: false,
  devServer: {
    proxy: {
      '': {
        // target: 'http://119.28.128.52:8000',
        target: 'http://192.168.10.195:8888/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
};
