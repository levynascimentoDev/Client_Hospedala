<script setup lang="ts">
import { onMounted } from 'vue';
import Host from '../components/app/Host.vue';
import { useHostStore } from '../stores/hosts.ts';
import { ref, nextTick } from 'vue';


const placesStore = useHostStore();
const isLoading = ref(false);


isLoading.value = true;

(async () => {
    await placesStore.fetchAllPlaces();
})()


console.log(placesStore.filterPlaces)

isLoading.value = false;
onMounted(async () => {
    await nextTick()
    window.scrollTo({ top: 0 });
})


</script>


<template>
    <div class="container">
        <div class="content" v-if="isLoading" style="margin-top: 60px;">
            <div class="row-content" v-for="row in 2" :key="row">
                <div class="values">
                    <host :isLoading="true" v-for="i in 8" :key="i"/>
                </div>
            </div>
        </div>
        <div class="content" v-else>
            <div class="row-content" v-for="(listValues, indexList) in placesStore.filterPlaces" :key="indexList">
                <h1>Em destaque</h1>
                <div class="values">
                    <Host v-for="(value, indexValue) in listValues" :data="value" :key="indexValue"  />
                </div>
            </div>

            <div class= "not-found" v-if="!placesStore.filterPlaces.length">
                <i class="bi bi-emoji-frown"></i>
                <h1>Ops!, Sem valores no momento.</h1>
            </div>
        </div>
    </div>

</template>

<style scoped>
.content {
    display: flex;
    justify-content: start;
    align-content: start;
    padding-left: 38px;
    padding-right: 38px;
    padding-bottom: 30px;
    padding-top: 35px;
    gap: 25px;
    flex-wrap: wrap;
    margin-bottom: 80px;
    flex: 1;
}

.row-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

.row-content h1 {
    font-size: 20px;
    margin-left: 20px;
    margin-bottom: 10px;
    flex-shrink: 0;
}

.row-content .values {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-x: auto;   
    overflow-y: hidden;
    gap: 20px;
    padding: 10px 20px;
    scroll-behavior: smooth;
    width: 100%;
}

.row-content .values::-webkit-scrollbar {
    height: 0;
}


.not-found {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13.4px;
    gap: 5px;
    margin-top: 50px;
}

.not-found h1 {
    color: rgba(101, 102, 103, 0.689);
}

.not-found i {
    font-size: 27px;
    color: rgba(101, 102, 103, 0.689);

}


</style>


