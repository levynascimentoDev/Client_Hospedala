<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: "modalConfirm",
    data() {
        return {
            inputValues: ["", "", "", "", "", ""],
            code: "",
        }
    },
    methods: {
        onInput(key: number) {
            // se tem valor no input 
            if (!this.inputValues[key])
            return;
            
            const match = this.inputValues[key].match(/^[0-9]$/)
            if (!match) {
                this.inputValues[key] = ""
            }

        }
    }

})
</script>

<template>
    <div class="modal-forgot">

        <div class="title">

            <h2>Insira o código de confirmação</h2>
            <p> Insira o código de 6 digitos que enviamos para.</p>
            <h1>a......@gmail.com</h1>

        </div>
        <div class="inputs">
            <input type="text" v-for="(value, key) in inputValues" :key maxlength="1" v-model="inputValues[key]" @input="onInput(key)">
        </div>
        <div class="footer">
            <button>Reenviar - codigo</button>
        </div>
    </div>
</template>

<style scoped>

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
    background-color: black;
    color: white;
    border-radius: 10px;
}

/* .footer button::before, button::after{
    content: '';
    width: 100px;
    background: #696969 ;
    height: 1px;
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;

} */


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