<script lang="ts">
import { defineComponent } from "vue";
import Footer from "../components/ui/Footer.vue"
import TopBar from "../components/ui/TopBar.vue";

export default defineComponent({
    components:{
        Footer,
        TopBar
    },
})
</script>

<template>
    <div class="container">
        <TopBar/>
        <RouterView/>
        <Footer/>
    </div>
</template>

<style scoped>
.homeSpace {
    margin-top: 180px;
}
main {
    flex: 1;
}
</style>
