<script setup>
import { RouterView } from 'vue-router'
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
            <RouterView v-slot="{ Component }">
                <transition name="slide" mode="out-in">
                    <component :is="Component" :key="$route.path"></component>
                </transition>
            </RouterView>
        </div>
        <footer>
            <Rodape></Rodape>
        </footer>
    </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-2%);
}
</style>
