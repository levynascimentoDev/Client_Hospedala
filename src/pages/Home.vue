<template>
    <div class="conatiner">
        <section>
            <TopBar :home="false" @show-bar="handleShowBar" /> 
            <RightBar :user="user" v-if="showBar" @close="handleCloseBar"/>
            <h1>Sejá bem vindo a hospedalá {{ user.name }}</h1>
            
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { type User } from '../types/types';
import { useRouter } from 'vue-router';
import TopBar from '../components/TopBar.vue';
import RightBar from '../components/RightBar.vue';


export default defineComponent({
    name:"Home",
    data() {
        return {
            user:{} as User,
            showBar:false
        }
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    components:{
        TopBar,
        RightBar
    },
    methods:{
        handleShowBar() {
            this.showBar = true;
        },
        handleCloseBar() {
            this.showBar = false;
        },
        async Authorization() {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            if (!resp.ok) {
                return this.router.push("/")
            } else {
                const user:User = await resp.json() as User
                this.user = user 
            }
        }
    },
    created() {
        this.Authorization()
    }
})
</script>

<style scoped>
@media (max-width: 600px) {

    section {
      text-align: center;
    }
    h1{
      font-size: 19px;
    }     

    h2 {
      font-size: 26px !important;
    }


}
</style>