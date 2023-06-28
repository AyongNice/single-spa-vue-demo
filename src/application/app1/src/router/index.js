// router.js
import Vue from 'vue';

import VueRouter from 'vue-router';

import Home from '../views/home/home.vue';
import sun from '../views/sun-com/sun-com.vue';
import detail from '../views/detail/detail.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home},
    {path: '/sun', component: sun},
    {path: '/detail', component: detail},
];
const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes,
});


export default router;


