import type { RouteRecordRaw } from "vue-router";


const hostRoutes: RouteRecordRaw[] = [
    {
        path:"/accommodation",
        component:() => import("../layouts/accommodation/CreateLayout.vue"),
        children:[
            {
                path:"create",
                component:() => import('../pages/accommodation/create/Apresentation.vue')
            },
            {
                path:"create/:id/accommodation-type",
                component:() => import("../pages/accommodation/create/SelectTypePropety.vue"),
                meta:{ AccomodationIncomplete:true }
            },
            {
                path:"create/:id/space-type",
                component:() => import("../pages/accommodation/create/SelectSpaceType.vue"),
                meta:{ AccomodationIncomplete:true }
            },
            {
                path:"create/:id/services",
                component:() => import("../pages/accommodation/create/Services.vue"),
                meta:{ AccomodationIncomplete:true }
            },
            {
                path:"create/:id/details",
                component:() => import("../pages/accommodation/create/Details.vue"),
                meta:{ AccomodationIncomplete:true }
            },
            {
                path:"create/:id/pictures",
                component:() => import('../pages/accommodation/create/SelectPictures.vue'),
                meta:{ AccomodationIncomplete:true }
            },
            {
                path:"create/:id/address",
                component:() => import('../pages/accommodation/create/SelectAddress.vue'),
                meta:{ AccomodationIncomplete:true }
            }
        ]
    }
]

export default hostRoutes;
