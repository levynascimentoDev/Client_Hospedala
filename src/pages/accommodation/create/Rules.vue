<script setup lang="ts">
    import { ref } from 'vue';
    import SelectButton from 'primevue/selectbutton'; 
    import Textarea from 'primevue/textarea';
    import { Icon } from '@iconify/vue';

    const pet = ref<boolean>(false)
    const smoke = ref<boolean>(false)
    const events = ref<boolean>(false)
    const optional = ref<string>('')
    const options = [
        {label: 'sim', value: true},
        {label: 'não', value: false}

    ]

    


</script>

<template>
    <div class="container">
        <div class="box">
            <div class="title">
                <h1>Regras da Acomodação</h1>
                <p>Defina o que é permitido no seu espaço para que os hóspedes saibam o que esperar antes de reservar.</p>

            </div>

            <div class="rules">
                <div class="rule">

                <div class="icons">
                <Icon icon="streamline-plump:pet-paw-solid" style="color: white; " width="18px" height="18px"/>
                </div>

                <div class="text">
                <h3>Animais de estimação</h3>
                <p>Você aceita animais de estimação no seu imóvel?</p>
                </div>

                <SelectButton
                    v-model="pet" 
                    :options="options"
                    option-label="label" 
                    option-value="value" 
                    class="meu-select"

                />
                </div>

                <div class="rule">

                <div class="icons">
                <Icon icon="streamline-plump:bell-solid" style="color: white;" width="18px" height="18px"/>
                </div>

                <div class="text">
                <h3>Fumar</h3>
                <p>É permitido fumar dentro do imóvel ou em áreas comuns?</p>
                </div>

                <SelectButton
                    v-model="smoke" 
                    :options="options"
                    option-label="label" 
                    option-value="value" 
                    class="meu-select"

                />
                </div>

                <div class="rule">

                <div class="icons">
                <Icon icon="material-symbols:videogame-asset-rounded" style="color: white;" width="18px" height="18px"/>
                </div>

                <div class="text">
                <h3>Eventos e Festas</h3>
                <p>Os hóspedes podem realizar eventos ou festas no local?</p>
                </div>

                <SelectButton
                    v-model="events" 
                    :options="options"
                    option-label="label" 
                    option-value="value" 
                    class="meu-select"
                />
                </div>

                <h4>Informações adicionais(opcional)</h4>
                <Textarea id="over_label" v-model="optional" rows="3" cols="50" style="resize: none; background-color:white;" placeholder="Ex: Silêncio após às 22h, taxa extra para limpeza pesada, etc." color="white"/>
                

                


            </div>

            

        </div>

    </div>

</template>

<style>
    .container {
        background-color: #F9FAFB;
        display: flex;
        justify-content: center;
        padding-top: 20px;
    }

    .box {
        width: 900px;
        background: white;
        border: 1px solid #E5E7EB;
        border-radius: 12px;
        padding: 40px;

    }

    .title {
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 20px;
    }

    .title h1 {
        margin-bottom: 10px;
    }

    .title p {
        color: #6B7280;
        font-size: 14px;
    }

    .rule {
        display: flex;
        align-items: center;
        gap: 16px;
        padding-bottom: 40px;
        margin-bottom: 5px;

    
    }
   

    .icons {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: black;
        border-radius: 200%;
       

    }

    .text {
        flex: 1;
    }

    .text h3 {
        margin: 0;
        font-size: 16px;
    }

    .text p {
        margin: 4px 0 0;
        color: #6B7280;
        font-size: 14px;
    }

    h4 {
        margin: 35px 0 10px;
    }

    #over_label {
        width: 100%;
    }

</style>