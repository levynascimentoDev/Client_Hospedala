<script setup slang="ts">
import { onBeforeUnmount, onMounted } from "vue";

onMounted(() => {
    document.body.style.overflow = "hidden"
})

onBeforeUnmount(() => {
    document.body.style.overflow = ""
})

</script>

<template>
    <div class="spiner-section">
        <span class="spinner"></span>
    </div>
</template>

<style scoped>
.spiner-section {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(87, 87, 87, 0.758);
    position: fixed;
    z-index: 999999999;
    inset: 0;

}
.spinner {
  width: 64px;
  height: 64px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #222222; /* azul moderno */
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>