<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Cabecalho from '@/components/Cabecalho.vue'
import MenuLateral from '@/components/MenuLateral.vue'
import Rodape from '@/components/Rodape.vue'
</script>

<template>

    <div class="estrutura-portal">
        <header>
            <Cabecalho></Cabecalho>
        </header>
        <aside>
            <MenuLateral></MenuLateral>
        </aside>
        <div class="content">
            <RouterView />
        </div>
        <footer>
            <Rodape></Rodape>
        </footer>
    </div>
</template>

<style scoped>
</style>
