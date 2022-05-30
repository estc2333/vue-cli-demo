import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '@/includes/firebase';

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
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
                    component: () => import('/src/views/Contacts'),
                    meta: { requiresAuth: true },
                },
                {
                    name: 'agent',
                    path: '/agent',
                    component: () => import('/src/views/Agent'),
                    meta: { requiresAuth: true },
                },
                {
                    name: 'login',
                    path: '/login',
                    component: () => import('/src/views/Login')
                },
                {
                    name: 'axiosNotes',
                    path: '/axiosNotes',
                    component: () => import('/src/views/AxiosNotes')
                },
            ]
        },
    ]

const router = new Router({
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = auth.currentUser;
    console.log("isauthenticated", isAuthenticated);
    if (requiresAuth && !isAuthenticated) {
        next("/shop");
    } else {
        next();
    }
})
export default router;
