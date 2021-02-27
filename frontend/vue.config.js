module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "./src/assets/sass/prepends.scss";'
      }
    }
  },
  devServer: {
    public: 'http://furrisode.com',
    disableHostCheck: true,
  }
};
