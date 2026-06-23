import { defineStore } from "pinia";
import type { User } from "../types";
import api from "../services/http/api.js";
import { ref } from "vue";


export const useUserStore = defineStore('user', () => {
    
    const user = ref<User | null>(null)

    const fetchLogoutUser = async () => {
        try {
            await api.delete('/users/logout', {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })

            return user.value = null;
        } catch (err) {
            return user.value = null;
        }
    }
    
    const fetchUser = async () => {
        try {
            const respAcess = await api.get('/users/me', {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            user.value = respAcess.data as User;
        } catch (error) {
            try {
                await api.get('/auth/refresh/token', {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                });
                const respAcess = await api.get('/users/me', {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                });
                user.value = respAcess.data as User;
            } catch (error) {
                user.value = null;
            }
        }
    }

    return {
        user,
        fetchUser,
        fetchLogoutUser
    }

})