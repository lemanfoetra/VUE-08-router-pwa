import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFount.vue'
import TeamFooter from './components/teams/TeamFooter.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' },
        {
            path: '/teams',
            beforeEnter(to, from, next) {
                console.log('Guard yang menempel di route /teams');
                next();
            },
            components: {
                default: TeamsList,
                footer: TeamFooter,
            },
            children: [
                { name: 'team-members', path: ':teamId', component: TeamMembers, props: true },
            ]
        },
        {
            path: '/users',
            components: {
                default: UsersList
            }
        },
        {
            path: '/:notFount(.*)',
            components: {
                default: NotFound,
            }
        },
    ],

    scrollBehavior(_, _2, _3) {
        // console.log(to, from, savedPosition)
        return {
            left: 0,
            top: 0,
        }
    },
})

router.beforeEach(function (to, from, next) {
    console.log('Guard global')
    // console.log(to, from);
    next();
});

const app = createApp(App)

app.use(router);
app.mount('#app');
