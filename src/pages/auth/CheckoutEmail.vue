<script lang="ts">
import { defineComponent } from 'vue';
import ModalConfirmCode from '../components/modal/ModalConfirmCode.vue';

export default defineComponent({
    data() {
        return {
            
        }
    },
    components:{
        ModalConfirmCode
    }
})
</script>


<template>
    <div class="container">
        <section>
            <ModalConfirmCode />
        </section>
    </div>  
</template>