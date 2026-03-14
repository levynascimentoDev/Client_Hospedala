import { createRouter, createWebHistory  } from "vue-router";
import authRoutes from "./auth.routes";
import Home from "../pages/home/index.vue";



const router = createRouter({
    routes:[
        { path:"/", component:Home },
        ...authRoutes
    ],
    history:createWebHistory()
})

export default router;