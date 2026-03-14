<script lang="ts">
import TopBar from '../../../components/TopBar.vue';
import Footer from '../../../components/Footer.vue';
import { defineComponent } from 'vue';


export default defineComponent({
    components:{
        TopBar,
        Footer
    },
    props:{
        
    }
})
</script>

<template>

    <div class="main">
        <TopBar />

        <Footer />
    </div>

</template>