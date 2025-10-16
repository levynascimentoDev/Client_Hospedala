<template>
  <div class="container">
    <section>
      <div class="login">
        <span v-if="isLoading" class="loading"></span>

        <h1 style="user-select: none;">Login</h1>

        <span
          v-if="inputsError"
          class="error"
          >Email ou senha Incorretos!</span>
          
        <span
          v-if="emailError"
          class="error"
        >Este email é invalido!</span>

        <form @submit.prevent="requestAuth">
          
          <input 
            :class="{ inputerro:inputsError || emailError }"
            type="email" 
            id="email" 
            autocomplete="email" 
            v-model="email" 
            placeholder="E-mail" 
            required
          >

          <input 
            :class="{ inputerro:inputsError}"
            type="password" 
            v-model="password" 
            placeholder="Senha" 
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

          <ButtonAuthGoogle :is-login="true" ref="googleButton" @load="processing"/>
          <router-link class="redirect" to="/login/forgot-password">Esqueci minha senha!</router-link>
          <p>
            Não tenho uma conta! 
            <router-link to="/register" class="redirect">Cadastre-se</router-link>
          </p>

        </form>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import TopBar from '../components/TopBar.vue';
import ButtonAuthGoogle from '../components/ButtonAuthGoogle.vue';

export default defineComponent({
  components: { 
    TopBar,
    ButtonAuthGoogle
  },
  setup() {
    const router = useRouter();
    return { router }
  },
  data() {
    return {
      isLoading: false,
      isProcessing: false,
      email: "",
      password: "",
      emailError: false,
      inputsError: false
    }
  },
  methods: {
    async checkInputs() {
      if (!this.email.includes("@gmail.com")) {
        setTimeout(() => {}, 1000)
        this.emailError = true;
        this.isLoading = false;
        return true;
      }
      return false;
    },
    async requestAuth() {
      try {
        this.inputsError = false;
        this.emailError = false;
        this.isLoading = true;

        const input = await this.checkInputs();
        if (input) return;

        const response = await fetch(`https://api.hospedala.com/api/auth/login`, {
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (response.ok) {
          const values = await response.json();
          this.router.push(`/auth/checkout/login/${values.token}`);
        }

        this.inputsError = true;
      } catch (err) {
        this.inputsError = true;
      } finally {
        this.isLoading = false;
      }
    },
    processing(value: boolean) {
      this.isProcessing = value;
    },
    async Authorization() {
      const resp = await fetch(`https://api.hospedala.com/api/users/me`, {
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      if (resp.ok) return this.router.push("/home");
    }
  },
  created() {
    this.Authorization()
  },
  watch: {
    email() {
      this.emailError = false;
      this.inputsError = false;
    },
    password() {
      this.emailError = false;
      this.inputsError = false;
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

section .login form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  gap: 20px;
}

section .login form input {
  font-size: 16px;
  width: 210px;
  box-shadow: 0 0 3px black;
}

.login {
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

.login * {
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

.redirect {
  margin-top: -10px;
  margin-bottom: -10px;
  gap: 0;
  color: rgb(0, 63, 99);
  font-weight: 600;
  text-decoration: none;
}

.redirect:hover {
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
