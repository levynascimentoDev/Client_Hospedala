<script setup lang="ts">
import { ref, watch } from 'vue';
import InputOtp from 'primevue/inputotp';
import { useAuthStore } from '../../../stores/auth';
import { useRouter } from 'vuetify/lib/composables/router.mjs';

const store = useAuthStore();
const router = useRouter()

const code = ref("");
const invalidCode = ref(false);

const buttondisabled = ref(false);

watch(code, async () => {
    if (code.value.length == 5) {        
        try {
            const response = await store.sendCode(code.value);
            if (response) {
                await router?.push(response.redirect)
            }
        } catch {
            invalidCode.value = true;
        }
    
    } else {
        invalidCode.value = false
    }
})

</script>

<template>
    <div 
        class="modal-forgot"
    >
        <div class="title">

            <h2>Insira o código de confirmação</h2>
            <p> Insira o código de 6 digitos que enviamos para.</p>
            <h1>{{ store.tempPayload?.email }}</h1>

        </div>
        <div class="inputs">
            <InputOtp
                v-model="code"
                :length="5"
                integer-only                
                :class="{ 'otp-error':invalidCode }"
            />
        </div>
        <div class="footer">
            <button
                :disabled="buttondisabled"
                @click=""
            >Reenviar - codigo</button>
        </div>
    </div>
</template>

<style scoped>

:deep(.otp-error .p-inputotp input) {
  border: 1px solid red !important;
  border-radius: 6px;
}

:deep(.otp-error .p-inputotp input:focus) {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
}

.modal-forgot {
    width: 350px;
    height: max-content;
    background: white;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    animation: slide linear .4s forwards;

}

.modal-forgot .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 260px;
}

.modal-forgot .title h1 {
    color: black;
    font-size: 14px;
}

.modal-forgot .title p {
    font-size: 11px;
}

.modal-forgot .title img {
    width: 30%;
    height: auto;
}

.title * {
    margin-top: 10px;
}

.footer {
    display: flex;
    width: 100%;
    gap: 8px;
    padding: 20px;
}

.footer .link {
    color: #4150F7;
    font-size: 11px;
    padding: 7px;
    text-decoration: none;
    transition: ease .2s;

}

.footer .link:hover {
    text-decoration: underline;

}

.footer button {
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    /* background-color: black; */
    /* color: white; */
    background-color: transparent;
    text-decoration: underline;
    border-radius: 10px;
}

.footer .create-account {
    font-size: 13px;
    text-decoration: none;
    border-radius: 10px;
    padding: 5px 10px;
}

.footer .create-account:hover {
    background: rgba(155, 155, 155, 0.377);
    transition: ease .3s;

}

.footer button {
    width: 100%;
    padding: 10px 0px;
    cursor: pointer;
    transition: ease .2s;

}

.footer button:hover {
    opacity: 0.8;
}

.inputs {
    gap: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.inputs input {
    width: 35px;
    height: 45px;
    text-align: center;
    font-size: 15px;
    border: 1px solid #DBDBDB;
    border-radius: 8px;

}

@keyframes slide {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);

    }
}
</style>