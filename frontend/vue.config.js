module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Furrisode',
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "./src/assets/sass/prepends.scss";'
      }
    }
  },
  devServer: {
    public: 'https://furrisode.com',
    disableHostCheck: true,
  },
};
