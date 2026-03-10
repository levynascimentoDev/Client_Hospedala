import { defineStore } from "pinia";
import type { User } from "../settings/types/types";
import api from "../settings/http/api";


export const useUserStore = defineStore('user', {
    state() {
        return {
            user:null as User | null
        }
    },
    actions:{
        async fetchUser() {

            try {
                
                const respAcess = await api.get('/api/users/me', {
                    headers:{
                        "Content-Type":"application/json"
                    },
                    withCredentials:true
                }) 
                this.user = respAcess.data as User;
                return
            
            } catch (err) {

                try {

                    await api.get('/api/auth/refresh/token', {
                        headers:{
                            "Content-Type":"application/json"
                        },
                        withCredentials:true
                    });

                    const respAcess = await api.get('/api/users/me', {
                        headers:{
                            "Content-Type":"application/json"
                        },
                        withCredentials:true
                    }) 
                    return this.user = respAcess.data as User;
                    
                } catch (errRefresh) {
                    await this.fetchLogoutUser()
                    return;
                }

            } 
            
        },
        async fetchLogoutUser() {
            try {
                await api.delete('/users/logout', {
                    headers:{
                        "Content-Type":"application/json"
                    },
                    withCredentials:true
                })

                return this.user == null;
            } catch (err) {

                return;
            }
        },
    },
})