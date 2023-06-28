<template>
    <div>
        <button @click="sendMsg">点击向子应用发送消息</button>
        <button class="anvto" @click="goToSun">我要在父应用控制子应用跳转详情页面</button>
        <button class="anvto-umapp" @click="unSunApp">主动卸载子应用</button>
        <fieldset>
            <legend>我是父级/about路由下的页面，这里将会展示我的子应用</legend>
            <!-- 这里渲染子应用到dom id与子应用相对应 -->
            <div id="microApp"/>
            <!-- 子应用的路由出口 -->
            <router-view></router-view>
            <!--            &lt;!&ndash; 子应用的包裹组件 &ndash;&gt;-->
            <!--            <child-app-wrapper></child-app-wrapper>-->
        </fieldset>
    </div>
</template>

<script>
// import ChildAppWrapper from '../child-app-wrapper/child-app-wrapper.vue';
import {navigateToUrl, unregisterApplication} from 'single-spa'; //导航方法

export default {
    name: "about-123",
    components: {
        // ChildAppWrapper,
    },
    mounted() {
        //注册 customEvent 自定义事件
        this.event = new CustomEvent('customEvent', {detail: '你好，大儿子'});
    },
    methods: {
        sendMsg() {
            // 父级应用
            console.log('我是父级应用我在1秒后向子应用发送了,自定义事件：customEvent ，子应用你需要需要监听这个事件')
            setTimeout(() => {
                window.dispatchEvent(this.event);
            }, 1000)
        },
        //跳转子应用某个页面
        goToSun() {
            navigateToUrl('/detail#/about');
        },
        //主动卸载子应用
        unSunApp() {
            unregisterApplication('app1')
        }
    }
}
</script>

<style scoped>
.anvto {
    background: #42b983;
}

.anvto-umapp {
    background: #35634f;
}

</style>
