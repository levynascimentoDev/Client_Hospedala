<template>
  <div class="container">
    <section @paste="Handlerpaste($event)">
        <div class="box">
            <h1>Verificação de E-mail</h1>
            <p>Codigo de verficação enviado para:</p>
            <span v-if="email" class="email">{{ email }}</span>
            <div class="inputs">
                <input
                    v-for="(_, i) in arrayCode"
                    :class="{ error:inputError }"
                    :key="i"
                    maxlength="1"
                    ref="inputs"
                    v-model="arrayCode[i]"
                    @input="handlerInputs(i)"
                    @paste="Handlerpaste($event)"
                    @keydown.backspace="HandlerBackspace(i)"
                    @focus="onFocus(i)"
                />
            </div>

            <button type="button" v-if="!loading" :disabled="timeFormat.length > 0"  @click="refreshCode">Reenviar Codigo {{ timeFormat }}</button>
            <span class="loading" v-if="loading"></span>
        
        </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { defineComponent } from 'vue';
export default defineComponent({
    setup(){
        const router = useRoute();
        return { router }
    },
    data() {
        return {
            email:"" as string,
            arrayCode: ["", "", "", "", ""] as string[],
            timeFormat:"" as string,
            fullCode:"" as string,
            inputError:false as boolean, 
            loading:false as boolean
        }
    },
    methods: {
        handlerInputs(index:number) {
            this.inputError = false;
            if (isNaN(Number(this.arrayCode[index]))) this.arrayCode[index] = '';
            if (index < this.arrayCode.length - 1 && Array(this.arrayCode[index]).length != 0) {
                const inputs = this.$refs.inputs as any
                inputs[index + 1].focus()
            }
            this.fullCode = this.arrayCode.join("")
        },
        Handlerpaste(event:ClipboardEvent) {
            event.preventDefault()
            const text = event.clipboardData?.getData('text').trim() || '' as string
            if (!isNaN(Number(text)) && text.length == 5) {

                for (let i = 0; i <5;i++) {
                    this.arrayCode[i] = text[i] as string
                }
                this.fullCode = text
            }
        },
        HandlerBackspace(index:number){
            if (this.arrayCode[index] === "" && index > 0) {
                const inputs = this.$refs.inputs as any
                inputs[index - 1].focus()
            }
        },
        onFocus(index:number) {
            const inputs = this.$refs.inputs as any
            if (index != 0 && this.arrayCode[index - 1] == "") {
                inputs[index-1].focus()
            } 
        },
        async refreshCode() {
            this.loading = true
            const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/token/refresh`, {
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    token:this.router.params.code
                })
            })

            if (!resp.ok) return this.$router.push("/");

            const values = await resp.json()

            this.router.params.code = values.token 

            let time = 100
            const timer = setInterval(() => {
                
                this.timeFormat = `${Math.floor(time/60)}:${time%60}`
                this.loading = false
                
                time--;
                
                if (time < 0) {
                    this.timeFormat = ""
                    clearInterval(timer)
                }
            }, 1000);
        }
    },
    async created() {
        
        if (this.router.params.code && this.router.params.type && ["register", "forgot-password", "login"].includes(this.router.params.type as string)) {            
            if (this.router.params.type == "login") {
                
                const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/login/tokens`, {
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${this.router.params.code}`
                    }
                })
                if (!resp.ok) return this.$router.push("/");

                const values = await resp.json()
                return this.email = values.email

            } else if (this.router.params.type == "register") {
                
                const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/register/tokens`, {
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${this.router.params.code}`,
                        "Grant-Type":"checkout"
                    }
                })
                if (!resp.ok) return this.$router.push("/");
                const values = await resp.json()
                return this.email = values.email

            } else if (this.router.params.type == "forgot-password") {
                const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/register/tokens`, {
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${this.router.params.code}`,
                        "Grant-Type":"forgot-password"
                    }
                })

                if (!resp.ok) return this.$router.push("/");
                const values = await resp.json()
                return this.email = values.email

            }
        }
    },
    watch:{
        async fullCode(after:string, _:string) {
            if (after.length == 5 && !isNaN(Number(after))) {
                this.loading = true;
                setTimeout(() => {}, 1500)

                if (this.router.params.type == "login") {
                    const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/login/verify`, {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        credentials:"include",
                        body:JSON.stringify({
                            code:after,
                            token:this.router.params.code
                        })
                    })
                    
                    if (resp.ok) {
                        return this.$router.push("/home")
                    }
                } else if (this.$route.params.type == "register" || this.$route.params.type == "forgot-password") {
                    const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/register/verify`, {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        credentials:"include",
                        body:JSON.stringify({
                            code:after,
                            token:this.router.params.code
                        })
                    })

                    if (resp.ok) {
                        const token = await resp.json()
                        if (this.$route.params.type == "register") {
                            
                            return this.$router.push(`/register/set-username/${token.token}`)
                        } else {
                            return this.$router.push(`/login/forgot-password/set-password/${token.token}`)
                        }
                    }
                }
                
                
                const inputs = this.$refs.inputs as any
                this.inputError = true;
                this.arrayCode = ["", "", "", "", ""]
                this.fullCode = ""
                this.loading = false
                inputs[0].focus()
                
            }
        }
    }
});
</script>

<style scoped>

.inputs input {
  width: 15px;
  height: 15px;
  margin: 0 5px;
  text-align: center;
  box-shadow: 0 0 3px black;
  font-weight: 600
}

.inputs {
    padding-top: 10px;
    margin-bottom: 10px;
}

.box {
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    padding: 25px 15px;
}

.box * {
    color: black;
}

button {
    background: transparent;
    border: none;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
}

button:not(:disabled):hover {
    text-decoration: underline;
}

button:disabled {
    opacity: 0.4;
    cursor: default;
}


.timer {
    font-weight: 500;
    font-size: 18px;
    background: transparent;
    opacity: 0.3;
    cursor: default;
}

.email {
    text-decoration: underline;
    font-size: 18px;
    text-align: center;
    border-radius: 10px;
}

.error {
    outline: none;
    border: 2px solid red !important;
}

.loading {
  content: "";
  width: 20px;
  height: 20px;
  border: 4px solid #ccc;
  border-top-color: #2b2f35;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

</style>
