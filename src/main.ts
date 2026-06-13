import 'bootstrap-icons/font/bootstrap-icons.css';
import vuetify from './plugins/vuetify.ts';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import './style.css';   


export const app = createApp(App);

app.use(router);
app.use(vuetify)
app.use(createPinia())
app.mount('#app');


