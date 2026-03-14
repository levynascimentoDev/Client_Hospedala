<script lang="ts">
import { defineComponent } from "vue";
import type { ibgeLocationPlaces } from "../../../../settings/types/types";

export default defineComponent({
    data() {
        return {
            query:"",
            showDropdown:false,
            locationPlaces:{} as ibgeLocationPlaces,
            results:[] as {name:string, sigla:string, recomended?:boolean}[],
            isLoading:false,
            debounceTimer:null as any
        }
    },
    methods:{
        async fetchApiPlaces() {

            if (!localStorage.getItem('ibgePlaces')) {
                
                const respStates = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
                const respDataStates = await respStates.json() as any[];
                const states = respDataStates.map((s:any) => ({ name:s.nome, sigla:s.sigla }))
    
                const respCitys = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
                const respDataCitys = await respCitys.json() as any[];
                const citys = respDataCitys.map((c:any) => ({ name:c.nome, sigla:c.microrregiao?.mesorregiao?.UF?.sigla }))


                const locationsApi = {
                    "citys":[
                        ...citys
                    ],
                    "states":[
                        ...states
                    ]
                }

                localStorage.setItem('ibgePlaces', JSON.stringify(locationsApi));

                this.locationPlaces = locationsApi;

            } else {                
                
                const values:ibgeLocationPlaces = JSON.parse(localStorage.getItem('ibgePlaces') as string) as ibgeLocationPlaces;

                this.locationPlaces = values;
                
            }
        },
        normalize(str: string) {
            return String(str || "")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
        },
        searchAutoComplete() {
            if (this.debounceTimer) clearTimeout(this.debounceTimer);

            this.isLoading = true
            this.debounceTimer = setTimeout(() => {

                const query = this.normalize(this.query.trim())
    
                if (!query) {
                    this.locationRecomended();
                    return
                }
    
                let resultsStates = this.locationPlaces.states.filter((state) => this.normalize(state.name).includes(query))
                let resultsCitys = this.locationPlaces.citys.filter((city) => this.normalize(city.name).includes(query))
    
                const results = [
                    ...resultsStates,
                    ...resultsCitys
                ]
    
        
                this.results = results.filter(
                    (v, i, arr) =>
                        arr.findIndex((x) => x.name === v.name && x.sigla === v.sigla) === i
                ).slice(0, 10)

                this.isLoading = false;
            }, 250);

        },
        hideDropdown() {
            this.showDropdown = false;  
            this.isLoading = false;
            this.$emit('selected', false);
        },
        async inputFocus() {
            this.showDropdown = true;
            this.$emit('selected', true);
            await this.locationRecomended()
        },
        async locationRecomended() {
            try {

                this.isLoading = true;

                const resp = await fetch('https://ipapi.co/json/')
                const data = await resp.json()

                let resultsStates = this.locationPlaces.states.filter((state) => this.normalize(state.name).includes(this.normalize(data.region as string)))

                const results:{name:string, sigla:string, recomended:boolean}[] = [
                    {
                        name:resultsStates[0]?.name as string,
                        sigla:resultsStates[0]?.sigla as string,
                        recomended:true
                    },
                    {
                        name:data.city as string,
                        sigla:resultsStates[0]?.sigla as string,
                        recomended:true
                    }

                ]
                this.isLoading = false;
                this.results = results;
            } catch (err) {
                this.isLoading = false;
            }
        }
        
    },
    watch:{
        async query(after:string) {
            if (!after) {
                await this.locationRecomended()
            }
        }
    },
    async created() {
        await this.fetchApiPlaces()
    }
})
</script>


<template>
    <label for="location" class="input-location">
        <span class="label">
            <img 
                src="../../../../assets/icons/plane.svg" 
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
            @focus="inputFocus"
            @blur="hideDropdown"
            @input="searchAutoComplete"
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

</style>
