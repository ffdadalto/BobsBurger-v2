<template>
    <Titulo msg="Situações"></Titulo>
    <div class="container-fluid">
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Novo" icon="pi pi-plus" class="p-button-success me-2" @click="openNewDialog" />
                <Button label="Excuir" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected"
                    :disabled="!selectedSituacoes || !selectedSituacoes.length" />
            </template>
            <template #end>
                <div class="ativo-radio-button">
                    <div class="ativo-radio-button-item">
                        <RadioButton value="todos" v-model="filtro" />
                        <label>Todos</label>
                    </div>
                    <div class="ativo-radio-button-item">
                        <RadioButton value="ativos" v-model="filtro" />
                        <label>Ativos</label>
                    </div>
                    <div class="ativo-radio-button-item">
                        <RadioButton value="inativos" v-model="filtro" />
                        <label>Inativos</label>
                    </div>
                </div>
            </template>
        </Toolbar>

        <DataTable :value="listaSituacoesFitrada" v-model:selection="selectedProducts" dataKey="id" :paginator="true"
            :rows="10"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} situações"
            responsiveLayout="scroll">

            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="id" header="Id" :sortable="true" style="min-width:12rem"></Column>
            <Column field="nome" header="Nome" :sortable="true" style="min-width:16rem"></Column>
            <Column field="cor" header="Cor">
                <template #body="{ data }">
                    <span
                        class="situacao-badge"
                        :style="'background-color: #' + data.cor + ';'"
                        >{{ data.nome }}</span
                    >
                </template></Column
            >
            <Column field="ativo" header="Ativo">
                <template #body="{ data }">
                    <i class="pi pi-check-circle ativo" v-if="data.ativo"></i>
                    <i class="pi pi-ban inativo" v-else></i>
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="situacaoDialog" :style="{ width: '550px' }" header="Cadastro de Situações"
            :modal="true" class="p-fluid">
            <div class="formgrid grid">
                <div class="field col-12">
                    <label>Nome</label>
                    <InputText v-model.trim="situacao.nome" required="true" autofocus :class="{
                        'p-invalid': submitted && !situacao.nome,
                    }" />
                    <small class="p-error" v-if="submitted && !situacao.nome">Campo Obrigatório.</small>
                </div>
                <div class="field col-6">
                    <label style="display: block">Cor</label>
                    <ColorPicker v-model.trim="situacao.cor" :inline="true" required="true" :class="{
                        'p-invalid': submitted && !situacao.cor,
                    }" />
                    <small class="p-error" v-if="submitted && !situacao.cor">Campo Obrigatório.</small>
                </div>
                <div class="field col-6">
                    <label class="mb-3">Situação</label>
                    <div class="field-radiobutton col-4">
                        <RadioButton id="ativo" name="situacao" value="1" v-model="situacao.ativo" />
                        <label>Ativo</label>
                    </div>
                    <div class="field-radiobutton col-4">
                        <RadioButton id="inativo" name="situacao" value="0" v-model="situacao.ativo" />
                        <label>Inativo</label>
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeNewDialog" />
                <Button label="Salvar" icon="pi pi-check" class="p-button-text" @click="salvar" />
            </template>
        </Dialog>

    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import Titulo from '../components/Titulo.vue';
import api from '../api/ApiInstance';




const selectedProducts = reactive([]);
const selectedSituacoes = reactive([]);

let situacao = reactive({});
let submitted = ref(false);


onMounted(async () => {
    getAllSituacoes();
});


let listaSituacoesFitrada = ref([]);
let listaSituacoesOriginal = ref([]);
const getAllSituacoes = async () => {
    const response = await api.get('/situacao');
    listaSituacoesOriginal.value = response.data;
    listaSituacoesFitrada.value = listaSituacoesOriginal.value;
};


let situacaoDialog = ref(false);

const openNewDialog = async () => {
    situacao = {};
    situacao.ativo = "1";
    submitted.value = false;
    situacaoDialog.value = true;
};

const salvar = async () => {
    console.log('Passou por aqui!');
}

const closeNewDialog = async () => {
    situacaoDialog.value = false;
    submitted.value = false;
};



const confirmDeleteSelected = async () => {
    // // Abre o pop up de deleção de uma unica Situação
    // if (this.selectedSituacoes.length == 1) {
    //     this.situacao = this.selectedSituacoes.shift();
    //     this.deleteSituacaoDialog = true;
    // } // Abre o pop up de delação de varias Situações
    // else this.deleteSituacoesDialog = true;
};

const filtro = ref('todos');

watch(filtro, () => {
    filtrar();
});

const filtrar = () => {
    switch (filtro.value) {
        case "todos":            
            listaSituacoesFitrada.value = listaSituacoesOriginal.value;            
            break;
        case "ativos":            
            listaSituacoesFitrada.value = listaSituacoesOriginal.value.filter(s => s.ativo);
            break;
        case "inativos":            
            listaSituacoesFitrada.value = listaSituacoesOriginal.value.filter(s => !s.ativo);
            break;
        default:
            listaSituacoesFitrada.value = listaSituacoesOriginal.value;     
            break;
    }
};


</script>