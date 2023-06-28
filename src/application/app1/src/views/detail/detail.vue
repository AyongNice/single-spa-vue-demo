<template>
    <div>
        <h2>我是子应用到详情页面</h2>
        <P>我的页面路由是{{ href }}</P>
    </div>
</template>

<script>
export default {
    name: "detail-de",
    computed: {
        href() {
            return window.location.href
        }
    },
}
</script>

<style scoped>

</style>
