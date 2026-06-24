import { createRouter, createWebHistory  } from "vue-router";
import authRoutes from "./auth.routes";
import hostRoutes from "./host.routes.ts";
import { useUserStore } from "../stores/users.ts";
import { useAuthStore } from "../stores/auth.ts";



const router = createRouter({
    routes:[
        { 
            path:"/", 
            component:() => import("../layouts/MainLayout.vue"),
            children:[
                {
                    path:"",
                    component:() => import("../pages/index.vue")
                },
                {
                    path:"query",
                    component:() => import("../pages/index.vue"),
                    beforeEnter:(to) => {
                        if (!to.query.location) return '/'
                    }
                }
            ],
    
        },
        ...authRoutes, 
        ...hostRoutes
    ],
    history:createWebHistory()
})


router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    // await userStore.fetchUser();

    if (to.meta.requireNotAuth && userStore.user) return next("/");
    if (to.meta.requireAuth && !userStore.user) return next("/login"); 

    if (to.meta.requireTokenAuthTemp) {
        const authStore = useAuthStore()
        const state = await authStore.fetchTokenVerify()
        if (!state || to.meta.requireTokenAuthTemp !== state) return next(from.path);
    }

    // if (to.meta.AccomodationIncomplete) {
    //     const accomodationStore = useAccommodationStore();

    //     const { id } = paramCreateSchema.parse(to.params);
    //     await accomodationStore.fetchAcomodation(id)    
    //     if (!accomodationStore.accomodation || accomodationStore.accomodation.complete) return next('/') 
        
    // }
    

    next();
        
})

export default router;