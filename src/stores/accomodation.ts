import { defineStore } from "pinia";
import api from "../services/http/api";
import { ref } from "vue";
import type { Accommodations } from "../types";

export const useAccommodationStore = defineStore('accommodation', () => {

    const accomodation = ref<Accommodations | null>(null)
    
    const fetchAcomodation = async (id:string) => {
        const response = (await api.get<Accommodations>(`/accomodations/:id`)).data
        accomodation.value = response
    }

    const fetchCreateAccommodation = async () => {
        const response = await api.post<Accommodations>('/accomodations/create')
        
    } 
    
    return {
        fetchAcomodation,
        accomodation
    }
})