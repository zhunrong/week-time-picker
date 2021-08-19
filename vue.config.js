process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
  devServer: {
    port: 3000
  },
  css: {
    extract: true
  }
};
