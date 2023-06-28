<template>
    <div>
        <h1>singpa父级应用</h1>
        <router-link to="/aboutdiy">
            <button class="active">点击进入'/about'哈希路由要页面，激活子应用</button>
        </router-link>
        <router-link to="/child">
            <button class="active">点击进入'/child'页面，父应用会自动根据配置卸载子应用</button>
        </router-link>
        <div class="square">我是父级的dom我的颜色是绿色，我的样式class name是square
            <h4>由于single-spa框架不带样式隔离， 子应用不要使用全局样式！！如果要用必须在在声明css样式需要加上class特定前缀
                以免污染父应用样式</h4>
        </div>
        <router-view></router-view>
    </div>

</template>

<script>


export default {
    name: 'App',
    components: {},
    mounted() {

        // 根据事件名customEventSun监听事件
        window.addEventListener('customEventSun', function (event) {
            const message = event.detail; // 获取父级应用传递的数据
            console.log('我是父应用 我在首页的mounted生命周期监听到了customEventSun事件触发:', message);
        });

    },
    computed: {
        showSend() {
            return location.hash.startsWith('#/about')
        }
    },
    methods: {}
}
</script>

<style>
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
    background: rgb(217 94 43);
}

.active {
    background: #f58d62;
}

button {
    margin: 20px 5px;
    padding: 15px;
    border: none;
    width: 300px;
    background: #3baeee;
}
</style>
