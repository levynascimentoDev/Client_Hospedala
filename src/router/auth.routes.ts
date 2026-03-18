import { type RouteRecordRaw } from 'vue-router'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue';
import CheckoutEmail from '../pages/auth/CheckoutEmail.vue';
import SelectYourPlace from '../pages/TemporarySession/SelectYourPlace.vue';

const authRoutes: RouteRecordRaw[] = [
    { path:"/login", component: Login },
    { path:"/login/complete", component: Register },
    { path:"/login/verification", component: CheckoutEmail },
    { path: "/select", component: SelectYourPlace},
]

export default authRoutes; 
