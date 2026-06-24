<script setup lang="ts">
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';



</script>


<template>
    <div class="container">
        <div class="title">
            <div>
                <h1>Confirme seu endereço</h1>
                <p>Seu endereço só é compartilhado com os hospedes, depois que a reserva e comfirmada!</p>
            </div>
        </div>
        <div class="content">
            <form 
                @submit.prevent=""
                class="form"
            >

                <div :class="['label', 'cep']">
                    <label for="cep">cep</label>
                    <InputMask 
                        id="cep" 
                        mask="99999-999" 
                        placeholder="00000-000" 
                        slot-char="" 
                    />
                    <span>O preeenchimeto do CEP agiliza seu cadastro</span>
                </div>

                <div class="label">
                    <label for="address">Endereço / Rua</label>
                    <InputText 
                        id="address" 
                        type="text"
                        placeholder="ex: Rua das flores"
                    />

                </div>

                <div :class="['label', 'direction-row']">

                    <div>
                        <label for="withoutgrouping">Número</label>
                        <InputNumber  
                            inputId="withoutgrouping" 
                            :useGrouping="false" 
                            fluid 
                            placeholder="Numero do lugar"
                        />
                    </div>
                    
                    <div class="label">
                        <label for="address">Endereço / Rua</label>
                        <InputText 
                            id="address" 
                            type="text"
                            placeholder="Complemento"
                        />
                    </div>
                </div>

                <div class="label">
                    <label for="city">Cidade</label>
                    <Select 
                        label-id="city"
                        optionLabel="name" 
                        placeholder="Cidade" 
                    />
                    <label for="state">Estado UF</label>
                    <Select 
                        label-id="state"
                        optionLabel="name" 
                        placeholder="Estado" 
                    />


                </div>

                
            </form>
        </div>
    </div>
</template>

<style scoped>

.conatiner {
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
}

.title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
}

.title div {
    text-align: center;
}

.content {
    display: flex;
    align-items: start;
    justify-content: center;
    flex: 1;
    width: 100%;
}

.content .form {
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    gap: 20px;
}

.form .label {
    display: flex;
    align-items: start  ;
    justify-content: center;
    flex-direction: column;
}

.label label {
    text-align: start;
}


.direction-row {
    flex-direction: row !important;
}



</style>