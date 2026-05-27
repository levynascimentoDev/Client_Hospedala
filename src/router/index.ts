import { createRouter, createWebHistory  } from "vue-router";
import authRoutes from "./auth.routes";
import Home from "../pages/home/index.vue";
import hostRoutes from "./host.routes";
import Teste from "../pages/teste.vue";


const router = createRouter({
    routes:[
        { path:"/", component:Home },
        { path:"/teste", component:Teste },
        ...authRoutes, 
        ...hostRoutes
    ],
    history:createWebHistory()
})

export default router;