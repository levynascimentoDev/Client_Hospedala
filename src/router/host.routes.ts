import type { RouteRecordRaw } from "vue-router";


const hostRoutes: RouteRecordRaw[] = [
    {
        path:"/accommodation",
        component:() => import("../layouts/accommodation/CreateLayout.vue"),
        children:[
            {
                path:"create/:id/accommodation-type",
                component:() => import("../pages/accommodation/create/SelectTypePropety.vue")
            },
            {
                path:"create/:id/space-type",
                component:() => import("../pages/accommodation/create/SelectSpaceType.vue")
            },
            {
                path:"create/:id/services",
                component:() => import("../pages/accommodation/create/Services.vue")
            },
            {
                path:"create/:id/details",
                component:() => import("../pages/accommodation/create/Details.vue")
            },
            {
                path:"create/:id/pictures",
                component:() => import('../pages/accommodation/create/SelectPictures.vue')
            },
            {
                path:"create/:id/address",
                component:() => import('../pages/accommodation/create/SelectAddress.vue')
            }
        ]
    }
]

export default hostRoutes;
