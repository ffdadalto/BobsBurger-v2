<template>
    <Titulo msg="Pagina Principal"></Titulo>
    <h5>Basic</h5>
    <Button label="Show" icon="pi pi-external-link" @click="openBasic" />
    <Dialog header="Header" v-model:visible="displayBasic" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <template #footer>
            <Button label="No" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
            <Button label="Yes" icon="pi pi-check" @click="closeBasic" autofocus />
        </template>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import Titulo from '../components/Titulo.vue';

const displayBasic = ref(false);

const openBasic = () => {
    displayBasic.value = true;
};
const closeBasic = () => {
    displayBasic.value = false;
};

</script>