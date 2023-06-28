<template>
    <div>
        <h1>singpa 子应用</h1>
        <button @click="sendMsg">点击向父级发送消息</button>
        <button @click="navigateToChildApp1">跳转到我子应用到sun路由页面</button>
        <button @click="navigateTodetail">跳转到我子应用到detail路由详情页面</button>
        <router-view></router-view>
        <!--        <ParentAppWrapper>-->
        <!--            &lt;!&ndash; 父级应用的内容 &ndash;&gt;-->
        <!--            <div class="square">我是子级首页的dom，我的样式class name也是是square，但是我的颜色是红色</div>-->
        <!--        </ParentAppWrapper>-->
        <!--        <router-view></router-view>-->
    </div>

</template>

<script>
// ß


export default {
    name: 'App',
    components: {},
    created() {
        //注册customEventSun 自定义事件
        this.event = new CustomEvent('customEventSun', {detail: '爸爸 你好'});
    },
    mounted() {
        // 子应用
        window.addEventListener('customEvent', function (event) {
            const message = event.detail; // 获取父级应用传递的数据
            console.log('我是子应用 我收到了父应用发给我的消息', message);
        });

    },
    methods: {
        navigateToChildApp1() {
            // 使用 Single-spa-Vue 提供的导航函数切换到子应用1的路由
            this.$navigateTo('/sun#/aboutdiy');
        },
        navigateTodetail() {
            // 子应用跳转自己页面必须在路后加上# 然后跟/父应用所在
            this.$navigateTo('/detail#/aboutdiy');
        },

        sendMsg() {
            // 子集应用
            console.log('我是子应用====我在1秒后向子应用发送了,自定义事件：customEventSun ，子应用你需要需要监听这个事件')
            setTimeout(() => {
                window.dispatchEvent(this.event);
            }, 1000)
        }
    }
}
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.square {
    width: 300px;
    height: 300px;
    background: rgb(197 73 50);
}

button {
    margin: 20px 5px;
    padding: 0;
    border: none;
    width: 300px;
    height: 50px;
    background: #3baeee;

}
</style>
