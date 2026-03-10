<script lang="ts">
import TopBar from '../../../components/layout/TopBar.vue';
import Footer from '../../../components/layout/Footer.vue';
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