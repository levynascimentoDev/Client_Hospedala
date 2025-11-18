<script lang="ts">
import { defineComponent } from 'vue';
import ModalMoreInfo from '../../components/auth/modal/ModalMoreInfo.vue';

export default defineComponent({
    components:{
        ModalMoreInfo,
    }
})

</script>

<template>

    <div class="container">
        <section>
            <ModalMoreInfo @data="" />
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
