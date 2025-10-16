import { createRouter, createWebHistory  } from "vue-router";
import Home from "../pages/Home.vue";
import index from '../pages/index.vue';
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Checkout from "../pages/Checkout.vue";
import NotFound from "../pages/NotFound.vue";
import CompleteCheckout from "../pages/CompleteCheckout.vue";
import setName from '../pages/setName.vue'
import ForgotPassword from "../pages/forgotPassword.vue";
import setNewPassoword  from '../pages/setNewPassword.vue'

const router = createRouter({
    routes:[
        { path:"/", component:index },
        { path:"/home", component: Home },
        { path:"/login", component:Login },
        { path:"/register", component:Register },
        { path:"/register/set-username/:code", component:setName },
        { path:"/register/complete/:code", component:CompleteCheckout },
        { path:"/auth/checkout/:type/:code", component:Checkout },
        { path:"/login/forgot-password/", component:ForgotPassword },
        { path:"/login/forgot-password/set-password/:code", component:setNewPassoword },
        { path:"/:catchAll(.*)", component: NotFound },
    ],
    history:createWebHistory()
})

export default router;