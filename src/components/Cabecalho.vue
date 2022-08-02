<template>
    <div class="header">
        <router-link :to="{ name: 'Home' }" custom v-slot="{ navigate }">
            <div class="site-logo" role="link" @click="navigate">
                <img src="../assets/logo.png" alt="Burguer" />
            </div>
        </router-link>
        <div class="site-admin">
            <div class="login">
                <h4>Login</h4>
                <i class="pi pi-sign-in"></i>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--header-height);
}

.site-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 450px;
    cursor: pointer;
}

.site-admin {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    color: var(--cor-letra-admin);
    font-size: 16px;
}

.login {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: #fa2019;
    padding: 14px;
    color: var(--cor-letra-admin);
    margin-right: 10px;
    cursor: pointer;
    border-radius: 2px;
    -webkit-box-shadow: -4px 3px 3px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -4px 3px 3px 0px rgba(0, 0, 0, 0.75);
    box-shadow: -4px 3px 3px 0px rgba(0, 0, 0, 0.75);
}

.login:hover {
    background-color: #af0600;
    color: white;
}

.login>h4 {
    margin: 0;
}

.login>h4,
.login>i {
    font-size: 1.2rem;
    font-weight: 600;
}

.pi {
    margin-left: 10px;
}
</style>