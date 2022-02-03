module.exports = (webpackConf, type) => {
  if (type === 'build') {
    Object.assign(webpackConf.output, {
      publicPath: '/week-time-picker/'
    })
  }
}