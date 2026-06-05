<script setup lang="ts">
import { defineComponent } from "vue";
import Footer from "../components/ui/Footer.vue"
import TopBar from "../components/ui/TopBar.vue";

</script>

<template>
    <div :class="['containerLayout','homeSpace']">
        <TopBar :search="true"/>
        <RouterView/>
        <Footer/>
    </div>
</template>

<style scoped>
.homeSpace {
    margin-top: 180px;
}

.containerLayout {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}
main {
    flex: 1;
}
</style>
