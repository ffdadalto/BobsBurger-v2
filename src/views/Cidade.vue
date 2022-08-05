<template>
    <div>
        <Titulo :msg="objPlural"></Titulo>
        <div class="container-fluid">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Novo" icon="pi pi-plus" class="p-button-success me-2" @click="openNewDialog" />
                    <Button label="Excuir" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected"
                        :disabled="!selectedObjs || !selectedObjs.length" />
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
            <template v-if="listaFitrada.length > 0">
                <DataTable :value="listaFitrada" v-model:selection="selectedObjs" dataKey="id" :paginator="true"
                    :rows="10"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    :currentPageReportTemplate="`Mostrando de {first} a {last} de um total de {totalRecords} ${objPlural}`"
                    responsiveLayout="scroll" class="p-datatable-sm" stripedRows :loading="loading">

                    <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                    <Column field="id" header="Id" :sortable="true" style="min-width:8rem"></Column>
                    <Column field="nome" header="Nome" :sortable="true" style="min-width:8rem"></Column>
                    <Column field="qtdBairros" header="Qtd Bairros" :sortable="true" style="min-width:8rem"></Column>
                    <Column field="ativo" header="Ativo" style="min-width:8rem">
                        <template #body="{ data }">
                            <i class="pi pi-check-circle ativo" v-if="data.ativo"></i>
                            <i class="pi pi-ban inativo" v-else></i>
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width: 8rem" header="Ações">
                        <template #body="{ data }">
                            <Button icon="pi pi-pencil" class="p-button-rounded me-2 editar" @click="editObj(data)"
                                v-tooltip.top="'Editar'" />
                            <Button icon="pi pi-trash" class="p-button-rounded excluir" @click="confirmDeleteObj(data)"
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
                        {{ `Nenhum ${objSingular} encontrado!` }}
                    </div>
                </div>
            </template>

            <Dialog v-model:visible="objDialog" :style="{ width: '550px' }" :header="`Cadastro de ${objSingular}`"
                :modal="true" class="p-fluid">
                <div class="row">
                    <div class="field col-6">
                        <label>Nome</label>
                        <InputText v-model.trim="obj.nome" required="true" autofocus :class="{
                            'p-invalid': submitted && !obj.nome,
                        }" />
                        <small class="p-error" v-if="submitted && !obj.nome">Campo Obrigatório.</small>
                    </div>
                    <div class="field col-6">
                        <label class="mb-3">Situação</label>
                        <div class="field-radiobutton col-4">
                            <RadioButton id="ativo" :name="objSingular" :value="true" v-model="obj.ativo" />
                            <label>Ativo</label>
                        </div>
                        <div class="field-radiobutton col-6">
                            <RadioButton id="inativo" :name="objSingular" :value="false" v-model="obj.ativo" />
                            <label>Inativo</label>
                        </div>
                    </div>
                </div>

                <template #footer>
                    <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeNewDialog" />
                    <Button label="Salvar" icon="pi pi-check" class="p-button-text" @click="salvar" />
                </template>
            </Dialog>

            <!-- Pop up deleção de um unico objeto selecionada -->
            <Dialog v-model:visible="deleteObjDialog" :style="{ width: '450px' }" header="Confirmação" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="obj">{{ `Você tem certeza que deseja apagar a ${objSingular}` }}
                        <b>{{ obj.nome }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteObjDialog = false" />
                    <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="deleteObj" />
                </template>
            </Dialog>

            <!-- Pop up deleção de varios obhetos selecionados -->
            <Dialog v-model:visible="deleteObjsDialog" :style="{ width: '450px' }" header="Confirmação" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="obj">{{ `Você tem certeza que deseja apagar as ${objPlural}
                    selecionadas?`}}</span>
                </div>
                <template #footer>
                    <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteObjsDialog = false" />
                    <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="deleteSelectedObjs" />
                </template>
            </Dialog>

            <Toast position="top-right" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import api from '../api/ApiInstance';
import { useToast } from "primevue/usetoast";


let toast = useToast();
let submitted = ref(false);
let loading = ref(false);
const objSingular = ref('cidade');
const objPlural = ref('cidades');

onMounted(() => {
    getAll();
});

let listaFitrada = ref([]);
let listaOriginal = ref([]);
const getAll = async () => {
    try {
        loading.value = true;
        const response = await api.get(`/${objSingular.value}`);
        listaOriginal.value = response.data;
        filtrar();
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

// *** CADASTRO E EDIÇÃO ***

let obj = ref({});
let objDialog = ref(false);
const editObj = (objeto) => {
    obj.value = objeto;
    objDialog.value = true;
};

const openNewDialog = async () => {
    obj.value = {};
    submitted.value = false;
    objDialog.value = true;
};

const closeNewDialog = async () => {
    objDialog.value = false;
    submitted.value = false;
};

const salvar = async () => {
    submitted.value = true;
    if (obj.value.nome.trim()) {
        if (obj.value.id) {
            // Caso o objeto vier com um id é edição, caso não vier, é cadastro.
            try {
                loading.value = true;
                const response = await api.put(`/${objSingular.value}/${obj.value.id}`, obj.value);
                obj.value = response.data

                toast.add({
                    severity: "success",
                    summary: "Sucesso",
                    detail: `${objSingular.value} ${obj.value.nome} atualizada com sucesso`,
                    life: 5000,
                });

                objDialog.value = false; // Fecha o pop up
                obj.value = {}; // Limpa o objeto

                getAll(); // Refresh na lista
                filtrar(); // Verifica se tem filtro ativo

            } catch (error) {
                toast.add({
                    severity: "error",
                    summary: "Erro",
                    detail: `Não foi possível atualizar a ${objSingular.value} ${obj.value.nome}. Erro: ${error}`,
                    life: 5000,
                });
            } finally {
                loading.value = false;
            }
        } else {
            // Cadastro
            try {
                loading.value = true;
                const response = await api.post(`/${objSingular.value}`, obj.value);
                obj.value = response.data

                toast.add({
                    severity: "success",
                    summary: "Sucesso",
                    detail: `${objSingular.value} ${obj.value.nome} cadastrada com sucesso`,
                    life: 5000,
                });

                objDialog.value = false; // Fecha o pop up
                obj.value = {}; // Limpa o objeto

                getAll(); // Refresh na lista
                filtrar(); // Verifica se tem filtro ativo   

            } catch (error) {
                console.error(error);
                toast.add({
                    severity: "error",
                    summary: "Erro no cadastro",
                    detail: `Não foi possível cadastrar a ${objSingular.value} ${obj.value.nome}. Erro: ${error}`,
                    life: 5000,
                });
            } finally {
                loading.value = false;
            }
        }
    }
};

// *** DELEÇÃO ***
const deleteObjDialog = ref(false);
const selectedObjs = ref([]);
const deleteObjsDialog = ref(false);

const confirmDeleteSelected = () => {
    if (selectedObjs.value.length == 1) {
        obj.value = selectedObjs.value.shift();
        deleteObjDialog.value = true; // Abre o pop up de deleção de uma unica Situação
    }
    else deleteObjsDialog.value = true; // Abre o pop up de deleção de varias Situações
};

const confirmDeleteObj = (obj) => {
    obj.value = obj;
    deleteObjDialog.value = true;
};

// Unico Selecionado
const deleteObj = async () => {
    try {
        loading.value = true;
        await api.delete(`/${objSingular.value}/${obj.value.id}`);

        toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: `${objSingular.value}  ${obj.value.nome} excluído do sistema`,
            life: 5000,
        });

        deleteObjDialog.value = false;
        obj.value = {};
        selectedObjs.value = [];

        getAll(); // Refresh na lista
        filtrar(); // Verifica se tem filtro ativo

    } catch (error) {
        console.error(error);
        toast.add({
            severity: "error",
            summary: "Erro no cadastro",
            detail: `Não foi possível cadastrar a ${objSingular.value} ${obj.value.nome}. Erro: ${error}`,
            life: 5000,
        });
    } finally {
        loading.value = false;
    }
};

// Vários selecionados
const deleteSelectedObjs = async () => {
    try {
        loading.value = true;
        let objIds = ref([]);

        // Pega os ids das Situações selecionadas para exclusão
        objIds.value = selectedObjs.value.map(s => s.id);

        // Chama o delete passando o array de Ids
        const response = await api.delete(`/${objPlural.value}`, { data: objIds.value });

        toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: `${objPlural.value} excluídas do sistema`,
            life: 5000,
        });

        deleteObjsDialog.value = false;
        selectedObjs.value = [];

        getAll(); // Refresh na lista
        filtrar(); // Verifica se tem filtro ativo

    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Erro",
            detail: `Não foi possível excluir as ${objPlural.value}. Erro: ${error}`,
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
            listaFitrada.value = listaOriginal.value;
            break;
        case "ativos":
            listaFitrada.value = listaOriginal.value.filter(s => s.ativo);
            break;
        case "inativos":
            listaFitrada.value = listaOriginal.value.filter(s => !s.ativo);
            break;
        default:
            listaFitrada.value = listaOriginal.value;
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