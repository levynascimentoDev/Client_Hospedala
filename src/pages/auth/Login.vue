<script lang="ts">
import ButtonAuthGoogle from '../../components/auth/ButtonAuthGoogle.vue';
import InputPassword from '../../components/auth/inputPassword.vue';
import ModalForgotPass from '../../components/auth/ModalForgotPass.vue';
import SpanMessage from '../../components/layout/spanMessage.vue';
import TopBar from '../../components/layout/TopBar.vue';
import { defineComponent } from 'vue';
import ModalConfirmCode from '../../components/auth/ModalConfirmCode.vue';
export default defineComponent({
    name:"Login",
    data() {
        return {
            email:"",
            password:"",
            isError:false,
            isLoading:false,
            toogleModalForgot:false
        }
    },
    components:{
        TopBar,
        InputPassword,
        ButtonAuthGoogle,
        SpanMessage,
        ModalForgotPass,
        ModalConfirmCode
    },
    methods:{
        async postRequets() {
            this.isError = true;
        },
        async getRequets() {
            const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/users/me`, {
                headers:{
                    "Conetent-Type":"application/json"
                },
                credentials:"include"
            })

            if (resp.ok) {
                return this.$router.push('/');
            }
        },
        showModalForgot() {
            this.toogleModalForgot = !this.toogleModalForgot;
            return this.toogleModalForgot
        }
    }
})

</script>

<template> 
    <div class="container">
        <TopBar :home="false" :isLogged="false" />
        <section>
            <ModalForgotPass v-if="toogleModalForgot" @toogle="showModalForgot()"/>
            <ModalConfirmCode/>
            <div class="content">
                <div class="box-login">
                    <h1>Login</h1>
                    <SpanMessage v-if="isError" :message="'Email ou senha incorretos'"/> 
                    <form @submit.prevent="postRequets">
    
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
    
                        <InputPassword 
                            @password="password = $event"
                            class="input"
                            :isError="isError"
                        />
                        <button 
                            type="submit" 
                            :disabled="isLoading"
                        >Entrar</button>
                    </form>
                    <span class="or">ou</span>
                    <ButtonAuthGoogle @load="isLoading = $event" />
                    <button type="button" class="forgot-password" @click="showModalForgot()">Esqueci minha senha!</button>
                </div>
                <img src="../../assets/imgs/image-card.png" alt="Imagens de praia" class="img-span">

            </div>
        
            <div class="footer" ></div>
            
        </section>        

    </div>
</template>

<style scoped>

section {
    display: flex;
    align-items: center;
    justify-content: center ;
    flex-direction: column;
    overflow: hidden;
    widows: 100%;
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
    box-shadow: 2px 4px 14px rgba(0, 0, 0, 0.2);
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
}

.box-login form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
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
    background: linear-gradient(#02552A, #026331, #064D28);
    color: white;
    width: 300px;
    padding: 10px 0;
    border-radius: 8px;
    cursor: pointer;
    transition: all linear .3s;
    font-size: 15px;
    font-weight: 500;
}

.box-login form button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.box-login form button:not(:disabled):hover  {
    opacity: 0.8;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.or {
    user-select: none;
    font-size: 15px;
    margin: 0;
}

.or::before, .or::after {
    content: '';
    display: inline-block;
    width: 120px;
    background: black;
    height: 1.5px;
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


.footer {
    width: 100%;
    height: 93px;
    background: linear-gradient(#02552A, #026331, #064D28);
    position: fixed;
    bottom: 0;  
}

.inputs-error {
    border: 1.7px solid red;
    box-shadow: 2px 4px 8px rgba(255, 0, 0, 0.2);
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

   

