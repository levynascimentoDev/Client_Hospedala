<template>
    <div class="container">
        <section>
            <div class="box-inputs">
                <span v-if="isLoading" class="loading"></span>

                <h1 style="user-select: none;">Esqueceu senha!</h1>

                <span
                v-if="emailError"
                :class="{error:emailError}"
                >Este email é invalido!</span>

                <form method="post" @submit.prevent="requestAuth">
                <input 
                    type="email" 
                    id="email" 
                    autocomplete="email" 
                    v-model="email" 
                    placeholder="E-mail" 
                    required
                >

                
                <button 
                type="submit" 
                class="join"
                :disabled="isProcessing"
                >

                <span class="content">Entrar</span>
                </button>

                <span class="span">ou</span>
                
                <router-link to="/login" class="redirect-login">Já tenho um conta!</router-link>

                </form>
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import TopBar from '../components/TopBar.vue';
import ButtonAuthGoogle from '../components/ButtonAuthGoogle.vue';

export default defineComponent({
  setup() {
    const router = useRouter();
    return { router }
  },
  components: { 
    TopBar,
    ButtonAuthGoogle
  },
  data() {
    return {
        isLoading: ref<boolean>(false),
        isProcessing: ref<boolean>(false),
        email: ref<string>(""),
        emailError: ref<boolean>(false),
    }
  },
  methods: {
    async checkInputs() {
      if (!this.email.includes("@gmail.com")) {

        this.emailError = false;
        this.emailError = true;
        this.isLoading = false;
        return true;
    } else {
        return false;
    }
    },
    async requestAuth() {
      try {
        this.isLoading = true;
        setTimeout(() => {}, 1500)

        const input = await this.checkInputs()
        if (input) return;

        const response = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Grant-Type":"forgot-password"
          },
          body: JSON.stringify({
            email: this.email
          })
        });

        if (response.ok) {
          const values = await response.json() 
          return this.router.push(`/auth/checkout/forgot-password/${values.token}`);
        } 
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async Authorization() {
      const resp = await fetch('http://localhost:3000/api/auth/register/', {
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${this.$route.params.code}`
        }
      })
      if (resp.ok) return this.$router.push("/home");
    },
    processing(value:boolean) {
      this.isProcessing = value;
    }
  },
  created() {
    this.Authorization()
  },
  watch: {
    email() {
      this.emailError = false;
    } 
  }
});
</script>


<style scoped>

.span {
  margin-top: -17px;
  margin-bottom: -18px;
  margin-right: 5px;
  margin-left: 5px;
}
.span::before, .span::after {
  content: "";
  width: 100px;
  height: 1px;
  display: inline-flex;
  position: relative;
  top: -3px;
  margin: 3px;
  background: black;
}

section h1 {
  margin-bottom: 10px;
}

section .box-inputs form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  gap: 20px;
}

section .box-inputs form input {
  font-size: 16px;
  width: 210px;
  box-shadow: 0 0 3px black;
}

.box-inputs {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: black;
  background: white;
  padding: 20px;
  border-radius: 10px;
}

.box-inputs * {
  color: black;
}

button {
  border: none;
  box-shadow: 0 0 3px black;
}

.join {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(11, 132, 238, 0.913);
  transition: all linear .2s;
  font-size: 17px;
  font-weight: 600;
  width: 250px;
}

.join:hover {
  background: black;
  color: white;
}

.join:not(:disabled):hover .content {
  color: white;
}

.join:disabled {
  background: rgba(11, 132, 238, 0.744);
  cursor: default;
  opacity: 0.9;
}

button:disabled {
  opacity: 0.9;
  background: rgba(215, 211, 211, 0.849);
  cursor: default;
}


.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading::after {
  content: "";
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top-color: #2b2f35;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.redirect-login {
  color: rgb(0, 63, 99);
  font-weight: 600;
  text-decoration: none;
}

.redirect-login:hover {
  text-decoration: underline;
}

.inputerro {
  border: 2px solid red;
  outline-color: red;
}

.error {
  text-align: center;
  width: 200px;
  padding: 8px 15px;
  border: 1px solid red;
  background: rgba(255, 0, 0, 0.2);
  border-radius: 5px;
  color: red;
  font-weight: 400;
  position: relative;
  animation: shake .5s;
}
@keyframes shake {
  0% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}
</style>
