<script setup lang="ts">
import Footer from "../components/ui/Footer.vue"
import TopBar from "../components/ui/TopBar.vue";
</script>

<template>
    <TopBar :search="false" />
    <RouterView/>
    <Footer/>
</template>

<style scoped>

</style>
