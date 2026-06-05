<script setup lang="ts">
import { useHostStore } from "../../../stores/hosts";
import { reactive, ref, watch } from "vue";

interface currentLoc {
    region?:string;
    city?:string;
}

const query = ref("");
const showDropdown = ref(false);
const results = ref<{name:string, sigla:string, recomended?:boolean}[]>([])
const isLoading = ref(false);
const debounceTimer = ref<any>(null)
const hostStore = useHostStore();
const currentLocation = reactive<currentLoc>({});
    
hostStore.fetchApiPlaces();

(async () => {
    const resp = await fetch('https://ipinfo.io/json')    
    const data = await resp.json()
    currentLocation.region = data.region as string;
    currentLocation.city = data.city as string;
})()


const normalize = (str:string) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}

const locationRecomended = async () => {
    try {

        isLoading.value = true;
        let resultsStates = hostStore.locations.states.filter((state) => normalize(state.name).includes(normalize(currentLocation.region as string)))

        const resultValues:{name:string; sigla:string; recomended:boolean}[] = [
            {
                name:resultsStates[0]?.name as string,
                sigla:resultsStates[0]?.sigla as string,
                recomended:true
            },
            {
                name:currentLocation?.city as string,
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

        let resultsStates = hostStore.locations.states.filter((state) => normalize(state.name).includes(value))
        let resultsCitys = hostStore.locations.citys.filter((city) => normalize(city.name).includes(value))

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

const emit = defineEmits<{
    (e:"selected", value:boolean):void;
}>()

const hideDropdown = () => {
    showDropdown.value = false;  
    isLoading.value = false;
    emit('selected', false);
}

const inputFocus = () => {
    showDropdown.value = true;
    emit('selected', true);
    searchAutoComplete()
}

watch(query, () => {
    searchAutoComplete()
})


</script>


<template>
    <label for="location" class="input-location">
        <span class="label">
            <img 
                src="../../../assets/icons/plane.svg" 
                width="18px"
                height="18px"
                alt="Avião"
            >
            <span>Lugar de Destino</span>
        </span>
        <input 
            type="text"
            id="location" 
            placeholder="Buscar destinos"
            v-model="query"
            @focus="inputFocus()"
            @blur="hideDropdown()"
            autocomplete="off"
        >

        <ul v-if="showDropdown && results.length" class="dropdown">
            <li
                v-for="(value, index) in results"
                :key="index"
                class="option"
            >
                <i class="bi bi-geo-alt-fill"></i>
                <span v-if="value.recomended">{{ value.name }}, {{ value.sigla }} <span class="recomended">- perto de você</span></span>
                <span v-else>{{ value.name }}, {{ value.sigla }}</span>
            </li>
        </ul>
        <ul v-else-if="showDropdown" class="dropdown">
            <li class="not-found">
                Nada encontrado
            </li>
        </ul>

        <div class="dropdown-load" v-if="isLoading">
            <div class="load">
                <span class="circle1 circle"></span>
                <span class="circle2 circle"></span>
                <span class="circle3 circle"></span>
            </div>
        </div>

    </label>
</template>



<style scoped>
.input-location {
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    padding: 10px;
    transition: all linear .2s;
    border: 1px solid rgba(92, 92, 92, 0.416);
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    background: transparent;
}

.input-location:hover {
    background: #cccccc75;
}

.input-location .label {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    gap: 4px;
}

.label span {
    font-size: 13px;
    font-weight: 500;
}

.input-location #location {
    width: 100%;
    outline: none;
    padding: 5px 0;
    font-size: 14px;
    background:transparent;
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
    margin-top: 8px;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 6px 0;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);
    z-index: 999;
    animation: slideSmoth ease .2s forwards;
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
