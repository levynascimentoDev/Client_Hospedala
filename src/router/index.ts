import { createRouter, createWebHistory  } from "vue-router";
import authRoutes from "./auth.routes";
import hostRoutes from "./host.routes.ts";
import { useUserStore } from "../stores/users.ts";
import { useAuthStore } from "../stores/auth.ts";
import { useAccommodationWizardStore } from "../stores/accomodation.ts";
import { paramIdSchema } from "../schemas/accomodation.schemas.ts";



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
    await userStore.fetchUser();

    if (to.meta.requireNotAuth && userStore.user) return next("/");
    if (to.meta.requireAuth && !userStore.user) return next("/auth/login"); 

    if (to.meta.requireTokenAuthTemp) {
        const store = useAuthStore()
        await store.verifyTokenTemp()
        if (!store.tempPayload || to.meta.requireTokenAuthTemp != store.tempPayload.action) return next('/');
    }

    if (to.meta.AccomodationIncomplete) {
        try {            
            const store = useAccommodationWizardStore();
            const { id } = paramIdSchema.parse(to.params);
            await store.getAccommodation(id);
        
            if (!store.accommodation) return next(from.path)
        } catch (err) {
            return next(from.path);
        }
        
    }
    

    next();
        
})

export default router;