<template>
    <div>
        <div class="not-found">
            <h1 class="text-center">
                Pagina não encontrada.
            </h1>
            <p class="text-center">
                Oops, nós não conseguimos encontrar a pagina. Tente novamente!
            </p>
        </div>
        <div class="h-50 d-flex justify-content-center align-items-center">
            <i class="pi pi-ban not-found-icon"></i>
        </div>
        <p class="text-center">
            <router-link to="/" class="text-decoration-none fw-bold">Voltar para a pagina principal</router-link>
        </p>
    </div>
</template>

<style scoped>
.not-found {
    color: #565656;
}

.not-found-icon {
    font-size: 200px;
    color: #fa20198a;
}
</style>