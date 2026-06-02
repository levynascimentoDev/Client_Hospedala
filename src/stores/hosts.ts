import api from "../services/http/api";
import type { placeRequests } from "../types";
import { defineStore } from "pinia";

export const useHostStore = defineStore('hosts', {
    state() {
        return {
            filterPlaces:[] as placeRequests[][]
        }
    },
    actions:{
        async fetchAllPlaces() {
            
            try {
                
                const resp = await api.get('/api/host/places', {
                    headers:{
                        "Content-Type":"application/json"
                    }
                })

                for (let i = 0; i < resp.data.length; i+= 8) {
                    this.filterPlaces.push(resp.data.slice(i, i+8))
                }
                
                
            } catch (err) {
                this.filterPlaces = [];
            } 

        }
    }
})