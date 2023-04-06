import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login/index.vue')
        },
        {
            path: '/',
            alias: '/index',
            name: 'Index',
            component: () => import('@/views/paper/index.vue')
        },
        {
            path: '/paper/:id',
            name: 'PaperDetail',
            component: () => import('@/views/paper/detail.vue')
        },
        {
            path: '/recommend/:id/',
            name: 'PaperRecommend',
            component: () => import('@/views/paper/recommend.vue')
        },
        {
            path: '/profile',
            name: 'Profile',
            // redirect: '/profile/index',
            alias: '/profile/index',
            component: () => import('@/views/profile/index.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const tokenStr = store.getters.token
    if (to.path === '/login') {
        if (tokenStr) return next('/')
        return next()
    }
    if (!tokenStr) return next('/login')
    next()
})

export default router