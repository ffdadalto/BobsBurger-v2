<template>
    <Titulo msg="Pagina Principal"></Titulo>
    <button class="btn btn-primary" data-bs-target="#collapseTarget" data-bs-toggle="collapse">
        Bootstrap collapse
    </button>
    <div class="collapse py-2" id="collapseTarget">
        This is the toggle-able content!
    </div>
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