import type { RouteRecordRaw } from "vue-router";


const hostRoutes: RouteRecordRaw[] = [
    {
        path:"/host",
        component:() => import("../layouts/DefaultLayout.vue"),
        children:[
            {
                path:"create/select-type-place",
                component:() => import("../pages/hostSession/SelectYourPlace.vue")
            },
            {
                path:"create/place-type",
                component:() => import("../pages/hostSession/PlaceType.vue")
            },
            {
                path:"create/acomodations-details",
                component:() => import("../pages/hostSession/AcomodationsDetails.vue")
            }
        ]
    }
]

export default hostRoutes;
