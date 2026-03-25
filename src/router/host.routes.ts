import type { RouteRecordRaw } from "vue-router";
import SelectYourPlace from "../pages/TemporarySession/SelectYourPlace.vue";
import PlaceType from "../pages/TemporarySession/PlaceType.vue";

const hostRoutes: RouteRecordRaw[] = [
        {path: "/select-type-place", component: SelectYourPlace},
        {path: "/place-type", component: PlaceType},
]

export default hostRoutes;
