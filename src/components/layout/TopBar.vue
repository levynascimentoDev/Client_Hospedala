<template>
    <div class="top-bar">
        <Menu 
            :user="user"
            v-if="toogleMenu"
            @clickOutside="toogleMenu = false"
        />
        <div class="logo">
            <h1>Hospedala</h1>
        </div>
        <div v-if="!home" class="links">
            <router-link class="link"  to="/">
                <i class="bi bi-airplane-fill"></i>
                <span>Hospedagens</span>
            </router-link>
        </div>
        <ul v-else-if="!isLogged" class="buttons">
            <li><router-link to="/login" class="login" >Entrar</router-link></li>
            <li><router-link to="/register" class="register">Cadastrar-se</router-link></li>
        </ul>
        <nav class="buttons" type="button" v-else>

            <button>
                <i class="bi bi-bell"></i>
            </button>   

            <button class="button-menu" @click.stop="showMenu()">
                <i class="bi bi-list-task"></i>
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200" alt="Icone do user" class="user-icon">
            </button>
        </nav>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';
import type { User } from '../../types/types';
import Menu from './Menu.vue';

export default defineComponent({
    components: { 
        Menu 
    },
    data() {
        return {
            toogleButton:false,
            toogleMenu:false,
            user:ref<User>({
                name:"teste",
                email:"teste@gmail.com",
                admin:false,
                id:122313123,
                icon:"http://localhost:5000/src/assets/imgs/Apresentation2.png"
            })
        }
    },
    props:{
        home:{
            type:Boolean,
            required:false,
            default:true
        },
        isLogged:{
            type:Boolean,
            required:false,
            default:false

        },
        data:{
            type: Object as PropType<{email:string, name:string, icon:string}>,
            required:false
        }
    },
    methods:{
        showBar() {
            this.$emit('show-bar')
        },
        showMenu() {
            this.toogleMenu = !this.toogleMenu;
            return this.toogleMenu;
        }
    },
});


</script>
<style scoped>
    .top-bar {
        width: 100%;
        padding: 10px 35px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        box-sizing: border-box;
        position: fixed;
        max-height: 100px;
        top: 0;
        z-index: 9999;
        box-shadow: 0 3px 2px rgba(0, 0, 0, 0.3);
    }

    .top-bar .logo h1 {
        position: relative;
        color: black;
        font-size: 30px;
    }
    
    .links {
        display: block;
        margin-right: 40px;
    }
    .link {
        position: relative;
        color: black;
        border-radius: 7px;
        cursor: pointer;
        text-decoration: none;
        margin: 10px 10px;
        font-weight: 600;
        font-size: 18px;
        display: flex;
        gap: 5px;
    }
    ul {
        display: flex;
        align-items: center;
        justify-content: center;
        height: max-content;
    }

    ul li {
        list-style: none;
        gap: 10px;
        transition: .3s all ease;
    }
    

    ul li:hover{
        transform: translateY(-2px);
    }

    .login {
        padding: 10px;
        border: 2px solid black;
        border-radius: 10px;
        text-decoration: none;
        margin: 20px;
    }

    .register {
        padding: 10px;
        background: #02552A;
        font-weight: 500;
        color: white;
        text-decoration: none;
        border-radius: 10px;
        transition: .2s ease;
    }

    
    .link::after {
        content: ' ';
        display: inline-block;
        height: 2px;
        background: black;
        position: absolute;
        width: 0;
        bottom: -2px;
        left: 0;
        transition: all linear .3s;
    }

    .link:hover::after {
        width: 100%;
    }

    .link > span {
        display: block;
    }

    .link > i {
        margin-left: 5px ;
        display: block;
    }
    
    .logo {
        display: block;
    }
    
    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent ;
        gap: 7px;
    }

    
    
    .buttons button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        cursor: pointer;
    }
    
    .buttons button > i {
        font-size: 22px;
    }
    
    .buttons > .button-menu {
        border: 2px solid #D4D4D4;
        border-radius: 10px;
        gap: 8px;
        
    } 
    
    .buttons button > img {
        width: 35px;        
        height: 34px;
        border-radius: 100%;
    }
    

    /* @media (max-width: 600px) {
        .top-bar {
            flex-direction: row;
            justify-content: space-between;
            padding: 15px 5px;
        }

        .top-bar .logo h1 {
            font-size: 22px;
            padding-left: 5px;
        }

        .link {
            padding: 8px 12px;
            font-size: 12px;
            margin: 5px;
        }

        button.link {
            display: block;
        }
    }
     */
</style>