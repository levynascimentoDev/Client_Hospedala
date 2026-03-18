import type { RouteRecordRaw } from "vue-router";
import SelectYourPlace from "../pages/TemporarySession/SelectYourPlace.vue";

const hostRoutes: RouteRecordRaw[] = [
    {
        path: "/select-type-place",
        component: SelectYourPlace
    }
]

export default hostRoutes;
