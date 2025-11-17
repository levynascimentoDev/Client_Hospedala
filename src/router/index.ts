import { createRouter, createWebHistory  } from "vue-router";
import authRoutes from "./auth.routes";
import index from "../pages/index.vue";
import Teste from "../pages/Teste.vue";


const router = createRouter({
    routes:[
        { path:"/", component:index },
        { path:"/t", component:Teste },
        ...authRoutes
    ],
    history:createWebHistory()
})

export default router;