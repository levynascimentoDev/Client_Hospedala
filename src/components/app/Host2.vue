<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Data {
    propertyType: string;
    city: string;
    pricePerNight: number;
    imgUrl: string;
}

const props = defineProps<Data>()

const dateNow = new Date()
const tomorrow = new Date(dateNow)
tomorrow.setDate(tomorrow.getDate() + 1)
</script>

<template>
    <div class="card">
        <div class="img">
            <img :src="props.imgUrl" alt="Imagem da acomodacao">
            <Icon icon="icon-park-twotone:like" class="icon" /> 
        </div>
        <div class="content">
            <h3>{{ props.propertyType }}, {{ props.city }}</h3>
            <p>{{ dateNow.toDateString() }} - {{ tomorrow.toDateString() }}</p>
            <span class="classification">
                <span>{{ props.pricePerNight }} por Noite</span>
            </span>
        </div>
    </div>
</template>

<style scoped>

.card {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    width: 100px;
    padding: 20px;
}


.img {
    display: flex;
    width: 100%;
    height: 290px;
    border-radius: 10px;
    position: relative;
}

.img img {
    display: flex;
    
}

.icon {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
}




</style>