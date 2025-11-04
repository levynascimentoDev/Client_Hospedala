import { createRouter, createWebHistory  } from "vue-router";
import authRoutes from "./auth.routes";


const router = createRouter({
    routes:[
        ...authRoutes
    ],
    history:createWebHistory()
})

export default router;