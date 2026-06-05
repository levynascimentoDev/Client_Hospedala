import { defineStore } from "pinia";
import api from "../services/http/api";


interface ResponseTokenVerify {
    status:number;
    message:string; 
    action?:"checkout" | "complete";
}



export const useAuthStore = defineStore("auth", () => {
    

    const fetchTokenVerify = async () => {
        const response = await api.get<ResponseTokenVerify>("/auth/tokens/verify")

        if (response.status == 200) {
            return response.data.action
        } else {
            return null
        }
    }

    return {
        fetchTokenVerify
    }
})