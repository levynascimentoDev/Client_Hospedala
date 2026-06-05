<script setup lang="ts">
import Footer from "../components/ui/Footer.vue"
import TopBar from "../components/ui/TopBar.vue";
</script>

<template>
    <div class="container">
        <TopBar :search="false" />
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
