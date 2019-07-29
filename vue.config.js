module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/end': {
                target: 'http://api.ndsport.cn',
                changeOrigin: true,
                pathRewrite: {
                    '/end': '/end'
                }
            }
        }
    }
}