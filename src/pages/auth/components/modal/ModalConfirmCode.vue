<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: "modalConfirm",
    data() {
        return {
            inputValues:["", "", "", "", "", ""], 
            code: "",
        }
    },
    methods: {
        onInput(index:number) {

            const regex = /^[0-9]+$/

            if (this.inputValues[index] && !regex.test(this.inputValues[index])) {
                this.inputValues[index] = "";
            }
        
            if (this.inputValues[index]?.length) {
                const inputs = this.$refs.inputs as HTMLInputElement[]
                inputs[index+1]?.focus()
            }

        },
        onBackspace(index:number) {
            const inputs = this.$refs.inputs as HTMLInputElement[]

            // Se o input atual TEM valor
            if (this.inputValues[index]) {
                this.inputValues[index] = ""
                return
            }

            // Se está vazio → volta

            if (index > 0) {
                inputs[index - 1]?.focus()
            }
        },
        onPaste(event:ClipboardEvent) {
            const value = event.clipboardData?.getData("text") as string;
            const regex = /^[0-9]+$/

            console.log(value.length)

            if (!regex.test(value) && !(value.length == 6)) return;
            
            if (value) {
                console.log(value)
            } 
            // this.setCode
        }
    },
        
    mounted() {
        const inputs = this.$refs.inputs as HTMLInputElement[]
        if (!inputs) return;
        inputs[0]?.focus()
    },
    computed:{
        setCode() {
                if (this.inputValues.every(char => char.length)) {
                this.code = this.inputValues.toString()
            }
        }
    }

})
</script>

<template>
    <div 
        class="modal-forgot"
        @paste.prevent="onPaste($event)"
    >

        <div class="title">

            <h2>Insira o código de confirmação</h2>
            <p> Insira o código de 6 digitos que enviamos para.</p>
            <h1>a......@gmail.com</h1>

        </div>
        <div class="inputs">
            <input 
                ref="inputs" 
                type="text" 
                v-for="(_, key) in inputValues" 
                :key="key"
                maxlength="1" 
                v-model="inputValues[key]" 
                @input="onInput(key)"
                @keydown.backspace="onBackspace(key)"
            >
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