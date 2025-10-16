<template>
    <div class="top-bar">
        <div class="logo">
            <h1>Hospedala</h1>
        </div>
        <div v-if="home" class="links">
            <router-link class="link" to="/login">Entrar</router-link>
            <router-link class="link" to="/register">Cadastrar-se</router-link>
        </div>
        <button v-if="!home" class="link" @click="showBar">
            <i class="bi bi-gear-fill"></i>
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            toogleButton:false
        }
    },
    props:{
        home:{
            type:Boolean,
            required:false,
            default:true
        }
    },
    methods:{
        showBar() {
            this.$emit('show-bar')
        }
    },
});


</script>
<style scoped>
    .top-bar {
        width: 100%;
        padding: 25px 20px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        box-sizing: border-box;
        position: absolute;
        max-height: 100px;
        top: 0;
    }

    .top-bar .logo h1 {
        position: relative;
        color: black;
        font-size: 30px;
        padding-left: 10px;
    }
    
    .link {
        background: black;
        color: white;
        transition: all linear .2s;
        padding: 10px 15px;
        border-radius: 20px;
        cursor: pointer;
        text-decoration: none;
        margin: 10px 10px;
        font-weight: 600;
    }

    .link:hover {
        border: 1px solid black;
        /* box-shadow: 0 0 3px black; */
        box-shadow: inset 3px 3px 6px rgb(108, 107, 107);   
        background: white;
        color: black;
    }

    .link:hover i {
        color: black;
        font-size: 16px;
    }

    i {
        font-size: 16px;
    }

    .logo {
        display: block;
    }
    
    .links {
        display: block;
    }
    
</style>