<template>
    <div>
        <h2>我是子应用的sun路由页面</h2>
        <P>我的页面路由是{{ href }}</P>
    </div>
</template>

<script>
export default {
    name: "sun-com",
    data() {
        return {}
    },
    computed: {
        href() {
            return window.location.href
        }
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
