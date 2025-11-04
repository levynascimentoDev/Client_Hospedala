import { type RouteRecordRaw } from 'vue-router'
import Login from '../pages/auth/Login.vue'

const authRoutes: RouteRecordRaw[] = [
    { path:"/login", component: Login }
]

export default authRoutes; 
