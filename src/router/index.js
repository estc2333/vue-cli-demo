import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

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
                    name: 'contacts',
                    path: '/contacts',
                    component: () => import('/src/views/Contacts')
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
                {
                    name: 'axiosNotes',
                    path: '/axiosNotes',
                    component: () => import('/src/views/AxiosNotes')
                },
            ]
        },
    ]
})
