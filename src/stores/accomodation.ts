import { defineStore } from "pinia";
import api from "../services/http/api";

const useAccommodationStore = defineStore('accommodation', () => {
    

    const fetchIncompleteAcomodation = async (id:string) => {
        await api.get(`/accomodations/:id`)
    }
    
    return {

    }
})