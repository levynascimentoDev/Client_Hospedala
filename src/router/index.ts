import { createRouter, createWebHistory  } from "vue-router";
import authRoutes from "./auth.routes";
import index from "../pages/index.vue";


const router = createRouter({
    routes:[
        { path:"/", component:index },
        ...authRoutes
    ],
    history:createWebHistory()
})

export default router;