<script setup lang="ts">
import { useHostStore } from "../../../stores/hosts.ts";
import { ref, Transition, useTemplateRef, watch } from "vue";
import { useFocus, onClickOutside, onKeyStroke } from "@vueuse/core";
import Base from "./Base.vue";


interface Option {
    state?:string;
    city?:string;
}

interface Results {
    name:string,
    sigla:string, 
    recomended?:boolean
}

const query = ref("");
const results = ref<Results[]>([])
const isLoading = ref(false);
const debounceTimer = ref<any>(null)
const hostStore = useHostStore();
const selected = defineModel('selected', { default:false })
    
const option = ref<Option>() 
const value = defineModel('location', { default:"" })
value.value = query.value;

const emit = defineEmits(['next'])

    
hostStore.fetchApiPlaces();
hostStore.fetchCurrentLocation();

const inputRef = ref(null);
const { focused } = useFocus(inputRef);

const autocompleteRef = useTemplateRef<HTMLElement>('dropdownRef')

// ref clickoutside
const dropdownRef = ref(null);
const containerRef = ref(null);

const normalize = (str:string) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, "")

}

const locationRecomended = async () => {
    try {

        isLoading.value = true;
        let resultsStates = hostStore.locations.states.filter((state) => normalize(state.name).includes(normalize(hostStore.currentLocation.region as string)))

        const resultValues:{name:string; sigla:string; recomended:boolean}[] = [
            {
                name:resultsStates[0]?.name as string,
                sigla:resultsStates[0]?.sigla as string,
                recomended:true
            },
            {
                name:hostStore.currentLocation?.city as string,
                sigla:resultsStates[0]?.sigla as string,
                recomended:true
            }

        ]
        isLoading.value = false;
        results.value = resultValues;
    } catch (err) {
        isLoading.value = false;
    }

}

const searchAutoComplete = () => {
    if (debounceTimer.value) clearTimeout(debounceTimer.value);

    isLoading.value = true
    debounceTimer.value = setTimeout(() => {

        const value = normalize(query.value.trim())

        if (!value.length) {
            return locationRecomended();
        }

        let resultsStates = hostStore.locations.states.filter((state) => normalize(state.name).includes(value) || value.includes(normalize(state.name)) )
        let resultsCitys = hostStore.locations.citys.filter((city) => normalize(city.name).includes(value) || value.includes(normalize(city.name)) )

        const resultValues = [
            ...resultsStates,
            ...resultsCitys
        ]


        results.value = resultValues.filter(
            (v, i, arr) =>
                arr.findIndex((x) => x.name === v.name && x.sigla === v.sigla) === i
        ).slice(0, 10)

        isLoading.value = false;
    }, 250);

}

const hideDropdown = () => {
    selected.value = false;  
    isLoading.value = false;
}


const inputFocus = () => {
    selected.value = true;
    searchAutoComplete()
}

watch(query, () => {
    searchAutoComplete()
})

const selectOption = (value:Results) => {
    hideDropdown()
    focused.value = false;
    query.value = `${value.name}, ${value.sigla}`
    emit('next')
    return;
}

const clearContent = () => {
    query.value = ""
}


const onClick = () => {  
    focused.value = true;
    selected.value = true;
}

onClickOutside(dropdownRef, () => {
    selected.value = false;
    hideDropdown()  
}, { ignore:[containerRef] })


const activeIndex = ref(-1)

const scrollToActive = () => {
    const list = autocompleteRef.value
    if (!list) return
    const active = list.querySelector('.active') as HTMLElement
    active?.scrollIntoView({ block: 'nearest' })
}


onKeyStroke('ArrowDown', (e) => {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, results.value.length - 1)
    scrollToActive()
})

onKeyStroke('ArrowUp', (e) => {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
    scrollToActive()
})


onKeyStroke('Enter', () => {
    if (activeIndex.value >= 0) {
        selectOption(results.value[activeIndex.value]!)
    }
})



</script>


<template>
    <Base 
        label="Lugar de destino"
        icon="clarity:plane-solid"
        :select="selected"
        :button-clear="selected && !!query.length"
        @clicked="onClick()"
        @clear="clearContent()"
        ref="containerRef"
    >
        <input 
            type="text"
            :class="['input', { 'not-selected':!selected }]"
            ref="inputRef"
            placeholder="Buscar destinos"
            v-model="query"
            @focus="inputFocus()"
            autocomplete="off"
        >

        
        <Transition name="slide-fade">
            <ul 
                v-if="selected" 
                :class="[{ 'dropdown': !isLoading }, { 'dropdown-load': isLoading }]" 
                ref="dropdownRef"
            >
                <!-- vif and vfor can not be use together -->
                <template
                    v-if="results.length && !isLoading"
                >
                    <li
                        v-for="(value, index) in results"
                        :key="index"
                        class="option"
                        :class="{ 'active':index == activeIndex }"
                        @mousedown.stop="selectOption(value)"
                    >
                        <i class="bi bi-geo-alt-fill"></i>
                        <span v-if="value.recomended">{{ value.name }}, {{ value.sigla }} <span class="recomended">- perto de você</span></span>
                        <span v-else>{{ value.name }}, {{ value.sigla }}</span>
                    </li>
                </template>
                <li
                    v-else-if="!results.length && !isLoading"
                    class="not-found"
                >
                    Nada encontrado
                </li>
                <li 
                    v-if="isLoading"
                    class="load"
                >
                    <span class="circle1 circle"></span>
                    <span class="circle2 circle"></span>
                    <span class="circle3 circle"></span>
                </li>
            </ul>
        </Transition>

    </Base>
</template>



<style scoped>

.input {
    width: 100%;
    outline: none;
    padding: 5px 0;
    font-size: 14px;
    background:transparent;
    border: none;
}

.input-location:focus-within {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.288);
    background: white;
    border-radius: 23px;
}

.dropdown {
    position: absolute;
    top: 100%;  
    left: -10px;
    min-width: 300px;      
    min-height: 100px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 15px;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 6px 0;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);
    overflow: auto;
}

.dropdown::-webkit-scrollbar-thumb {
    display: none;
}


.dropdown .option {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 5px;
    gap: 15px;
    border-radius: 10px;
    transition: ease .2s;
    cursor: pointer;
    margin: 5px 5px;
}

.option:hover {
    background: #ccc;
}

.active {
    background: #e6e6e6;
}

.not-selected {
    color: #8b8a8a;  
}

.dropdown i {
    padding: 10px 15px;
    background: rgb(0, 0, 0);
    color: white;
    border-radius: 8px;
}

.recomended {
    font-size: 13px;
    color: #02020286;
}


.dropdown-load {
    width: 300px;
    height: 200px;
    position: absolute;
    top: 100%;  
    left: -10px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 8px;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);
    z-index: 999;
    animation: slideSmoth ease .2s forwards;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}


.dropdown-load .load {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}


.circle {
    display: flex;
    padding: 5px;
    border-radius: 100%;
    background: #969696;
    animation: pulse 0.8s ease-in-out infinite;
}

.circle1 {
    animation-delay: 0.8s;
}

.circle2 {
    animation-delay: 0.15s;
}

.circle3 {
    animation-delay: 0.8s;
}

@keyframes pulse {
    0% {  opacity: 0.6; }
    50% {   opacity: 1; }
    100% { opacity: 0.6; }
}


@keyframes slideSmoth {
    from {
        transform: translate(-10px, -10px);
        opacity: 0;
    }

    to {
        transform: translate(10px, 10px);
        opacity: 1;
    }
}

.not-found {
    color: #7d7d7d;    
    padding: 10px 10px;
    text-align: center;
}

</style>
