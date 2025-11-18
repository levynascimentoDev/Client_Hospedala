<script lang="ts">
import { defineComponent } from 'vue';
import ModalMoreInfo from '../../components/auth/modal/ModalMoreInfo.vue';

export default defineComponent({
    components:{
        ModalMoreInfo,
    },
    methods:{
        async validateToken() {
            const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/tokens/complete_info`, {
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })

            if (!resp.ok) {
                this.$router.push('/login');
            }
        },
        async fetchAuth() {
            const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/users/me`, {
                headers:{
                    "Content-Type":"aplication/json"
                },
                credentials:"include"
            });
            

            if (resp.ok) {
                
                this.$router.push('/');
                

            } else {
                const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/refresh/token`, {
                    headers:{
                        "Content-Type":"aplication/json"
                    },
                    credentials:"include"
                });

                if (resp.ok) {
                    this.$router.push('/');
                } 
            }
        },
    },
    created() {
        this.validateToken();
        this.fetchAuth()
    }
})

</script>

<template>

    <div class="container">
        <section>
            <ModalMoreInfo />
        </section>
    </div>

</template>


<style scoped>
section {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
