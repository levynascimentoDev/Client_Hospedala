import { defineStore } from "pinia";
import type { User } from "../types";
import api from "../services/http/api.js";
import { ref } from "vue";


export const useUserStore = defineStore('user', () => {
    
    const user = ref<User | null>(null)

    const fetchLogoutUser = async () => {
        try {
            await api.delete('/users/logout')

            return user.value = null;
        } catch (err) {
            return user.value = null;
        }
    }
    
    const fetchUser = async () => {
        try {
            const { data } = await api.get('/users/me');
            user.value = data.data as User;
        } catch (error) {
            user.value = null;
        }
    }

    return {
        user,
        fetchUser,
        fetchLogoutUser
    }

})