process.env.VUE_APP_VERSION = require("./package.json").version;

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  outputDir: "docs",
  publicPath: isDev ? "/" : "/week-time-picker/",
  devServer: {
    port: 3000
  },
  css: {
    extract: true
  }
};
