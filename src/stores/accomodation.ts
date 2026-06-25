import { defineStore } from "pinia";
import api from "../services/http/api";
import { ref } from "vue";
import type { AccomodatioWizard, PropertyType, SpaceType } from "../types";
import { accommodationSchema } from "../schemas/accomodation.schemas";



export const useAccommodationWizardStore = defineStore('accommodationWizard', () => {
    const accommodation = ref<AccomodatioWizard | null>(null);

    const getAccommodation = async (id: string) => {
        try {
            const { data } = await api.get(`/accommodations/${id}`);
            const result = await accommodationSchema.safeParseAsync(data.data);

            if (result.success) {
                accommodation.value = result.data;
            } else {
                console.error('Erro ao validar accommodation:', result.error);
                accommodation.value = null;
            }
        } catch (err) {
            console.error('Erro ao buscar accommodation:', err);
            accommodation.value = null;
        }
    };

    const create = async () => {
        try {
            const { data } = await api.patch(`/accommodations/${accommodation.value?.id}`, {
            })
        
        } catch {
            
        }
    }

    const setPropertyType = async (property:PropertyType) => {
        try {
            const { data } = await api.patch(`/accommodations/${accommodation.value?.id}`, {
                property_type:property
            })
        
        } catch {
            
        }
    };

    const setScpaceType = async (spacetype:SpaceType) => {
        try {
            const { data } = await api.patch(`/accommodations/${accommodation.value?.id}`, {
                spacetype
            })
        
        } catch {
            
        }
    };

    return {
        getAccommodation,
        accommodation
    };
});