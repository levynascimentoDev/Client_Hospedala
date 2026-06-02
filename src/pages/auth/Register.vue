<script lang="ts">
import ModalMoreInfo from "../components/modal/ModalMoreInfo.vue";
import { useUserStore } from '../../stores/users.ts';
import { defineComponent } from 'vue';

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
    },
    created() {
        this.validateToken();
        const userStore = useUserStore();
        userStore.fetchUser();

        if (userStore.user) {
            return this.$router.push('/');
        }
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
