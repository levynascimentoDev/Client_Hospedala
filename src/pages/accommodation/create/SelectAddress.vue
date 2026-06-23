<script setup lang="ts">
    import { ref } from 'vue';
    import Textarea from 'primevue/textarea';
    import FloatLabel from 'primevue/floatlabel';

    const cep = ref<string>('');
    const endereco = ref<string>('');
    const numero = ref<string>('');
    const complemento = ref<string>('');
    const bairro = ref<string>('');
    const cidade = ref<string>('');
    const estado = ref<string>('');




</script>

<template>
    <div class="container">
        <div class="header">
            <h1>Confirme seu endereço</h1>
            <p>Seu endereço só é compartilhado com os hóspedes, depois que a reserva é confirmada!</p>
        </div>
        
        <div class="form">
            <FloatLabel>
                <Textarea id="over_label" v-model="cep" rows="1" cols="70"  style=" resize: none; background-color: white; color: black" />
                <label for="over_label">CEP:</label>
            </FloatLabel>

            <FloatLabel>
                <Textarea id="over_label" v-model="endereco" rows="1" cols="70" style="resize: none; background-color: white; color: black" />
                <label for="over_label">Over Label</label>
            </FloatLabel>

            <FloatLabel>
                <Textarea id="over_label" v-model="numero" rows="1" cols="70" style="resize: none; background-color: white; color: black" />
                <label for="over_label">Over Label</label>
            </FloatLabel>

            <FloatLabel>
                <Textarea id="over_label" v-model="cep" rows="1" cols="70"  style=" resize: none; background-color: white; color: black" />
                <label for="over_label">CEP:</label>
            </FloatLabel>

            <FloatLabel>
                <Textarea id="over_label" v-model="cep" rows="1" cols="70"  style=" resize: none; background-color: white; color: black" />
                <label for="over_label">CEP:</label>
            </FloatLabel>

            <FloatLabel>
                <Textarea id="over_label" v-model="cep" rows="1" cols="70"  style=" resize: none; background-color: white; color: black" />
                <label for="over_label">CEP:</label>
            </FloatLabel>

            <FloatLabel>
                <Textarea id="over_label" v-model="cep" rows="1" cols="70"  style=" resize: none; background-color: white; color: black" />
                <label for="over_label">CEP:</label>
            </FloatLabel>
        </div>

    </div>



</template>

<style>
.container{
    align-items: center;
    gap:2;
    justify-content: center;
    flex-direction: column;
    align-items: stretch;
}

.header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 20px 0;

}

.form{
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
}



</style>