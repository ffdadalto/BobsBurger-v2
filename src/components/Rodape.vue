<template>
    <div class="rodape">
        
            <h1>Bobs Burger © 2022</h1>            
            <div class="info-empresa">            
                <p>
                    <i class="pi pi-map-marker"></i
                    >Av Cel Manoel Nunes,
                    55
                </p>
                <p>
                    <i class="pi pi-map"></i>Jardim Tropical,
                    Serra,
                    ES - CEP:
                    29162-010
                </p>
                <p>
                    <i class="pi pi-phone"></i>Telefone:
                    27 32280065
                </p>
                <p>
                    <i class="pi pi-whatsapp"></i>WhatsApp:
                    27 981414088
                </p>
                <p>
                    <i class="pi pi-clock"></i>Horario de Atendimento:
                    18:30 às
                    23:30
                </p>
            </div>
        
    </div>
</template>

<style scoped>
.rodape {
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: var(--cor-letra-rodape);
    padding: 30px;
}

.rodape > h1 {
    margin: 0;
}

/* Barra vertical do rodapé */
.p-divider-vertical {
    border: 1px solid var(--cor-letra-rodape);
    margin: 0 50px !important;
}

.info-empresa > p {
    margin-bottom: 3px;
    padding: 0;
    font-size: 12px;
}
.info-empresa > #titulo {
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 18px;
}

.info-empresa > p > i {
    margin-right: 10px;
}
</style>