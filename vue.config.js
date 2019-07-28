module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/end':{
                target:'http://api.ndsport.cn',
                changeOrigin:true,
                pathRewrite:{
                    '/end':'/end'
                }
            }
        }
    }
}