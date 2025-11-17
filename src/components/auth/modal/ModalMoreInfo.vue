<script lang="ts">
import { defineComponent } from 'vue';
import InputBirthDay from '../buttons/InputBirthDay.vue';

export default defineComponent({
    data() {
        return {
            first_name:"",
            last_name:"",
            date:"",
            terms:false,
            error:{
                terms:false,
                firstName:false,
                lastName:false,
                date:false
            }
        }
    },
    components:{
        InputBirthDay
    },
    methods:{
        async submitInfo() {
            if (!this.first_name || !this.last_name || !this.date || !this.terms) {
                this.error.firstName = !this.first_name;
                this.error.lastName = !this.last_name;
                this.error.date = !this.date;
                this.error.terms = !this.terms;
                return
            } 
            
        }
    },
    watch:{
        terms(after:boolean) {
            if (after) {
                this.error.terms = false;
            }
        }        
    }
    
})
</script>

<template>
    <div class="modal-more">
        <h1>Concluir cadastro de informações</h1>
        <div class="form">
            <div class="names">
                <label for="first-name">

                    <span>Nome</span>
                    <input 
                        type="text" 
                        id="first-name" ref="firstname" 
                        v-model="first_name" 
                        placeholder="Digite seu Nome" 
                        autocomplete="given-name"
                        :class="{ 'error' : error.firstName }"
                        @input="error.firstName = false"
                    >

                </label>
                <label for="last-name">

                    <span>Sobrenome</span>
                    <input 
                        type="text" 
                        id="last-name" 
                        ref="lastname" 
                        v-model="last_name" 
                        placeholder="Digite seu Sobrenome" 
                        autocomplete="family-name"
                        :class="{ 'error' : error.lastName }"
                        @input="error.lastName = false"
                    >
                    
                </label>
                <span class="text-alert" v-if="error.firstName || error.lastName">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    <span v-if="error.firstName">Nome é obrigatorio pra identificação pessoal</span>
                    <span v-else>Sobrenome é obrigatorio para identificação pessoal</span>
                </span>
            </div>
            <InputBirthDay @date="date = $event" :error="error.date" @error="error.date = $event" />
            <div class="terms-politcs">
                <input type="checkbox" id="terms" v-model="terms" :class="{ 'error' : error.terms }">
                <label for="terms" class="text">
                    <span>Eu concordo com os </span>
                    <button type="button" class="link">Termos de Uso</button>
                    <button type="button" class="link">Política de Privacidade</button>
                    <button type="button" class="link">Política de Uso de Dados</button>
                </label>
            </div>
            <span class="text-alert" v-if="error.terms">
                <i class="bi bi-exclamation-triangle-fill"></i>
                <span>Nescessario aceitar os termos é politica para continuar</span>
            </span>
        </div>
        <button type="button" class="next" @click="submitInfo">Continuar</button>
    </div>
</template>

<style scoped>
.modal-more {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.326);
    border-radius: 20px;
    padding: 25px;
    gap: 15px;
}

.modal-more .form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}


.modal-more h1 {
    font-size: 20px;
    margin-bottom: 10px;
}

.modal-more .names {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 13px;
}

.names input {
    border-radius: 8px;
    padding: 10px 10px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.226);
    width: 350px;
    border: 1px solid #D1D5DB;
    font-size: 15px;
}


.modal-more label {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
}

label span {
    font-size: 14px;
}

.terms-politcs {
    display: flex;
    align-items: start;
    margin-top: 10px;
    gap: 5px;
}

.terms-politcs input {
    cursor: pointer;
    margin-top: 3px;
    width: 14px;
    height: 14px;
    accent-color: black;
}

.terms-politcs .text {
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 11px;
    line-height: 18px;
    max-width: 320px;
}

.text span:first-child {
    margin-right: 6px;
}

.text button:last-child {
    margin-left: 6px;
}


.terms-politcs .link {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    color: black;
    text-decoration: underline;
    font-size: 12px;
    font-weight: 500;
}

.next {
    width: 100%;
    padding: 13px;
    border-radius: 8px;
    background: black;
    color: white;
    font-size: 15px;
    cursor: pointer;
    transition: ease .2s;
}

.next:hover {
    opacity: 0.6;
}

.error {
    border: 2px solid red !important;
    outline-color: red !important;
    background: rgba(255, 0, 0, 0.105) !important;
}


.text-alert {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.text-alert span {
    color: red;
    font-size: 11px;
}

.text-alert i {
    color: red;
}



</style>