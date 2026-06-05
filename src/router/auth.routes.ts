import { type RouteRecordRaw } from 'vue-router'

const authRoutes: RouteRecordRaw[] = [
    {
        path:"/auth",
        component:() => import("../layouts/AuthLayout.vue"),
        meta:{
            requireNotAuth:true
        },
        children:[
            {
                path:"login",
                component:() => import("../pages/auth/Login.vue"),
            },
            {   
                path:"complete",
                component:() => import("../pages/auth/Register.vue"),
                meta:{ requireTokenAuthTemp:"complete" }
            },
            {
                path:"verification",
                component:() => import("../pages/auth/CheckoutEmail.vue"),
                meta:{ requireTokenAuthTemp:"checkout" }
            },
            
        ]
    }
]

export default authRoutes; 
