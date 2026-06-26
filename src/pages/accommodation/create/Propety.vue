<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {  onMounted, ref, TransitionGroup, watch } from 'vue';
import { useWizardStep } from '../../../composables/useWizardStep';
import { useAccommodationWizardStore } from '../../../stores/accomodation';
import type { PropertyType } from '../../../types';
import { useRouter } from 'vue-router';

interface Option {
    name:string;
    description:string;
    icon:string;
    value:string;
}

const { canContinue, canBack, onContinue } = useWizardStep();
canContinue.value = false;
canBack.value = false;
const store = useAccommodationWizardStore();



const router = useRouter();

onContinue.value = async () => {
    const ok = await store.setProperty(value.value as PropertyType);
    
    if (ok) {
        await router.push(`/accommodation/create/${store.accommodation?.id}/space`)
    };
}

const value = ref("");

onMounted(() => {
    if (store.accommodation?.propertyType) {
        value.value = store.accommodation.propertyType 
    }
})

watch(value, (v) => {
    if (v.length) return canContinue.value = true;
})

const options = ref<Option[]>([
    { name:"Casa", description:"Casa Independente e com espaço propio", icon:"material-symbols:home-rounded", value:"CASA" },
    { name:"Apartamento", description:"Unidade em edificil residencial", icon:"fa6-solid:building", value:"APARTAMENTO" },
    { name:"Motel", description:"Estadia Curta", icon:"material-symbols:bed", value:"MOTEL" },
    { name:"Pousada", description:"Hospedagem familiar e Acolhedora", icon:"fa6-solid:hotel", value:"POUSADA" },
    { name:"Hotel", description:"Estabelecimento Hoteleiro", icon:"material-symbols:star", value:"HOTEL" },
    { name:"Resort", description:"Hotel Grande com lazer completo", icon:"fa6-solid:mountain-sun", value:"RESORT" },
])
</script>


<template>

    <div class="container">
        <div class="title">
            <h2>Selecione oque deseja anunciar</h2>
            <p>Por favor, descreva melhor o espaço que deseja anunciar </p>
        </div>
        <div class="actions">

            <TransitionGroup name="slidetop" appear>
                <button 
                    v-for="(option, key) in options" 
                    :key="key"
                    :style="{ animationDelay: `${key * 0.1}s` }"
                    :class="['buttons', { 'selected':value == option.value }]"
                    @click="value = option.value"
                >
                    <div class="icon">
                        <Icon :icon="option.icon" width="25" height="25" />
                    </div>
                    <div class="content">
                        <span class="h1">{{ option.name }}</span>
                        <span class="p" >{{ option.description }}</span>
                    </div>
                </button>
            </TransitionGroup>
        </div>
    </div>
</template>

<style scoped>

.container {
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 30px;
    padding: 20px;
}




.title {
    text-align: center;
}

.actions {
    display: flex;
    align-items: flex-start;
    justify-content: start;
    flex-wrap: wrap;
    gap: 20px;
    width: 60%;
}


.actions .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 255px;
    height: 230px;
    border-radius: 20px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.427);
    background-color: white;
    flex-direction: column;
    padding: 20px;
    gap: 5px;
    border: 2px solid transparent;
    transition: .2s ease;
}

.content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.content .h1 {
    font-size: 20px;
    font-weight: 500;
}


.content .p {
    font-size: 14px;
}
.buttons .icon {
    display: flex;
    align-items: center;
    width: max-content;
    justify-content: center;
    background-color: black;
    color: white;
    border-radius: 100%;
    padding: 15px;
}

.buttons:hover {
    border-color: black;
}

.slidetop-enter-active {
    animation: slidetopEnter ease .4s both;
}

.actions .buttons.selected {
    border-color: black;
    background-color: #cccccc38;
}


@keyframes slidetopEnter {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translate(0);
        opacity: 1;
    }
}


</style>