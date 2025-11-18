import { type RouteRecordRaw } from 'vue-router'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue';

const authRoutes: RouteRecordRaw[] = [
    { path:"/login", component: Login },
    { path:"/register", component: Register }
]

export default authRoutes; 
