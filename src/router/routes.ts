
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('../layout/default.vue'),
        children:[
            {
                path: '/',
                name: 'home',
                component: () => import('../views/home.vue')
            },
            {
                path: '/piggy-bank/:address',
                name: 'PiggyBank',
                component: () => import('../views/piggyBank.vue')
            }
        ]
    }
]

export default routes