<template>
    <label for="#pin" class="input">
        <span>Senha</span>
        <input 
            type="password" 
            id="pin" placeholder="....." 
            v-model="password" 
            @input="$emit('password', password)" 
            ref="inputPassword"
            :class="{ 'input-error': isError }"
        />
        <i v-if="password.length" :class="classFied" @click="alterType"></i>
    </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
    name:"InputPassword",
    data() {
        return {
            password:"",
            classFied:"bi bi-eye-slash"
        }
    },
    methods:{
        alterType() {
            const input = this.$refs.inputPassword as HTMLInputElement;
            if (this.classFied === "bi bi-eye-slash") {
                this.classFied = "bi bi-eye"
                input.type = "text"
            } else{
                this.classFied = "bi bi-eye-slash"
                input.type = "password"
            }
        }
    },
    props:{
        isError:{
            type:Boolean,
            required:false,
            default:false
        }
    }

})

</script>


<style scoped>


.input {
    position: relative;
    width: 300px;
}

.input input {
    width: 100%;
    padding: 17px 10px 10px 10px;
    font-size: 15px;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding-right: 40px;
}

.input input::placeholder {
    font-size: 17px;
    letter-spacing: 2px;
    padding-left: 10px;
    font-weight: 500;
}
.input span {
    position: absolute;
    font-size: 11px;
    left: 10px;
    top: 3px;
    font-weight: 500;
}

.input i {
    user-select: none;
    transition: all .4s;
    position: absolute;
    font-size: 21px;
    left: 270px;
    top:10px;
    cursor: pointer;
}

.input-error {
    border: 1.7px solid red;
    box-shadow: 2px 4px 8px rgba(255, 0, 0, 0.2);
}


</style>