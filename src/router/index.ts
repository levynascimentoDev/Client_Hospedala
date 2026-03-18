import { createRouter, createWebHistory  } from "vue-router";
import authRoutes from "./auth.routes";
import Home from "../pages/home/index.vue";
import hostRoutes from "./host.routes";



const router = createRouter({
    routes:[
        { path:"/", component:Home },
        ...authRoutes, 
        ...hostRoutes
    ],
    history:createWebHistory()
})

export default router;