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
                    <span class="situacao-badge" :style="'background-color: #' + data.cor + ';'">{{ data.nome }}</span>
                </template>
            </Column>
            <Column field="ativo" header="Ativo">
                <template #body="{ data }">
                    <i class="pi pi-check-circle ativo" v-if="data.ativo"></i>
                    <i class="pi pi-ban inativo" v-else></i>
                </template>
            </Column>
            <Column :exportable="false" style="min-width: 8rem" header="Ações">
                <template #body="{ data }">
                    <Button icon="pi pi-pencil" class="p-button-rounded me-2 editar" @click="editSituacao(data)"
                        v-tooltip.top="'Editar'" />
                    <Button icon="pi pi-trash" class="p-button-rounded excluir" @click="confirmDeleteSituacao(data)"
                        v-tooltip.top="'Excluir'" />
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
                        <RadioButton id="ativo" name="situacao" :value="true" v-model="situacao.ativo" />
                        <label>Ativo</label>
                    </div>
                    <div class="field-radiobutton col-4">
                        <RadioButton id="inativo" name="situacao" :value="false" v-model="situacao.ativo" />
                        <label>Inativo</label>
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeNewDialog" />
                <Button label="Salvar" icon="pi pi-check" class="p-button-text" @click="salvar" />
            </template>
        </Dialog>
        <Toast position="top-right" />
    </div>
</template>

<script setup>
import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import Titulo from '../components/Titulo.vue';
import api from '../api/ApiInstance';
import { useToast } from "primevue/usetoast";

onMounted(async () => {
    getAllSituacoes();
});

let listaSituacoesFitrada = ref([]);
let listaSituacoesOriginal = ref([]);
const getAllSituacoes = async () => {
    const response = await api.get('/situacao');
    listaSituacoesOriginal.value = response.data;
    filtrar();
};

let toast = useToast();

const selectedProducts = reactive([]);
const selectedSituacoes = reactive([]);

let submitted = ref(false);
let loading = ref(false);

let situacao = ref({});
let situacaoDialog = ref(false);
const editSituacao = (obj) => {
    situacao.value = obj;
    situacaoDialog.value = true;
};


const openNewDialog = async () => {
    situacao.value = {};
    submitted.value = false;
    situacaoDialog.value = true;
};



const closeNewDialog = async () => {
    situacaoDialog.value = false;
    submitted.value = false;
};


const salvar = async () => {

    submitted.value = true;
    if (situacao.value.nome.trim() && situacao.value.cor) {
        if (situacao.value.id) {
            // Caso o objeto vier com um id é edição, caso não vier, é cadastro.
            try {
                loading.value = true;
                const response = await api.put(`/situacao/${situacao.value.id}`, situacao.value);
                situacao.value = response.data
                
                toast.add({
                    severity: "success",
                    summary: "Sucesso",
                    detail: `Situação ${situacao.value.nome} atualizada com sucesso`,
                    life: 5000,
                });

                getAllSituacoes(); // Refresh na lista

                filtrar();
                situacaoDialog.value = false; // Fecha o pop up
                situacao.value = {}; // Limpa o objeto
            } catch (error) {                
                toast.add({
                    severity: "error",
                    summary: "Erro",
                    detail: `Não foi possível atualizar a Situacao ${situacao.value.nome}. Erro: ${error}`,
                    life: 5000,
                });
            } finally {
                loading.value = false;
            }
        } else {
            // Cadastro
            try {
                loading.value = true;
                const response = await api.post('/situacao', situacao.value);
                situacao.value = response.data
                
                toast.add({
                    severity: "success",
                    summary: "Sucesso",
                    detail: `Situação ${situacao.value.nome} cadastrada com sucesso`,
                    life: 5000,
                });

                listaSituacoesOriginal.value.push(situacao.value); // Adidiona a nova situação a lista

                filtrar();
                situacaoDialog.value = false; // Fecha o pop up
                situacao.value = {}; // Limpa o objeto

            } catch (error) {
                console.error(error);
                toast.add({
                    severity: "error",
                    summary: "Erro no cadastro",
                    detail: `Não foi possível cadastrar a Situação ${situacao.value.nome}. Erro: ${error}`,
                    life: 5000,
                });
            } finally {
                loading.value = false;
            }
        }
    }
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
<style scoped>
.editar {
    color: white;
    background: #ffc107;
    border: #ffc107;
}

td>button.editar:hover {
    background: #e0a100;
    border: #e0a100;
}

.excluir {
    color: white;
    background: #dc3545;
    border: #dc3545;
}

td>button.excluir:hover {
    background: #ad2626;
    border: #ad2626;
}
</style>