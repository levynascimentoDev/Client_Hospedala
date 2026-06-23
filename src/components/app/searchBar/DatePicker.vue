<script setup lang="ts">
import type { CheckoutDate } from '../../../types/index.ts';
import { computed, ref, Transition, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import Base from './Base.vue';
import { VDateRangePicker } from 'vuetify/labs/VDateRangePicker';

const date = ref<Date[]>([])


const selected = defineModel('selected', { default:false })

const dateModel = defineModel<CheckoutDate>('date', {
    default:{
        check_in:null,
        check_out:null  
    }
})    

    

const emit = defineEmits(['next'])

const toogleSelect = () => {
    selected.value = !selected.value;
}

const clearContent = () => {
    date.value = [];
}


const valuePlaceholder = computed(() => {
    return !date.value.length ?  "Inserir Datas"
    : `${date.value[0]?.toLocaleDateString()}, ${
        date.value[1] ? date.value[1]?.toLocaleDateString() : ""}`
})
    
    
    
const containerRef = ref(null)
const datePickerRef = ref(null)

onClickOutside(datePickerRef, () => {
    selected.value = false;
}, { ignore:[ containerRef ] })


watch(date, ([checkin, checkout]) => {
    
    dateModel.value = {
        check_in:checkin ?? null,
        check_out:checkout ?? null
    }

    if (checkin  && checkout ) return emit('next');
}, {deep: true})
    
</script>

<template>
    <Base
    label="Data"    
        icon="fa-solid:calendar-alt"
        :placeholder="valuePlaceholder"
        :select="selected"
        :button-clear="selected && !!date.length"
        @clicked="toogleSelect()"
        @clear="clearContent()"
        ref="containerRef"
    >
    
        <Transition name="slide-fade" >

            <div
                class="dropdown"
                ref="datePickerRef"
                v-if="selected"
                @click.stop
            >
                <VDateRangePicker
                    :min="new Date()"
                    v-model="date"
                    bg-color="white"
                    color="black"          
                />
            </div>
            
        </Transition>
    </Base>
</template>


<style scoped>

.dropdown {
    position: absolute;
    top: 100%;  
    left: -250px;
    margin-top: 15px;
    width: max-content;      
    height: max-content;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);
    
}

:deep(.v-date-picker .v-btn--disabled .v-icon) {
  visibility: hidden !important;
}

:deep(.v-date-picker-month__day .v-btn:hover) {
    border: 1px solid black !important;
}

:deep(.v-date-picker-month__day) {
    cursor: default !important;
}

:deep(.v-btn) {
    cursor: pointer !important;
}
:deep(.v-date-picker-month__day--today .v-date-picker-month__day-btn .v-btn__underlay) {
    background-color: #8b8b8b !important;
    border: none !important;
}


</style>