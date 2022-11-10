import { createWebHistory,createRouter } from 'vue-router';
import SignUp from './components/signup/sign-up.vue';
import Login from './components/login/login.vue';
import Home from './components/home/home.vue';
import Blog from './components/blog/view-blog.vue';
import AddBlog from './components/blog/add-blog.vue';
import MyBlogs from './components/blog/my-blogs.vue';

const routes = [
    {
        name:'Login',
        path:'/login',
        component: Login
    },
    {
        name:'SignUp',
        path:'/signup',
        component: SignUp
    },
    {
        name:'Home',
        path:'/',
        component: Home
    },
    {
        name:'Category',
        path:'/:category',
        component: Home
    },
    {
        name:'Blog',
        path:'/blog/:id',
        component: Blog
    },
    {
        name:'MyBlogs',
        path:'/my-blogs',
        component: MyBlogs,
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem("status") == 'false'){
                next({ name: 'Login' });
            }
            else{
                next();
            }
        },
    },
    {
        name:'AddBlog',
        path:'/add-blog',
        component: AddBlog,
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem("status") == 'false'){
                next({ name: 'Login' });
            }
            else{
                next();
            }
        },
    },
    {
        name:'UpdateBlog',
        path:'/update-blog/:id',
        component: AddBlog
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;