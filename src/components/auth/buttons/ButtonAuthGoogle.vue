<template>
    <button type="button" @click="googleAuthRequest" class="google-button" :disabled="isLoading">
        <span v-if="isLoading" class="loading"></span>
        <img
            v-if="!isLoading"
            src="../../../assets/google-icon.svg"
            alt="logo-google"
            class="img"
        >
        <span>Entrar com google</span>
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
                isLoading:ref<boolean>(false),
                googleWindow:null as Window | null
            }
        },
        methods:{
            async googleAuthRequest() {
                try {
                    this.isLoading = true;
                    this.$emit('load', true)
                    const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/google`, {
                        headers:{
                            "Content-Type":"application/json"
                        }
                    })  

                    if (resp.ok) {
                        const urlGoogle:googleAuthResponse = await resp.json()

                        document.location.href = urlGoogle.redirect_uri;

                        // if (this.googleWindow && !this.googleWindow.closed) {
                        //     this.googleWindow.focus()
                        //     return
                        // }

                        // this.googleWindow = window.open(
                        //     urlGoogle.redirect_uri,
                        //     'googleAuth',
                        //     'width=500,height=600'
                        // )

                        // const closePopOut = setInterval(() => {
                        //     if (this.googleWindow?.closed) {
                        //         this.googleWindow = null;
                        //         clearInterval(closePopOut)
                        //     }
                        // }, 500);
                        
                    } else {
                        this.isLoading = false;
                        this.$emit('load', false)

                    }
                } catch (err) {
                    this.isLoading = false;
                    this.$emit('load', false)

                }
            }
        }
    })
</script>

<style scoped>
    .google-button {
        width: 294px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        padding: 10px 0;
        box-shadow:  2px 4px 4px rgba(0, 0, 0, 0.2);
        cursor: pointer ;
        transition: all ease-out .2s;
    }
    

    .google-button img {
        max-width: 20px;
        max-height: 20px;
    }
    
    span {
        color: black;
        font-weight: 500;
        font-size: 14px;
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
        transform: translateY(-3px);
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
</style>