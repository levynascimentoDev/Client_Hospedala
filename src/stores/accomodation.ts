import { defineStore } from "pinia";
import api from "../services/http/api";
import { ref } from "vue";
import type { AccomodatioWizard, Address, DefaultResponse, PropertyType, Services, SpaceType } from "../types";
import { accommodationSchema } from "../schemas/accomodation.schemas";



export const useAccommodationWizardStore = defineStore('accommodationWizard', () => {
    const accommodation = ref<AccomodatioWizard | null>(null);

    const getAccommodation = async (id: string) => {
        try {
            const { data } = await api.get(`/accommodations/${id}`);

            const result = await accommodationSchema.safeParseAsync(data.data);

            if (result.success) {
                accommodation.value = result.data;
                console.log(accommodation.value)
            } else {
                
                accommodation.value = null;
            }
        } catch (err) {
            
            accommodation.value = null;
        }
    };

    const create = async () => {
        try {
            const { data } = await api.post<DefaultResponse>('/accommodations/create')
            
            if (data.success) {
                accommodation.value = data.data;
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    const setProperty = async (property:PropertyType) => {
        try {

            const { data } = await api.patch<DefaultResponse>(`/accommodations/update/${accommodation.value?.id}/property-type`, {
                property_type:property
            })

            if (data.success) {
                await getAccommodation(accommodation.value?.id!);       
                return true
            } else {
                return false
            }
            
        } catch {
            return false
        }
    }

    const setSpace = async (spacetype:SpaceType) => {
        try {

            const { data } = await api.patch<DefaultResponse>(`/accommodations/update/${accommodation.value?.id}/space-type`, {
                space_type:spacetype
            })

            if (data.success) {
                await getAccommodation(accommodation.value?.id!)        
                return true
            } else {
                return false
            }
            
        } catch {
            return false
        }
    }


    const setServices = async (services:Services) => {
        try {

            console.log(services)

            const { data } = await api.patch<DefaultResponse>(`/accommodations/update/${accommodation.value?.id}/services`, {
                ...services
            })

            if (data.success) {
                await getAccommodation(accommodation.value?.id!)        
                console.log(services)
                return true
            } else {
                return false
            }
            
        } catch {
            return false
        }
    }


    const setAddress = async (location:Address) => {
        try {

            const { data } = await api.patch<DefaultResponse>(`/accommodations/update/${accommodation.value?.id}/location`, {
                ...location
            })  

            if (data.success) {
                await getAccommodation(accommodation.value?.id!)        
                
                return true
            } else {
                return false
            }
            
        } catch {
            return false
        }
    }


    

    
    return {
        getAccommodation,
        accommodation,
        create,
        setProperty,
        setSpace,
        setServices,
        setAddress
    };
});