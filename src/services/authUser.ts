import { defineStore } from "pinia";
import type { User } from "../types/types";

export default defineStore("authUser", {
    state() {
        return {
            user:{} as User | null
        }
    },
    actions:{
        async getUserData() {

            const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/users/me`, {
                headers:{
                "Content-Type":"application/json",
                },
                credentials:"include"
            });

            if (resp.ok) {
                this.user = await resp.json() as User
            } else {
                this.user = null;
            }
        }
    }
})