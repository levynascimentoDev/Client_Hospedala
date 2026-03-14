<script lang="ts">
import { defineComponent } from "vue";
import Footer from "../components/Footer.vue"
import TopBar from "../components/TopBar.vue";

export default defineComponent({
    components:{
        Footer,
        TopBar
    }
})
</script>

<template>
    <div class="container">
        <TopBar/>
        <main>
            <slot/>
        </main>
        <Footer/>
    </div>
</template>

<style scoped>
main {
    margin-top: 180px;
    flex: 1;
}
</style>
