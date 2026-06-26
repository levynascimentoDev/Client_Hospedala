<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../../stores/users';
import { Icon } from '@iconify/vue';


const userStore = useUserStore();

const emit = defineEmits<{
    clickOutside:[value:boolean]
}>()

const showEmail = computed(() => {
    const newEmail = userStore.user?.email.replace('@gmail.com', '') as string;
    return `${userStore.user?.email[0]}${`*`.repeat(newEmail.length-2)}${newEmail[newEmail.length-1]}@gmail.com`
})

const userLogout = async () => {
    await userStore.fetchLogoutUser();
    await userStore.fetchUser()
}


</script>

<template>
    <div class="menu" ref="menu">
        <div class="user-info">
           <img class="avatar" v-if="userStore.user?.icon" :src="userStore.user?.icon">
            <span class="avatar">
                {{ userStore.user?.given_name[0]?.toLocaleUpperCase() }}
            </span>
           <span class="text-info">
                <h1>{{ userStore.user?.given_name }}</h1>
                <p>{{ showEmail }}</p>
           </span>
        </div>
        <nav class="navigator">
            <router-link  class="link" to="/">
                <Icon class="icon" height="20" width="20" icon="material-symbols:home-rounded"/> 
                <span>Inicio</span>
            </router-link>
            <router-link class="link" to="/accommodation/create">
                <Icon class="icon" height="20" width="20" icon="icon-park-solid:boy-one"/> 
                <span>Torne-se Anfitrião</span>
            </router-link>
            <router-link class="link" to="/travels">
                <Icon class="icon" height="20" width="20" icon="clarity:plane-solid"/> 
                <span>Minhas Viagens</span>
            </router-link>
            <router-link class="link" to="/favorites">
                <Icon class="icon" height="20" width="20" icon="mdi:heart"/> 
                <span>Favoritos</span>
            </router-link>
            <router-link class="link" to="/settings">
                <Icon class="icon" height="20" width="20" icon="bi:gear-fill"/> 
                <span>Configurações</span>
            </router-link>
            <button class="logout-button" type="button" @click="userLogout()"><img src="../../assets/icons/exit.svg" alt="Exit icon"/>  Sair</button>
        </nav>
    </div>
</template>

<style scoped>
* {
    color: #000;
}


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

.user-info img.avatar, .user-info span.avatar {
    border-radius: 100%;
    width: 40px;
    height: 40px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.2);
    background: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}


.user-info h1 {
    font-size: 16px;
    font-weight: 500;
}

.user-info p {
    font-size: 13px;
    white-space: normal;   
    word-wrap: break-word; 
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

.navigator > .link {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
}

.link .icon {
    color: rgb(118, 118, 118);
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