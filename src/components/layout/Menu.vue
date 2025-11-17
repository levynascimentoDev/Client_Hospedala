<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { User } from '../../types/types';

export default defineComponent({
    name:"menu",
    props:{
        user:{
            type:Object as PropType<User>,
            required:true
        },
    },
    methods:{
        showEmail() {
            const newEmail = this.user.email.replace('@gmail.com', '')
            return `${this.user.email[0]}${`*`.repeat(newEmail.length-2)}${newEmail[newEmail.length-1]}@gmail.com`
        },
        async userLogout() {
            
            const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/users/logout`,{
                method:'DELETE',
                credentials:"include"
            })
            
            if (resp.ok) {
                location.reload()
            }

        },
        handlerClickOutside(event:Event) {
            const menu = this.$refs.menu as HTMLElement
            if (menu && !(menu as HTMLElement).contains(event.target as Node)) {
                this.$emit('clickOutside', false)
            }
        }
    },
    mounted() {
        window.addEventListener('click', this.handlerClickOutside)
    },
    beforeUnmount() {
        window.removeEventListener('click', this.handlerClickOutside)
    }
    
})
</script>

<template>
    <div class="menu" ref="menu">
        <div class="user-info">
           <img :src="user.icon" alt="User Avatar">
           <span class="text-info">
                <h1>{{ user.name }}</h1>
                <p>{{ showEmail() }}</p>
           </span>
        </div>
        <nav class="navigator">
            <router-link  class="link" to="/"><img src="../../assets/icons/home.svg" alt="Home icon"/>   Inicio</router-link>
            <router-link  class="link" to="/coins"><img src="../../assets/icons/home.svg" alt="Coins icon"/>   Milha Coins</router-link>
            <router-link class="link" to="/travels"><img src="../../assets/icons/plane.svg" alt="Plane icon"/>   Minhas Viagens</router-link>
            <router-link class="link" to="/favorites"><img src="../../assets/icons/heart.svg" alt="Heart icon"/>   Favoritos</router-link>
            <router-link class="link" to="/rotalivre"><img src="../../assets/icons/rotaLivre.svg" alt="Rotalivre icon"/>   Rota livre</router-link>
            <router-link class="link" to="/settings"><img src="../../assets/icons/config.svg" alt="Config icon"/>   Configurações</router-link>
            <button class="logout-button" type="button" @click="userLogout"><img src="../../assets/icons/exit.svg" alt="Exit icon"/>  Sair</button>
        </nav>
    </div>
</template>

<style scoped>
.menu {
    width: 250px;
    padding: 5px;
    background: white;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;
    right: 25px;
    top: 90px;
    padding: 10px 10px;
    gap: 10px;
    z-index: 9999;
    animation: slideIn .2s ease forwards;
}


.menu .user-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 10px;
    gap: 20px;
}

.user-info img {
    border-radius: 100%;
    width: 40px;
    height: 40px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.2);
}


.user-info h1 {
    font-size: 16px;
    font-weight: 500;
}

.user-info p {
    font-size: 13px;
}

.navigator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-decoration: none;
    text-align: start;
    width: 100%;
    gap: 10px;
}

.navigator > .link, .logout-button {
    text-decoration: none;
    width: 100%;
    padding: 8px;
    padding-left: 25px;
    font-size: 17px;
    border-radius: 8px;
    transition: ease .1.5s;
    cursor: pointer;
}

.navigator > .logout-button {
    transition: .2s linear;
}

.navigator > .link img {
    margin-right: 10px;
}

.navigator .logout-button {
    text-align: center;
    border: 2px solid #E5E5E5;
    background: transparent;
    margin: 0;
    padding-left: 0;
}

.navigator .link:hover {
    background: #dddbdb9a;
}

.navigator .logout-button:hover {
    background: rgba(255, 0, 0, 0.349);
}

.navigator .logout-button {
    margin-top: 15px;
    border-radius: 8px;
    text-align: center;
}

.router-link-exact-active {
    background: #d1d1d1 !important;
} 

@keyframes slideIn {
    from {
        transform: translate(40px,  -40px);
        opacity: 0;
    }
    to {
        transform: translate(0, 0);
        opacity: 1;
    }
}



</style>