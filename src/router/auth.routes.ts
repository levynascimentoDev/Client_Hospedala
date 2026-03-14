import { type RouteRecordRaw } from 'vue-router'
import Login from '../pages/auth/pages/Login.vue'
import Register from '../pages/auth/pages/Register.vue';
import CheckoutEmail from '../pages/auth/pages/CheckoutEmail.vue';

const authRoutes: RouteRecordRaw[] = [
    { path:"/login", component: Login },
    { path:"/login/complete", component: Register },
    { path:"/login/verification", component: CheckoutEmail },
]

export default authRoutes; 
