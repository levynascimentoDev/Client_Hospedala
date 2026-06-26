import { defineStore } from "pinia";
import api from "../services/http/api";
import type { DefaultResponse } from "../types";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    
    interface PayloadTempToken {
        email:string;
        action:string;
    }

    const tempPayload = ref<PayloadTempToken | null>(null)
    
    const verifyTokenTemp = async () => {
        const { data } = await api.get<DefaultResponse<PayloadTempToken>>("/auth/tokens/verify")

        if (data.success) {
            tempPayload.value = data.data
            return true;
        } else {

            tempPayload.value = null
            return false;
        }
    }


    const fetchLogin = async (email:string) => {
        try {
            
            const { data } = await api.post<DefaultResponse>('/auth/login', {
                email:email
            });
    
            console.log(data);
            return data.success;
        } catch (error) {
            console.log(error);
        }
    }

    const sendCode = async (code:string) => {
        const { data } = await api.post<DefaultResponse>('/auth/code', {
            code:code
        });

        if (data.success) {
            return {
                redirect:data.data.redirect
            }
        } else {
            verifyTokenTemp();
            return null
        }
    };


    interface RegisterBody {
        given_name:string;
        family_name:string;
        birth_date:`${number}-${number}-${number}`
    }

    const register = async (body:RegisterBody) => {
        const { data } = await api.post('/auth/register', {
            ...body
        })
        if (data.success) {
            return {
                redirect:data.data.redirect
            }
        } else {
            verifyTokenTemp();
            return null;
        }
    }

    return {
        verifyTokenTemp,
        fetchLogin,
        sendCode,
        register,
        tempPayload
    }
})