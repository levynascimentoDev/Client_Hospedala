import { type RouteRecordRaw } from 'vue-router'

const authRoutes: RouteRecordRaw[] = [
    {
        path:"/auth",
        component:() => import("../layouts/AuthLayout.vue"),
        children:[
            {
                path:"/login",
                component:() => import("../pages/auth/Login.vue")
            },
            {
                path:"/login/complete",
                component:() => import("../pages/auth/Register.vue")
            },
            {
                path:"/login/verification",
                component:() => import("../pages/auth/CheckoutEmail.vue")
            },
            
        ]
    }
]

export default authRoutes; 
