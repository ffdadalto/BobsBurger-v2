<template>
    <Titulo msg="Situações"></Titulo>
    <div class="container-fluid">
        <div class="card">
            <DataTable ref="dt" :value="situacoes" v-model:selection="selectedProducts" dataKey="id" :paginator="true"
                :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} situações"
                responsiveLayout="scroll">

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="id" header="Id" :sortable="true" style="min-width:12rem"></Column>
                <Column field="nome" header="Nome" :sortable="true" style="min-width:16rem"></Column>

            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import Titulo from '../components/Titulo.vue';
import api from '../api/ApiInstance';



const situacoes = reactive([]);
const selectedProducts = reactive([]);

onMounted(async () => {
    getSituacoes();
});

const getSituacoes = async () => {
    const response = await api.get('/situacao');
    situacoes.push(...response.data);
}

</script>