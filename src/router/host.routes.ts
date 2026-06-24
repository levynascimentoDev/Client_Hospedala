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
                path:"create/:id/propety",
                component:() => import("../pages/accommodation/create/Propety.vue"),
                meta:{ AccomodationIncomplete:true }
            },
            {
                path:"create/:id/space",
                component:() => import("../pages/accommodation/create/SpaceType.vue"),
                meta:{ AccomodationIncomplete:true }
            },
            {
                path:"create/:id/services",
                component:() => import("../pages/accommodation/create/Services.vue"),
                meta:{ AccomodationIncomplete:true }
            },
            {
                path:"create/:id/address",
                component:() => import('../pages/accommodation/create/Location.vue'),
                meta:{ AccomodationIncomplete:true }
            },
            {
                path:"create/:id/details",
                component:() => import("../pages/accommodation/create/Details.vue"),
                meta:{ AccomodationIncomplete:true }
            },
            {
                path:"create/:id/pictures",
                component:() => import('../pages/accommodation/create/Photos.vue'),
                meta:{ AccomodationIncomplete:true }
            },
            {
                path:"create/:id/rules",
                component:() => {},
                meta:{ AccomodationIncomplete:true }
            },
            {
                path:"create/:id/finish",
                component:() => {},
                meta:{ AccomodationIncomplete:true }
            }
        ]
    }
]

export default hostRoutes;
