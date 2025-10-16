<template>
    <button type="button" @click="googleAuthRequest" class="google-button" :disabled="isLoading">
        <span v-if="isLoading" class="loading"></span>
        <img
            v-if="!isLoading"
            src="../assets/google-icon.svg"
            alt="logo-google"
            width="24"
            height="24"
        >
        <span v-if="isLogin && !isLoading">Login com google</span>
        <span v-else-if="!isLogin && !isLoading">Cadastre-se com google</span>
    </button>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useRouter } from 'vue-router';

    

    interface googleAuthResponse {
        status:number,
        redirect_uri:string
    }
    
    
    export default defineComponent({

        setup() {
            const router = useRouter();
            return { router }
        },
        data() {
            return {
                isLoading:ref<boolean>(false)
            }
        },
        methods:{
            async googleAuthRequest() {
                try {
                    this.isLoading = true;
                    this.$emit('load', true)
                    const resp = await fetch(`${import.meta.env.API_URI}/api/auth/google`, {
                        headers:{
                            "Content-Type":"application/json"
                        }
                    })

                    if (resp.ok) {
                        const value:googleAuthResponse = await resp.json()
                        window.location.href = value.redirect_uri
                    } else {
                        this.isLoading = false;
                        this.$emit('load', false)

                    }
                } catch (err) {
                    this.isLoading = false;
                    this.$emit('load', false)

                }
            }
        },
        props:{
            isLogin:{
                type:Boolean,
                default:false
            }
        }
    })
</script>

<style scoped>
    .google-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 250px;
        max-width: 250px;
        flex: 0 0 auto;
        transition: all ease-in .2s;
    }

    span {
        color: black;
        font-weight: 600;
        font-size: 16px;
    }

    .loading {
        width: 20px;
        height: 20px;
        border: 3px solid #ccc;
        border-top-color: #2b2f35;
        border-radius: 50%;
        animation: spin 0.9s linear infinite;
    }
    
    .google-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }


    .google-button:not(:disabled):hover {
        box-shadow: 0 3px 5px black;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
</style>