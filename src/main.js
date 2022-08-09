import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import '@/assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css' //icons

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import Titulo from '@/components/Titulo.vue';


import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toolbar from 'primevue/toolbar';
import RadioButton from 'primevue/radiobutton';
import InputText from 'primevue/inputtext';
import ColorPicker from 'primevue/colorpicker';
import Tooltip from 'primevue/tooltip';
import Toast from 'primevue/toast';
import AutoComplete from 'primevue/autocomplete';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);
app.use(ToastService);

app.component('Titulo', Titulo); // Registrando o componente globalmente

app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Toolbar', Toolbar);
app.component('RadioButton', RadioButton);
app.component('InputText', InputText);
app.component('ColorPicker', ColorPicker);
app.component('Toast', Toast);
app.component('AutoComplete', AutoComplete);
app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);

app.directive('tooltip', Tooltip);


app.mount('#app')
