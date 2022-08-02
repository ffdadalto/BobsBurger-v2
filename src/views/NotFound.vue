<template>
    <div>
        <div class="my-5 not-found">
            <h1 class="text-center">
                Pagina não encontrada.
            </h1>
            <p class="text-center">
                Oops, nós não conseguimos encontrar a pagina. Tente novamente!
            </p>
        </div>
        <div class="d-flex justify-content-center align-items-center my-5">
            <i class="pi pi-ban not-found-icon"></i>
        </div>
        <p class="text-center">
            <router-link to="/Home" class="text-decoration-none fw-bold">Voltar para a pagina principal</router-link>
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