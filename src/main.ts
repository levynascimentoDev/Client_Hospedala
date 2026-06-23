import 'bootstrap-icons/font/bootstrap-icons.css';
import vuetify from './plugins/vuetify.ts';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import './style.css';   

import Aura from '@primeuix/themes/aura'





export const app = createApp(App);

app.use(router);
app.use(vuetify)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(createPinia())
app.mount('#app');


