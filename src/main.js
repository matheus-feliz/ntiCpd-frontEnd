import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import moment from 'moment';
import { vMaska } from "maska"

const app = createApp(App);
app.use(store);
app.use(router);
app.directive("maska", vMaska);
app.config.globalProperties.$moment=moment;
app.config.globalProperties.$moment.locale('pt-br');
app.mount('#app');
