<script setup lang="ts">
import { useRoute } from 'vue-router';
import GuestsCounter from './GuestsCounter.vue';
import SearchLocation from './SearchLocation.vue';
import DatePicker from './DatePicker.vue';
import { ref } from 'vue';
import type { CheckoutDate, Guests, Region } from '../../../types/index.ts';
import { Icon } from '@iconify/vue';




const inputLocation = ref(false)
const inputDate = ref(false)
const route = useRoute()

const date = ref<CheckoutDate>({
    check_in:null,
    check_out:null
})

// const locale = ref<Region>({
//     city:null,
//     state:null
// })

const location = ref("")
const guests = ref<Guests>({
    adult:0,
    animal:0,
    baby:0,
    children:0
})

const showDatePicker = ref(false); 
const showGuestsCounter = ref(false);


</script>


<template>
    <div class="search-bar" :class="{ 'input-selected' : inputDate || inputLocation  }">
        <div
            tabindex="1"
        >
            <SearchLocation 
                @next="showDatePicker = true;"
                v-model:location="location"
            />
        </div>

        <div
            tabindex="2"
        >
        
            <DatePicker 
                @next="() => {
                    showGuestsCounter = true;
                    showDatePicker = false;
                } "
                v-model:date="date" 
                v-model:selected="showDatePicker"
                
            />
        </div>

        <div
            tabindex="3"
        >

            <GuestsCounter
                v-model:guests-state="guests"
                v-model:selected="showGuestsCounter"
            />
        </div>

        
        <button
            class="search"
            tabindex="4"
        >
            <Icon 
                icon="material-symbols:search-rounded"
                height="34"
                width="34"
            />
        </button>
       
    </div>
</template>

<style scoped>

.search-bar {
    display: flex;
    align-items: center;
    justify-content: start;
    min-width: 550px;
    min-height: 80px;
    gap: 10px;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.338);
    border: 1px solid #ccc;
    background: #fff;
    transition: ease .2s;
}


.search-bar .items {
    flex: 1;
    max-height: 72px;
    max-width: 200px;
}

.input-selected {
    background: #cccccc56 !important;
}

.search-bar .search {    
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(#111827, #082854);
    color: #fff;
    padding: 10px 10px;
    border-radius: 10px;
    font-size: 17px;
    font-weight: 500;
    cursor: pointer;
    transition: ease .3s;
}

.search:hover {
    border-radius: 100%;
}

</style>