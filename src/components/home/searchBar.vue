<script lang="ts">
import { defineComponent } from 'vue';
import InputLocation from './search-bar/inputLocation.vue';
import InputDate from './search-bar/inputDate.vue';
import InputPersons from './search-bar/inputPersons.vue';

export default defineComponent({
    data() {
        return {
            inputLocation:false,
            inputDate:false
        }
    },
    components:{
        InputLocation,
        InputDate,
        InputPersons
    }
})
</script>


<template>
    <div class="search-bar" :class="{ 'input-selected' : inputDate || inputLocation  }">
        <InputLocation @selected="inputLocation = $event" class="items" />
        <InputDate @selected="inputDate = $event" class="items" />
        <InputPersons  class="items" />
        <button 
            type="button"
            class="search"
        >Buscar</button>
    </div>
</template>

<style scoped>

.search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.338);
    background: #fff;
    transition: ease .2s;
}


.search-bar .items {
    flex: auto;
}

.input-selected {
    background: #cccccc56 !important;
}

.search-bar .search {
    background: linear-gradient(#111827, #082854);
    color: #fff;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 17px;
    font-weight: 500;
    cursor: pointer;
    transition: ease .3s;
}

.search:hover {
    border-radius: 20px;
    opacity: 0.8;
}

</style>