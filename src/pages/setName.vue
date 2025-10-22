<template>
    <div class="container">
        <section>
            <span v-if="isLoading" class="loading"><span class="spiner"></span></span>
            <h1>Crie seu username</h1>
            <form  @keyup.enter="sendRequest" @submit.prevent="sendRequest">
                <div class="inputs">

                    <input 
                        :key="0"
                        ref="inputs"
                        v-model="firstName"
                        type="password"
                        placeholder="Nome"
                        required
                    >
                    
                </div>
                <div class="inputs">
                    
                    <input 
                        v-model="lastName"
                        type="password"
                        placeholder="Sobrenome (Opcional)"
                    >
                    
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
            firstName:"",
            lastName:"",
            isLoading:false
        }
    },
    methods:{
        async sendRequest() {
            if (this.firstName != "" && this.firstName.length >= 4) {
                this.isLoading = true;

                const name = `${this.firstName}${this.lastName.length > 0 ? this.lastName : ''}`
                const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/register/username`, {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        token:this.$route.params.code,
                        name:name
                    })
                })
                
                if (resp.ok) {
                    setTimeout(() => {}, 1500)
                    const values = await resp.json()
                    return this.$router.push(`/register/complete/${values.token}`)
                }

            }    
        },
        async verifyToken() {
            const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/register/tokens`, {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${this.router.params.code}`,
                    "Grant-Type":"username"
                }
            })

            if (!resp.ok) return this.$router.push("/");
            
        }
    },
    mounted() {
        this.$refs.inputs.focus();
    },
    created() {
        this.verifyToken();
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
    left: 545px;
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