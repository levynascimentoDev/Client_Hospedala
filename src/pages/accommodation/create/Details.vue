<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useAccommodationWizardStore } from '../../../stores/accomodation'
import { useWizardStep } from '../../../composables/useWizardStep'
import { useRouter } from 'vue-router'

interface Counter {
    key: 'bedrooms' | 'beds' | 'bathrooms' | 'maxGuests'
    label: string
    description: string
}

const router = useRouter()

const store = useAccommodationWizardStore()
const { canContinue, canBack, onContinue, onBack } = useWizardStep()

canBack.value = true
canContinue.value = false;

const counters = reactive({
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    maxGuests: 0
})

watch(counters, () => {

    if (counters.bathrooms > 0 || counters.bedrooms> 0 || counters.maxGuests > 0 || counters.beds> 0) {
        return canContinue.value = true
    } else {
        return canContinue.value = false;
    }

}, { deep:true })

onContinue.value = async () => {
    const resp = await store.setDetails(counters)

    if (resp) {
        await router.push('photos') 
    }
}

onBack.value = () => {
    router.push('location')
}

const options: Counter[] = [
    { key: 'bedrooms', label: 'Quartos', description: 'Número de quartos disponiveis' },
    { key: 'beds', label: 'Camas', description: 'Número total de camas' },
    { key: 'bathrooms', label: 'Banheiros', description: 'Número de banheiros disponiveis' },
    { key: 'maxGuests', label: 'Hóspedes', description: 'Informe o número máximo de hospedes' },
]

const decrement = (key: Counter['key']) => {
    if (counters[key] > 0) counters[key]--
}

const increment = (key: Counter['key']) => {
    if (counters[key] < 20) counters[key]++
}
</script>
<template>
    <div class="container">
        <div class="modal-form">

            <div class="title">
                <h1>Detalhes da Acomodação</h1>
                <p>Compartilhe as informações sobre o seu espaço</p>
            </div>

            <div class="counters">
                <div class="options" v-for="option in options" :key="option.key">
                    <div class="content">
                        <h2>{{ option.label }}</h2>
                        <p>{{ option.description }}</p>
                    </div>
                    <div class="counter">
                        <button
                            type="button"
                            :disabled="counters[option.key] === 0"
                            @click="decrement(option.key)"
                        >-</button>
                        <span>{{ counters[option.key] }}</span>
                        <button
                            type="button"
                            :disabled="counters[option.key] === 20"
                            @click="increment(option.key)"
                        >+</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>

.container {
    align-items: center;
    justify-content: center;
}

.modal-form {
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    width: 472px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    gap: 30px;
}

.modal-form .title,
.counters,
.buttons {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.modal-form .title h1 {
    font-size: 22px;
}

.title h1, .title p {
    width: 100%;
    text-align: left;
}

.modal-form .title p {
    font-size: 16px;
}

.counters {
    gap: 40px;
}

.counters .options {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-form .counters .options h2 {
    font-size: 16px;
}

.modal-form .counters .options p {
    font-size: 13px;
}

.modal-form .counters .options button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 20px;
    padding: 0;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.381);
    cursor: pointer;
    transition: all .2s ease-out;
}

.modal-form .counters .options .counter button:disabled {
    cursor: default;
}

.counters .options span {
    width: 30px;
    text-align: center;
    display: inline-block;
    margin: 0 8px;
}

button:disabled {
    opacity: 0.4;
}

.modal-form .buttons {
    flex-direction: row;
    display: flex;
    gap: 20px;
}

.modal-form .buttons .next {
    font-size: 15px;
    width: 260px;
    height: 50px;
    border-radius: 9px;
    background-color: black;
    color: white;
}

.modal-form .buttons .back {
    font-size: 15px;
    width: 84px;
    height: 50px;
    border-radius: 9px;
    padding: 0 10px;
    background-color: white;
    border: 2px solid #E5E7EB;
}

.modal-form .buttons button {
    transition: all .2s ease-out;
    cursor: pointer;
}

.modal-form .buttons button:hover {
    opacity: 0.5;
}

</style>