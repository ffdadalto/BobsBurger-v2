<template>
    <div class="menu-lateral">
        <ul>
            <li>
                <router-link :to="{ name: 'Home' }" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'active']" role="link" @click="navigate">
                        <i class="pi pi-home"></i>Home
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Pedido' }" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'active']" role="link" @click="navigate">
                        <i class="pi pi-list"></i>Pedidos
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Situacao' }" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'active']" role="link" @click="navigate">
                        <i class="pi pi-filter"></i>Situações
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Item' }" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'active']" role="link" @click="navigate">
                        <i class="pi pi-shopping-cart"></i>Itens
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Cliente' }" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'active']" role="link" @click="navigate">
                        <i class="pi pi-user"></i>Clientes
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'FormaPagamento' }" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'active']" role="link" @click="navigate">
                        <i class="pi pi-dollar"></i>Formas de Pagamento
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Bairro' }" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'active']" role="link" @click="navigate">
                        <i class="pi pi-map-marker"></i>Bairros
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Cidade' }" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'active']" role="link" @click="navigate">
                        <i class="pi pi-compass"></i>Cidades
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Sobre' }" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'active']" role="link" @click="navigate">
                        <i class="pi pi-info-circle"></i>Sobre
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
</script>

<style lang="css" scoped>
ul {
    list-style: none;
    padding: 0;
    font-size: 1.2rem;
}

.div-menu {
    text-decoration: none;
    font-weight: 300;
    height: 100%;
    width: 100%;
    color: var(--cor-letra-menu);
    cursor: pointer;
    padding: 20px 30px;
    border-bottom: 1px solid #84a8bd99;
}

.div-menu>i {
    margin-right: 10px;
}

.div-menu:hover {
    background-color: #416272;
}

/* .router-link-active {
    
} */

.active {
    background-color: #416272;
    /* text-decoration: underline; */
    font-weight: 600;
    color: #ffffff;
}
</style>