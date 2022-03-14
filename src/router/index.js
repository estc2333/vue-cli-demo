import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: () => import('../views/Homepage'),
            redirect: { name: 'shop' },
            children: [
                {
                    name: 'shop',
                    path: '/shop',
                    component: () => import('/src/views/Shop')
                },
                {
                    name: 'dashBoard',
                    path: '/dashBoard',
                    component: () => import('/src/views/DashBoard')
                },
                {
                    name: 'agent',
                    path: '/agent',
                    component: () => import('/src/views/Agent')
                },
                {
                    name: 'todos',
                    path: '/todos',
                    component: () => import('/src/views/Todos')
                },
            ]
        },
    ]
})
