<template>
    <div class="menu-lateral">
        <ul>
            <li>
                <router-link to="/" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'router-link-active']" role="link" @click="navigate">
                        <i class="pi pi-home"></i>Home
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/Pedido" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'router-link-active']" role="link" @click="navigate">
                        <i class="pi pi-list"></i>Pedidos
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/Situacao" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'router-link-active']" role="link" @click="navigate">
                        <i class="pi pi-filter"></i>Situações
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/Item" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'router-link-active']" role="link" @click="navigate">
                        <i class="pi pi-shopping-cart"></i>Itens
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/Cliente" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'router-link-active']" role="link" @click="navigate">
                        <i class="pi pi-user"></i>Clientes
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/FormaPagamento" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'router-link-active']" role="link" @click="navigate">
                        <i class="pi pi-dollar"></i>Formas de Pagamento
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/Bairro" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'router-link-active']" role="link" @click="navigate">
                        <i class="pi pi-map-marker"></i>Bairros
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/Cidade" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'router-link-active']" role="link" @click="navigate">
                        <i class="pi pi-compass"></i>Cidades
                    </div>
                </router-link>
            </li>            
            <li>
                <router-link to="/Sobre" custom v-slot="{ navigate, isActive }">
                    <div :class="['div-menu', isActive && 'router-link-active']" role="link" @click="navigate">
                        <i class="pi pi-info-circle"></i>Sobre
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
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

.router-link-active {
    background-color: #416272;
}
</style>