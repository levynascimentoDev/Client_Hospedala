import { defineStore } from "pinia";
import type { User } from "../types";
import api from "../services/http/api.js";


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
                if (respAcess.status == 200) {
                    this.user = respAcess.data as User;
                } else {
                    this.user = null;
                }

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