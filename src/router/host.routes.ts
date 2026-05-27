import type { RouteRecordRaw } from "vue-router";
import SelectYourPlace from "../pages/TemporarySession/SelectYourPlace.vue";
import PlaceType from "../pages/TemporarySession/PlaceType.vue";
import AcomodationsDetails from "../pages/hostSession/pages/AcomodationsDetails.vue";

const hostRoutes: RouteRecordRaw[] = [
        { path: "/select-type-place", component: SelectYourPlace },
        { path: "/place-type", component: PlaceType },
        { path:"/acomodations-details", component:AcomodationsDetails }
]

export default hostRoutes;
