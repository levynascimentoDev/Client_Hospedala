

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import BigButton from '../../../components/app/accommodations/BigButton.vue';
import { onMounted, ref } from 'vue';
import type { Services } from '../../../types'
import { useWizardStep } from '../../../composables/useWizardStep.ts';
import { useAccommodationWizardStore } from '../../../stores/accomodation.ts';
import { useRouter } from 'vue-router';

const services = ref<Services>({
    air:false,
    balcony:false,
    bedlinen:false,
    breakfast:false,
    cityView:false,
    crib:false,
    elevator:false,
    grill:false,
    gym:false,
    heater:false,
    jacuzzi:false,
    parking:false,
    pool:false,
    reception:false,
    safe:false,
    seaView:false,
    tv:false,
    wheelchairAccessibility:false,
    wifi:false,
})


const { canContinue, onBack, onContinue } = useWizardStep();

const store = useAccommodationWizardStore();
const router = useRouter()

canContinue.value = true;
onContinue.value = async () => {
    const ok = await store.setServices({ ...services.value });

    if (ok) {
        await router.push(`location`)
    }
}

onBack.value = () => {
    router.push(`space`)
}

onMounted(() => {
    if (store.accommodation?.services) {
        const data = store.accommodation.services;
        services.value = data 
    }
})



</script>

<template>
    <div class="container">
        <div class="box">
            <div class="title">
                <h2>Quais Comodidades o seu espaço oferece?</h2>
                <p>Informe aos hospedes sobre as comodiades disponives no seu espaço. Você pode adicionar mais opções posteriormente.</p>
            </div>
            <div class="content">
                <div class="section">
                    <label><Icon height="24" width="24" icon="material-symbols:home-rounded" /><span>Essenciais</span></label>
                    <div class="options">
                        <BigButton  icon="material-symbols:wifi-rounded" content="wifi" :selected="services.wifi" @clicked="services.wifi = !services.wifi" />
                        <BigButton  icon="ic:baseline-tv" content="tv" :selected="services.tv" @clicked="services.tv = !services.tv" />
                    </div>
                </div>

                <div class="section">
                    <label><Icon height="24" width="24" icon="mdi:car" /><span>Estacionamento</span></label>
                    <div class="options">
                        <BigButton  icon="bi:p-square" content="estacionamento" :selected="services.parking" @clicked="services.parking = !services.parking" />
                    </div>
                </div>

                <div class="section">
                    <label><Icon height="24" width="24" icon="tabler:sun-filled" /><span>Clima e Conforto</span></label>
                    <div class="options">
                        <BigButton  icon="material-symbols:snowflake" content="Ar-condicionado" :selected="services.air" @clicked="services.air = !services.air" />
                        <BigButton  icon="solar:fire-bold" content="Aquecedor" :selected="services.heater" @clicked="services.heater = !services.heater" />
                    </div>
                </div>

                <div class="section">
                    <label><Icon height="24" width="24" icon="fluent:games-16-filled" /><span>Lazer e Entretenimento</span></label>
                    <div class="options">
                        <BigButton  icon="ic:round-pool" content="Piscina" :selected="services.pool" @clicked="services.pool = !services.pool" />
                        <BigButton  icon="iconoir:gym" content="Academia" :selected="services.gym" @clicked="services.gym = !services.gym" />
                        <BigButton  icon="pinhead:barbecue-grill-with-steam" content="Churrasqueira" :selected="services.grill" @clicked="services.grill = !services.grill" />
                        <BigButton  icon="ic:round-hot-tub" content="Jacuzzi" :selected="services.jacuzzi" @clicked="services.jacuzzi = !services.jacuzzi" />
                    </div>
                </div>

                <div class="section">
                    <label><Icon height="24" width="24" icon="streamline-plump:bell-solid" /><span>Serviços e comodidade</span></label>
                    <div class="options">
                        <BigButton  icon="ic:round-free-breakfast" content="Cafe da Manhã" :selected="services.breakfast" @clicked="services.breakfast = !services.breakfast" />
                        <BigButton  icon="fa7-solid:bed" content="Roupa de cama"  :selected="services.bedlinen" @clicked="services.bedlinen = !services.bedlinen" />
                        <BigButton  icon="teenyicons:safe-solid" content="Cofre" :selected="services.safe" @clicked="services.safe = !services.safe" />
                        <BigButton  icon="tabler:clock-filled" content="Recepção 24 H" :selected="services.reception" @clicked="services.reception = !services.reception" />
                    </div>
                </div>


                <div class="section">
                    <label><Icon height="24" width="24" icon="ion:man" /><span>Acessibilidade e facilidades</span></label>
                    <div class="options">
                        <BigButton  icon="uil:wheelchair" content="Acessibilidade para Cadeirantes" :selected="services.wheelchairAccessibility" @clicked="services.wheelchairAccessibility = !services.wheelchairAccessibility" />
                        <BigButton  icon="glyphs:elevator-bold" content="Elevador" :selected="services.elevator" @clicked="services.elevator = !services.elevator"/>
                        <BigButton  icon="fa-solid:baby" content="Berço" :selected="services.crib" @clicked="services.crib = !services.crib" />
                    </div>
                </div>

                <div class="section">
                    <label><Icon height="24" width="24" icon="mdi:eye" /><span>Vista e Ambientes</span></label>
                    <div class="options">
                        <BigButton  icon="iconoir:balcony" content="Varanda" :selected="services.balcony" @clicked="services.balcony = !services.balcony" />
                        <BigButton  icon="fa7-solid:city" content="Vista para Cidade" :selected="services.cityView" @clicked="services.cityView = !services.cityView"/>
                        <BigButton  icon="mynaui:sea-waves-solid" content="Vista pro Mar" :selected="services.seaView" @clicked="services.seaView = !services.seaView" />
                    </div>
                </div>


            </div>
        </div>
        
    </div>
</template>

<style scoped>

.container {
    align-items: center;
    justify-content: start;
    padding: 50px;
    flex: 1;
    width: 100%;
}

.box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 20px;
    flex-direction: column;
    gap: 40px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.546);
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
}

.title p {
    font-size: 14px;
} 


.content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    flex-direction: column;
    width: 100%;
}


.section {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    gap: 10px;
}

.section label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
}

.section label span {
    font-size: 18px;
}

.section .options {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
}








</style>
