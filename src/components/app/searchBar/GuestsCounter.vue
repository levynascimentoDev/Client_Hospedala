
<script setup lang="ts">
import { computed, ref, Transition, watch } from 'vue';
import Base from './Base.vue';
import type { Guests } from '../../../types/index.ts';
import { Icon } from '@iconify/vue';
import { onClickOutside } from '@vueuse/core';


const seleted = defineModel('selected', { default:false })


const guestsModel = defineModel<Guests>('guestsModel', {
    default:() => ({
        adult:0,
        children:0,
        baby:0,
        animal:0
    })
}) 


const guests = ref<Guests>({
    adult:0,
    children:0,
    baby:0,
    animal:0
})


const toogleDropdown = () => {
    seleted.value = !seleted.value
}

const clearContent = () => {
    guests.value = {
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
    const total = guests.value.adult + guests.value.children
    return total == 16 ? true : false
})

const placeholderContent = computed(() => {

    let content =!hasGuests.value ? "Quantos Hospedes ?" : 
        `${guests.value.adult + guests.value.children} Hóspede` 

    if (guests.value.baby) {
        content += `, ${guests.value.baby} Bebês`
    } else if (guests.value.animal) {
        content += `, Animais: ${guests.value.animal}`
    }
    return content;

})

const hasGuests = computed(() => {

    const total = Object.values(guests.value).reduce(
        (interator, value) => interator + value, 0
    )  
    return total > 0
}) 


watch(guests, ({ animal, baby, children, adult }) => {
    
    if ((animal || baby || children) && adult === 0) {
        guests.value.adult = 1;
        adult = 1;
    }

    guestsModel.value = {
        adult,
        animal,
        baby,
        children
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
                                :disabled="guests.adult == 0"
                                @click="guests.adult--"
                            >
                                <Icon icon="ic:round-minus" />
                            </button>

                            <span>{{ guests.adult }}</span>

                            <button 
                                class="increment"
                                :disabled="limitGuests"
                                @click="guests.adult++"
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
                                :disabled="guests.children == 0"
                                @click.stop="guests.children--"
                            >
                                <Icon icon="ic:round-minus" />
                            </button>

                            <span>{{ guests.children }}</span>

                            <button 
                                class="increment"
                                :disabled="limitGuests"
                                @click.stop="guests.children++"
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
                                :disabled="guests.baby == 0"
                                @click.stop="guests.baby--"
                            >
                                <Icon icon="ic:round-minus" />
                            </button>

                            <span>{{ guests.baby }}</span>

                            <button 
                                class="increment"
                                :disabled="guests.baby == 5"
                                @click.stop="guests.baby++"
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
                                :disabled="guests.animal == 0"
                                @click.stop="guests.animal--"
                            >
                                <Icon icon="ic:round-minus" />
                            </button>

                            <span>{{ guests.animal }}</span>

                            <button 
                                class="increment"   
                                :disabled="guests.animal == 5"
                                @click.stop="guests.animal++"
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