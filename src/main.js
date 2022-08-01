import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';

import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css' //icons

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);


app.mount('#app')
