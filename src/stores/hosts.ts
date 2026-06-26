import { reactive, ref } from "vue";
import api from "../services/http/api";
import type { ibgeLocationPlaces, placeRequests, currentLoc } from "../types";
import { defineStore } from "pinia";


type ISODateString = `${number}-${number}-${number}`

interface QueryPlaces {
    city?:string;
    state?:string;
    query?:string;
    checkin:ISODateString;
    checkout:ISODateString;
    adult:number;
    children:number;
    baby:number;
    animal:number;
}


export const useHostStore = defineStore('hosts', () => {

    const locations = ref<ibgeLocationPlaces>({citys:[], states:[]})
    const filterPlaces = ref<placeRequests[][]>([])
    const currentLocation = reactive<currentLoc>({})

    const fetchApiPlaces = async () => {

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

            locations.value = locationsApi;

        } else {                
            
            
            const values:ibgeLocationPlaces = JSON.parse(localStorage.getItem('ibgePlaces') as string) as ibgeLocationPlaces;

            locations.value = values;
            
        }
    }

    const fetchAllPlaces = async () => {
            
        try {
            
            const resp = await api.get('/host/places', {
                headers:{
                    "Content-Type":"application/json"
                }
            })

            for (let i = 0; i < resp.data.length; i+= 8) {
                filterPlaces.value.push(resp.data.slice(i, i+8))
            }
            
            
        } catch (err) {
            filterPlaces.value = [];
        } 

    }

    const fetchCurrentLocation = async () => {
        try {
            if (!Object.keys(currentLocation).length) {            
            
                const resp = await fetch('https://ipinfo.io/json')    
                const data = await resp.json()
                currentLocation.region = data.region as string;
                currentLocation.city = data.city as string;
            }
        } catch {
            
        }
        
        
    }


    return {
        locations,
        filterPlaces,
        currentLocation,
        fetchAllPlaces,
        fetchApiPlaces,
        fetchCurrentLocation
    }
    
})