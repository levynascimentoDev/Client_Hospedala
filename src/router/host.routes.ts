import type { RouteRecordRaw } from "vue-router";


const hostRoutes: RouteRecordRaw[] = [
    {
        path:"/host",
        component:() => import("../layouts/DefaultLayout.vue"),
        children:[
            {
                path:"create/select-type-place",
                component:() => import("../pages/host/create/SelectYourPlace.vue/index.js")
            },
            {
                path:"create/place-type",
                component:() => import("../pages/host/create/PlaceType.vue")
            },
            {
                path:"create/acomodations-details",
                component:() => import("../pages/host/create/AcomodationsDetails.vue")
            },
            {
                path:"create/acomodation-pictures",
                component:() => import('../pages/host/create/AcomodationPictures.vue')
            }
        ]
    }
]

export default hostRoutes;
