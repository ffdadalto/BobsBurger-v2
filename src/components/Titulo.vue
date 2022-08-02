<template>
    <h1 class="mb-1">{{ msg }}</h1>
    <hr class="mx-0 mt-1 mb-3">
</template>

<script setup>
defineProps({
    msg: String,
})
</script>

<style scoped>
h1{
    color: #565656;
}

hr{
    color: #658fa6;
}
</style>