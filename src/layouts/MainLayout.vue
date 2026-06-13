<script setup lang="ts">
import Footer from '../components/ui/Footer.vue';
import TopBar from '../components/ui/TopBar.vue';
</script>

<template>
  <div :class="['layout', 'spacing-top']">
    <TopBar :search="true" />

    <main class="content">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.spacing-top {
    margin-top: 180px;
}
.content {
  flex: 1;
}
</style>