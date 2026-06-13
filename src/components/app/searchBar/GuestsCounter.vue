
<script setup lang="ts">
import { computed, ref, Transition, watch } from 'vue';
import Base from './Base.vue';
import type { Guests } from '../../../types/index.ts';
import { Icon } from '@iconify/vue';
import { onClickOutside } from '@vueuse/core';


const seleted = defineModel('selected', { default:false })


const guests = defineModel<Guests>('guestsState', {
    default:() => ({
        adult:0,
        children:0,
        baby:0,
        animal:0
    })
}) 


const guestsState = ref<Guests>({
    adult:0,
    children:0,
    baby:0,
    animal:0
})

guests.value = {...guestsState.value}

const toogleDropdown = () => {
    seleted.value = !seleted.value
}

const clearContent = () => {
    guestsState.value = {
        adult:0,
        children:0,
        baby:0,
        animal:0
    }
}


const dropdownRef = ref(null);
const containerRef = ref(null);

onClickOutside(containerRef, () => {
    seleted.value = false;
}, { ignore:[ dropdownRef ] })


const limitGuests = computed(() => {
    const total = guestsState.value.adult + guestsState.value.children
    return total == 16 ? true : false
})

const placeholderContent = computed(() => {

    let content =!hasGuests.value ? "Quantos Hospedes ?" : 
        `${guestsState.value.adult + guestsState.value.children} Hóspede` 

    if (guestsState.value.baby) {
        content += `, ${guestsState.value.baby} Bebês`
    } else if (guestsState.value.animal) {
        content += `, Animais: ${guestsState.value.animal}`
    }
    return content;

})

const hasGuests = computed(() => {

    const total = Object.values(guestsState.value).reduce(
        (interator, value) => interator + value, 0
    )  
    return total > 0
}) 


watch(guestsState, () => {
    const { animal, baby, children, adult } = guestsState.value;

    if ((animal || baby || children) && adult === 0) {
        guestsState.value.adult = 1  
    }
}, { deep:true })


    
</script>

<template>
    <Base
        label="Hospedes"
        :placeholder="placeholderContent"
        icon="mdi:user",
        :button-clear="(hasGuests && selected!)"
        :select="seleted"
        @clicked="toogleDropdown()"
        @clear="clearContent()"
        ref="containerRef"
    >
        <Transition name="slide-fade">
            <div 
                v-show="seleted"
                class="dropdown"
                ref="dropdownRef"
                @click.stop
            >
                <div class="counters">
                    <div class="counter">

                        <div class="content">
                            <span class="title">
                                Adultos
                            </span>
                            <span class="description">
                                13 anos ou mais
                            </span>
                        </div>

                        <div class="actions">
                            <button 
                                class="decrement"
                                :disabled="guestsState.adult == 0"
                                @click="guestsState.adult--"
                            >
                                <Icon icon="ic:round-minus" />
                            </button>

                            <span>{{ guestsState.adult }}</span>

                            <button 
                                class="increment"
                                :disabled="limitGuests"
                                @click="guestsState.adult++"
                            >
                                <Icon icon="ic:round-plus" color="white" />
                            </button>
                        </div>
                    </div>

                    <div class="counter">
                        <div class="content">
                            <span class="title">
                                Crianças
                            </span>
                            <span class="description">
                                De 2 a 12 anos  
                            </span>
                        </div>
                        <div class="actions">
                            <button class="decrement"
                                :disabled="guestsState.children == 0"
                                @click.stop="guestsState.children--"
                            >
                                <Icon icon="ic:round-minus" />
                            </button>

                            <span>{{ guestsState.children }}</span>

                            <button 
                                class="increment"
                                :disabled="limitGuests"
                                @click.stop="guestsState.children++"
                            >
                                <Icon icon="ic:round-plus" color="white" />
                            </button>
                        </div>
                    </div>

                    <div class="counter">

                        <div class="content">
                            <span class="title">
                                Bebês
                            </span>
                            <span class="description">
                                Menor de 2 anos
                            </span>
                        </div>

                        <div class="actions">
                            <button class="decrement"
                                :disabled="guestsState.baby == 0"
                                @click.stop="guestsState.baby--"
                            >
                                <Icon icon="ic:round-minus" />
                            </button>

                            <span>{{ guestsState.baby }}</span>

                            <button 
                                class="increment"
                                :disabled="guestsState.baby == 5"
                                @click.stop="guestsState.baby++"
                            >
                                <Icon icon="ic:round-plus" color="white" />
                            </button>
                        </div>
                    </div>

                    <div class="counter">

                        <div class="content">
                            <span class="title">
                                Animais
                            </span>
                        </div>

                        <div class="actions">
                            <button class="decrement"
                                :disabled="guestsState.animal == 0"
                                @click.stop="guestsState.animal--"
                            >
                                <Icon icon="ic:round-minus" />
                            </button>

                            <span>{{ guestsState.animal }}</span>

                            <button 
                                class="increment"   
                                :disabled="guestsState.animal == 5"
                                @click.stop="guestsState.animal++"
                            >
                                <Icon icon="ic:round-plus" color="white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

    </Base>
</template>

<style scoped>

.dropdown {
    position: absolute;
    top: 100%;  
    left: -10px;
    margin-top: 15px;
    width: max-content;      
    height: max-content;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);
}

.counters {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-direction: column;
    padding: 20px;
    width: 350px;
}

.counters .counter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5px;
    gap: 35px;
    width: 100%;
}

.counter .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    gap: 10px;
}


.actions button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 100%;
}

.actions button:disabled {
    opacity: 0.4;
}

.counter .content {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
}

.actions span {
    flex: 1;
    text-align: center;
}

.actions .increment {
    background-color: black;
}

.actions .decrement {
    border: 1px solid #000;
    background: transparent;
}


</style>