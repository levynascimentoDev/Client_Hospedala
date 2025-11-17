<template>
    <div class="top-bar">
        <Menu 
            :user="user"
            v-if="toogleMenu && user != null"
            @clickOutside="toogleMenu = false"
        />
        <div class="navigation">
            <div class="logo" @click="$router.push('/')">
                <h1>Hospedala</h1>
            </div>
            <nav class="buttons" type="button" v-if="isLogged">
                <button>
                    <i class="bi bi-bell"></i>
                </button>       
                <button class="button-menu" @click.stop="showMenu()">
                    <i class="bi bi-list"></i>
                    <img :src="user?.icon">
                </button>
            </nav>
            <router-link v-else-if="!isLogged && home" to="/login" class="link">Entre ou Cadastre-se</router-link>
        </div>
        <div class="search">
            <SearchBar v-if="home"/>
        </div>
        
        
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { User } from '../../types/types';
import Menu from './Menu.vue';
import SearchBar from '../home/searchBar.vue';

export default defineComponent({
    components: { 
        Menu,
        SearchBar
    },
    data() {
        return {
            toogleButton:false,
            toogleMenu:false,
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
        user:{
            type: Object as PropType<User | null>,
            required:false,
            default:null
        }
    },
    methods:{
        showMenu() {
            this.toogleMenu = !this.toogleMenu;
            return this.toogleMenu;
        },
    },
});


</script>
<style scoped>
    .top-bar {
        width: 100%;
        padding:10px 35px;
        background: white;
        display: flex;
        box-shadow: 0 3px 2px rgba(0, 0, 0, 0.3);
        align-items: center;
        justify-content: center;
        flex-direction: column;
        box-sizing: border-box;
        position: fixed;
        z-index: 9999;
        padding-top: 0;
        top: 0;
        gap: 15px;
    }

    .navigation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 15px;
    }

    .logo {
        cursor: pointer;
    }    

    .top-bar .logo h1 {
        position: relative;
        color: black;
        font-size: 30px;
    }
    
    .link {
        text-decoration: none;
        padding: 8px 10px;
        border-radius: 10px;
        transition: ease .3s ;
        background: rgba(79, 79, 79, 0.187);
        font-weight: 500;
    }
    .link:hover {
        background: rgb(0, 0, 0);
        color: white;
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
    
</style>