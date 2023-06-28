import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router';

import {registerApplication, start} from 'single-spa';


/** 沙箱JS隔离class **/
import WindowSandbox from './coom/index';
// 创建一个沙箱实例
const sandbox = new WindowSandbox();

// 获取沙箱中的 window 对象
const sandboxWindow = sandbox.getWindow();

window.__SINGLE_SPA__ = true


/**
 * single-spa框架底层逻辑是 通过向父应用的html中添加 script (内容就是子应用所渲染的JS) 标签形式添加子应用
 * @param url url {string} 子应用的服务部署地址
 * @return {Promise<unknown>}
 */
function createScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.onload = resolve
        script.onerror = reject
        const firstScript = document.getElementsByTagName('script')[0]
        firstScript.parentNode.insertBefore(script, firstScript)
    })
}

/**
 * 加载子应用的JS文件
 * @param url {string} 子应用的服务部署地址
 * @param globalVar {string} 子应用名称 对应 子应用webpack打包 library: "app1",  导出名称
 * @param entrypoints {string[]} 需要加载的子应用 JS文件列表 chunk-vendors.js 公共JS app.js 功能JS
 * @return {Promise<*>}
 */
async function loadApp(url, globalVar, entrypoints) {
    for (let i = 0; i < entrypoints.length; i++) {
        await createScript(url + entrypoints[i])
    }
    console.log('globalVar', window[globalVar])
    return window[globalVar]
}


/**
 * 子应用路由注册表 可以配置多个
 * @type {[{app: (function(): Promise<*>), activeWhen: (function(*): any), appName: string, customProps: {}, name: string}]}
 */
const apps = [{
    name: 'app1', //子应用名称 对应 子应用webpack打包 library: "app1",  导出名称
    app: async () => await loadApp('http://localhost:8083', 'app1', ["/js/chunk-vendors.js", "/js/app.js"]), // 当路由满足条件时（返回true），激活（挂载）子应用
    activeWhen: location => location.hash.startsWith('#/about'), // activeWhen: location => true,// 检测用户切换到 /vue  路径下 需要实现刚刚定义的加载事件
    // 传递给子应用的对象 子应用可以通过 bootstrap 接收到
    customProps: {}
},
]

// 注册子应用
setTimeout(() => {
    for (let i = apps.length - 1; i >= 0; i--) {
        const item = apps[i]
        registerApplication(item.name, item.app, item.activeWhen, {sandbox: {sandboxWindow}})
    }
}, 500)

new Vue({
    router, render: h => h(App), mounted() {
        start()
    },
}).$mount('#app')

