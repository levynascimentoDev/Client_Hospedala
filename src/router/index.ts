import { createRouter, createWebHistory  } from "vue-router";
import authRoutes from "./auth.routes";
import hostRoutes from "./host.routes.ts";


const router = createRouter({
    routes:[
        { 
            path:"/", 
            component:() => import("../layouts/MainLayout.vue"),
            children:[
                {
                    path:"",
                    component:() => import("../pages/index.vue")
                }                
            ],
        },
        
        ...authRoutes, 
        ...hostRoutes
    ],
    history:createWebHistory()
})

export default router;