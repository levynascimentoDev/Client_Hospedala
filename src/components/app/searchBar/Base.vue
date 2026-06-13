<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { Transition } from 'vue';

interface Props {
    label:string;
    icon:string;
    select:boolean;    
    buttonClear:boolean;
    placeholder?:string;
}


const props = defineProps<Props>()
const emit = defineEmits(['clicked', 'clear'])

</script>


<template>
    <div 
        :class="['base-item', { 'selected':props.select }]"
        @click="emit('clicked')"
        
    >
        <span class="label">
            <Icon 
                :icon="props.icon"
                height="18px"
                width="18px"
            />
            
            <span>{{ props.label }}</span>
        </span>
        <div class="content">            
            <slot
                
            ></slot>
            <span
                v-if="props.placeholder"
                class="placeholder"
            >
                <span>{{ props.placeholder }}</span>
            </span>
            <Transition name="fade-size">
                <span
                    v-show="props.buttonClear"
                    class="icon-clear"
                    @click.stop.prevent="emit('clear')"
                >
                    <Icon 
                        icon="mdi:remove"
                    />
                </span>
                  
            </Transition>
        </div>
    </div>
</template>


<style scoped>
.base-item {
    display: flex;
    align-items: start;
    justify-content: start;
    padding: 5px 10px;
    flex-direction: column;
    transition: ease-out .06s;
    border: 1px solid rgba(92, 92, 92, 0.416);
    border-radius: 10px;
    transition: .4s ease-out;
    position: relative;
    cursor: pointer;
    height: 65px;
    width: 170px;
}


.base-item:hover:not(.selected){
    background: #cccccc75;
}

.label {
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 15px;
    gap: 5px;
    width: 100%;
}

.label span {
    font-size: 13px;
    font-weight: 500;
    flex-wrap: nowrap;
    overflow: hidden;
    white-space: unset;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.725);
}

.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1 ;
    width: 100%;
}

.placeholder {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: start;
    overflow: hidden; 
}


.placeholder span {
    color: #8b8a8a;  
    white-space: nowrap; 
    text-overflow: ellipsis;
    font-size: 14px;
}



.icon-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .2s ease-out;
    border-radius: 100%;
    padding: 5px;
}


.icon-clear:hover {
    background-color: #ccc;
}

.selected {
    background: white;
    transform: scale(1.06);
    border-color: black;
}


</style>