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
        <template v-if="listaSituacoesFitrada.length > 0">
            <DataTable :value="listaSituacoesFitrada" v-model:selection="selectedSituacoes" dataKey="id"
                :paginator="true" :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando de {first} a {last} de um total de {totalRecords} situações"
                responsiveLayout="scroll" class="p-datatable-sm" stripedRows :loading="loading">

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="id" header="Id" :sortable="true" style="min-width:12rem"></Column>
                <Column field="nome" header="Nome" :sortable="true" style="min-width:16rem"></Column>
                <Column field="cor" header="Cor">
                    <template #body="{ data }">
                        <span class="situacao-badge" :style="'background-color: #' + data.cor + ';'">{{ data.nome
                        }}</span>
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
        </template>
        <template v-else>
            <div class="alert alert-primary d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img"
                    aria-label="Warning:">
                    <path
                        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div>
                    Nenhuma situação encontrada!
                </div>
            </div>
        </template>

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

        <!-- Pop up deleção de uma unica situação selecionada -->
        <Dialog v-model:visible="deleteSituacaoDialog" :style="{ width: '450px' }" header="Confirmação" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="situacao">Você tem certeza que deseja apagar a Situação
                    <b>{{ situacao.nome }}</b>?</span>
            </div>
            <template #footer>
                <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteSituacaoDialog = false" />
                <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="deleteSituacao" />
            </template>
        </Dialog>

        <!-- Pop up deleção de varias situações selecionadas -->
        <Dialog v-model:visible="deleteSituacoesDialog" :style="{ width: '450px' }" header="Confirmação" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="situacao">Você tem certeza que deseja apagar as Situações
                    selecionadas?</span>
            </div>
            <template #footer>
                <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteSituacoesDialog = false" />
                <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="deleteSelectedSituacoes" />
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


let submitted = ref(false);
let loading = ref(false);

onMounted(() => {
    getAllSituacoes();
});

let listaSituacoesFitrada = ref([]);
let listaSituacoesOriginal = ref([]);
const getAllSituacoes = async () => {
    try {
        loading.value = true;
        const response = await api.get('/situacao');
        listaSituacoesOriginal.value = response.data;
        filtrar();
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

let toast = useToast();

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

                situacaoDialog.value = false; // Fecha o pop up
                situacao.value = {}; // Limpa o objeto

                getAllSituacoes(); // Refresh na lista
                filtrar(); // Verifica se tem filtro ativo

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

                situacaoDialog.value = false; // Fecha o pop up
                situacao.value = {}; // Limpa o objeto

                getAllSituacoes(); // Refresh na lista
                filtrar(); // Verifica se tem filtro ativo   

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

// *** DELEÇÃO ***
const deleteSituacaoDialog = ref(false);
const selectedSituacoes = ref([]);
const deleteSituacoesDialog = ref(false);

const confirmDeleteSelected = () => {
    if (selectedSituacoes.value.length == 1) {
        situacao.value = selectedSituacoes.value.shift();
        deleteSituacaoDialog.value = true; // Abre o pop up de deleção de uma unica Situação
    }
    else deleteSituacoesDialog.value = true; // Abre o pop up de deleção de varias Situações
};

const confirmDeleteSituacao = (obj) => {
    situacao.value = obj;
    deleteSituacaoDialog.value = true;
};

// Unico Selecionado
const deleteSituacao = async () => {
    try {
        loading.value = true;
        await api.delete(`/situacao/${situacao.value.id}`);

        toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: `Situação  ${situacao.value.nome} excluída do sistema`,
            life: 5000,
        });

        deleteSituacaoDialog.value = false;
        situacao.value = {};
        selectedSituacoes.value = [];

        getAllSituacoes(); // Refresh na lista
        filtrar(); // Verifica se tem filtro ativo

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
};

// Vários selecionado
const deleteSelectedSituacoes = async () => {
    try {
        loading.value = true;
        let situacoesIds = ref([]);

        // Pega os ids das Situações selecionadas para exclusão
        situacoesIds.value = selectedSituacoes.value.map(s => s.id);

        // Chama o delete passando o array de Ids
        const response = await api.delete('/situacoes', { data: situacoesIds.value });

        toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Situações excluídas do sistema",
            life: 5000,
        });

        deleteSituacoesDialog.value = false;
        selectedSituacoes.value = [];

        getAllSituacoes(); // Refresh na lista
        filtrar(); // Verifica se tem filtro ativo

    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Erro",
            detail: `Não foi possível excluir as Situações. Erro: ${error}`,
            life: 5000,
        });
    } finally {
        loading.value = false;
    }
};

// *** RADIO BUTTON ***
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