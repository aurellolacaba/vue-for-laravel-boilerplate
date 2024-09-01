import Dashboard from '../pages/Dashboard.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'
import Products from '../pages/Products.vue'
import Create from '../pages/Users/Create.vue'
import Users from '../pages/Users/index.vue'
import Profile from '../pages/Users/partials/Profile.vue'
import Settings from '../pages/Users/partials/settings.vue'
import Show from '../pages/Users/Show.vue'

export const routes = [
    {
        path: '/',
        name: 'home',
        redirect: to => ({path: '/login'}),
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            layout: 'Guest'
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            layout: 'Authenticated',
            requiresAuth: true
        }
    },
    {
        path: '/products',
        name: 'products',
        component: Products,
        meta: {
            layout: 'Authenticated',
            requiresAuth: true
        }
    },
    {
        path: '/users',
        name: 'users',
        component: Users,
        meta: {
            layout: 'Authenticated',
            requiresAuth: true
        }
    },
    {
        path: '/users/create',
        name: 'addUser',
        component: Create,
        meta: {
            layout: 'Authenticated',
            requiresAuth: true
        }
    },
    {
        path: '/users/:id',
        name: 'showUser',
        component: Show,
        props: true,
        meta: {
            layout: 'Authenticated',
            requiresAuth: true
        },
        redirect: {
            name: 'userProfile'
        },
        children: [
            {
                path: 'profile',
                name: 'userProfile',
                component: Profile
            },
            {
                path: 'settings',
                name: 'userSettings',
                component: Settings
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound
    }
]