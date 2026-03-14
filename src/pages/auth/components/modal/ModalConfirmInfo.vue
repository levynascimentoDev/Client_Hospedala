<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            email:"",        
        }
    }
})
</script>

<template>
    <div class="modal-login-info">

        <div class="title">
            <h1>Para continuar comfirme suas informações de login</h1>
            <span>{{ email }}</span>
        </div>


        <form @submit.prevent="">
            <div class="inputs">
                <input type="text" autocomplete="given-name" placeholder="Nome" required>
                <input type="text" autocomplete="family-name" placeholder="Sobrenome" required>
                <input type="date">
            </div>
            
            <button type="submit">Confirmar</button>
        </form>


    </div>
</template>

<style scoped>

</style>