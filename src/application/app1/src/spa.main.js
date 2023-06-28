import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import router from './router';

import singleSpaVue from 'single-spa-vue';

Vue.prototype.$navigateTo = function (routePath, data) {
    const currentRoute = this.$router.currentRoute;
    console.log(routePath)
    console.log(this.$router.currentRoute)
    if (currentRoute.fullPath !== routePath) {
        this.$router.push(routePath, data);
    }
};
let vueInstance;
const vueLifecycles = singleSpaVue({
    Vue, appOptions: {
        el: '#microApp', render(h) {
            return h(App);
        }, router,
    },
});

// 如果需要独立运行子项目，可以添加以下代码
if (!window.singleSpaNavigate) {
    vueLifecycles.mount({
        domElement: '#app',
    });
}


//
// //子应用挂载
// export async function mount(props) {
//     console.log('app1 mount', props.sandbox)
//     vueInstance = vueLifecycles
//     return vueLifecycles.mount
// }

console.log(vueInstance)
//
// //子应用更新
// export function update() {
//     console.log('app1 update')
//     return vueLifecycles.update();
// }


//子应用卸载 操作dom 清空dom
// export function unmount() {
//     console.log('app1 unmount')
//     return vueLifecycles.unmount
// }
//子应用挂载前
export async function bootstrap(props) {
    console.log('app1 bootstrap', props)
    return vueLifecycles.bootstrap();
}

export const {unmount, mount} = vueLifecycles


