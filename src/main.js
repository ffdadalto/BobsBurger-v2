import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';

import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.min.css' //FlexGrid


import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.component('Dialog', Dialog);
app.component('Button', Button);

app.mount('#app')
