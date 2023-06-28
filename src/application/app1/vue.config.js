const {defineConfig} = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        entry: {//根据脚本命名来配置单独运行还是嵌入父应用运行
            app: (process.env.Mode || '').trim() === 'singleSpa' ? './src/spa.main.js' : './src/main.js', // 主应用的入口文件
        },
        output: {     // 重点： 将其导出为library库文件
            library: "app1", // 导出名称
            libraryTarget: "umd", //挂载目标
        },
        devServer: {
            port: '8083'
        }
    }
})
