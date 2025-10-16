<template>
    <div class="container">
        <section>
            <span v-if="isLoading" class="loading"><span class="spiner"></span></span>
            <h1>Criar sua senha</h1>
            <form  @keyup.enter="sendRequest" @submit.prevent="sendRequest">
                <div class="inputs">

                    <input 
                        :key="0"
                        ref="inputs"
                        v-model="password"
                        type="password"
                        placeholder="Digite sua senha!"
                    ><span v-if="passwordIsOk" class="password-confirm"><i class="bi bi-check-circle-fill"></i></span>
                    
                </div>
                <div class="inputs">
                    
                    <input 
                        v-model="passwordConfirm"
                        type="password"
                        placeholder="Confirme sua senha"
                    ><span v-if="confirmIsOk" class="password-confirm"><i class="bi bi-check-circle-fill"></i></span>
                    
                </div>

                <button type="submit" class="button-submit">Confirmar</button>

            </form>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password:"",
            passwordConfirm:"",
            isLoading:false
        }
    },
    methods:{
        async sendRequest() {
            if (this.passwordConfirm === this.password && this.passwordConfirm.length >= 7 && this.password.length >= 7) {
                this.isLoading = true;
                const resp = await fetch(`https://api.hospedala.com/api/auth/login/forgot-password`, {
                    method:"PATCH",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${this.$route.params.code}`
                    },
                    body:JSON.stringify({
                        password:this.password.trim()
                    })
                })
                
                setTimeout(() => {}, 1000)

                if (resp.ok) {return this.$router.push("/login")};
            }
        },
        async verifyToken() {
            const resp = await fetch(`https://api.hospedala.com/api/auth/register/tokens`, {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${this.router.params.code}`,
                    "Grant-Type":"complete"
                }
            })

            if (!resp.ok) return this.$router.push("/");
            
        }
    },
    mounted() {
        this.$refs.inputs.focus()
    },
    created() {
        this.verifyToken()
    },
    computed:{
        passwordIsOk() {
            if (this.password.length >= 7) {
                return true
            } else {
                return false
            }
        },
        confirmIsOk() {
            return this.passwordConfirm === this.password && this.passwordConfirm.length >= 7 && this.password.length >= 7
        }
    },
    watch:{
        password(after, before) {
            if (after.length <= before.length) {
                this.passwordLength = false;
            } else {
                if (after.length < 7) {
                    this.passwordLength = true
                }
            }
        }
    }
}
</script>

<style scoped>
.box {
    background: white;
    padding: 20px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.box * {
    color: black;
}

form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    background: white;
    padding: 20px 20px;
    border-radius: 10px;
}



form input {
    position: relative;
    box-shadow: 0 0 3px black;
    font-size: 16px;
}

.button-submit {   
    width: 200px;
    background: rgba(31, 133, 241, 0.797);
    border: none;
    box-shadow: 0 0 3px black;
    transition: all linear .2s;
    font-weight: 500;
    font-size: 17px;
}

.button-submit:hover {
    background: black;
    color: white;
}

.password-confirm * {
    color: greenyellow;
}

.password-confirm {
    position: absolute;
    left: 500px;
}

.inputs {
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999
}


.spiner {
    width: 40px;
    height: 40px;
    border: 6px solid #868686; /* cor de fundo */
    border-top: 6px solid #ffffff; /* cor do spinner */
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>