    <script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        data() {
            return {
                query:"",
                showDropdown:false,
                citys:[] as {name:string, sigla:string}[],
                states:[] as {name:string, sigla:string}[],
                results:[] as {name:string, sigla:string, recomended?:boolean}[],
            }
        },
        methods:{
            async fetchApiPlaces() {

                const respStates = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
                const respDataStates = await respStates.json() as any[];
                this.states = respDataStates.map((s:any) => ({ name:s.nome, sigla:s.sigla }))

                const respCitys = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
                const respDataCitys = await respCitys.json() as any[];
                this.citys = respDataCitys.map((c:any) => ({ name:c.nome, sigla:c.microrregiao?.mesorregiao?.UF?.sigla }))
            },
            normalize(str: string) {
                return String(str || "")
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
            },
            searchAutoComplete() {

                const query = this.normalize(this.query.trim())

                if (!query) {
                    this.results = [];
                    return
                }

                let resultsStates = this.states.filter((state) => this.normalize(state.name).includes(query))
                let resultsCitys = this.citys.filter((city) => this.normalize(city.name).includes(query))

                const results = [
                    ...resultsStates,
                    ...resultsCitys
                ]

        
                this.results = results.filter(
                    (v, i, arr) =>
                        arr.findIndex((x) => x.name === v.name && x.sigla === v.sigla) === i
                ).slice(0, 10)

            },
            hideDropdown() {
                this.showDropdown = false;  
                this.$emit('selected', false);
            },
            inputFocus() {
                this.showDropdown = true;
                this.$emit('selected', true);
                this.locationRecomended()
            },
            async locationRecomended() {
                const resp = await fetch('https://ipapi.co/json/')
                const data = await resp.json()
                let resultsStates = this.states.filter((state) => this.normalize(state.name).includes(this.normalize(data.region as string)))

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

                this.results = results;
            }
            
        },
        watch:{
            query(after:string) {
                if (!after) {
                    this.locationRecomended()
                }
            }
        },
        created() {
            this.fetchApiPlaces()
        }
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
