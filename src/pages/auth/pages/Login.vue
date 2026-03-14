<script lang="ts">
import ButtonAuthGoogle from '../components//buttons/ButtonAuthGoogle.vue';
import ModalForgotPass from '../components/modal/ModalForgotPass.vue';
import ModalConfirmCode from '../components/modal/ModalConfirmCode.vue';
import { useUserStore } from '../../../stores/users';
import { defineComponent } from 'vue';
import DefaultLayout from '../../../layouts/DefaultLayout.vue';


export default defineComponent({
    name:"Login",
    data() {
        return {
            email:"",
            password:"",
            isError:false,
            isLoading:false,
        }
    },
    components:{
        ButtonAuthGoogle,
        ModalForgotPass,
        ModalConfirmCode,
        DefaultLayout
    },
    methods:{
        async postRequests() {
            const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/login`, {
                headers:{
                    "Content-Type":"aplication/json"
                },
                credentials:"include"
            })


            if (resp.ok) {
                
            }
        },
    },

    async created() {
        const userStore = useUserStore();

        await userStore.fetchUser();

        if (userStore.user) {
            return this.$router.push('/');
        }
    }
})

</script>

<template> 
    
    <DefaultLayout>
        <section>
            <div class="content" >
                <div class="box-login">
                    <h1>Entre ou Cadastre-se</h1>
                    <form @submit.prevent="postRequests">
    
                        <label for="email" class="input">
                            <span>E-mail</span>
                            <input 
                                type="email" 
                                id="email" 
                                v-model="email" 
                                placeholder="....."
                                :class="{ 'inputs-error': isError }"
                            />
                        </label>

                        <button 
                            type="submit" 
                            :disabled="isLoading"
                        >Entrar</button>
                    </form>
                    <span class="or">ou</span>
                    <ButtonAuthGoogle @load="isLoading = $event" />
                </div>
            </div>
        </section>        
    </DefaultLayout>
</template>

<style scoped>

section {
    display: flex;
    align-items: center;
    justify-content: center ;
    flex-direction: column;
    width: 100%;
}


.content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    max-width: 100%;
    padding: 0 30px;    
}

.img-span {
    display: inline-block;
    width: 45%;
    height: auto;
    margin-bottom: 40px;
}

.box-login {
    border-radius: 10px;
    /* box-shadow: 2px 4px 14px rgba(0, 0, 0, 0.2); */
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 380px;
    height: 450px;
    gap: 10px;
    padding: 0 10px;
    margin-bottom: 20px;
    transform: scale(1.15);
}

.box-login h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

.box-login form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    padding-bottom: 0;
}


.box-login form .input {    
    width: 300px;
    position: relative;
}

.box-login form .input input {
    width: 100%;
    padding: 17px 10px 10px 10px;
    font-size: 15px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
}

.box-login form .input input::placeholder {
    font-size: 17px;
    letter-spacing: 2px;
    padding-left: 10px;
    font-weight: 500;
    
}
.box-login form .input span {
    font-weight: 600;
    position: absolute;
    font-size: 11px;
    left: 10px;
    top: 3px;
}


.box-login form button {
    /* background: linear-gradient(#02552A, #026331, #064D28); */
    background: black;
    color: white;
    width: 300px;
    padding: 10px 0;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    transition: linear .2s;
}

.box-login form button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.box-login form button:not(:disabled):hover  {
    opacity: 0.6;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.or {
    user-select: none;
    font-size: 15px;
    margin: -5px;
}

.or::before, .or::after {
    content: '';
    display: inline-block;
    width: 120px;
    background: black;
    height: 0.9px;
    margin: 2px 10px;
}

.forgot-password {
    background: transparent;
    font-size: 14px;
    position: relative;
    cursor: pointer;
}

.forgot-password::after, .forgot-password::before {
    content: ' ';
    display: inline-block;
    position: absolute;
    height: 1.5px;
    background: black;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all linear .3s;
    width: 0;;
}

.forgot-password:not(:disabled):hover::after {
    width: 100%;
}   


.inputs-error {
    border: 1.7px solid red;
    box-shadow: 2px 4px 8px rgba(255, 0, 0, 0.2);
}

.box-login .create-account {
    font-size: 12px;
    display: flex;
    gap: 5px;
}

.create-account .link {
    text-decoration: none;
    font-weight: 600;
    color: rgb(0, 67, 191);
    transition: all linear .2s;
}


.link:hover {
    text-decoration: underline;
}

@media (max-width: 850px) {
    
    .img-span {
        display: none;
    }

    .content {
        justify-content: center;
    }
    .box-login {
        transform: scale(0.9);
    }

    section {
        max-width: 100%;
    }
}

</style>

   

