// router.js
import Vue from 'vue';

import VueRouter from 'vue-router';

import Home from '../views/home/home.vue';
import About from '../views/about/about.vue';
import child from '../views/child-app-wrapper/child-app-wrapper.vue';

Vue.use(VueRouter);
const routes = [
    {path: '/', component: Home},
    {path: '/aboutdiy', component: About},
    {path: '/child', component: child}
];
const router = new VueRouter({
    routes,
});


export default router;


