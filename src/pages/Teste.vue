<template>
  <div class="container">
    <section>
      <!-- Skeleton enquanto carrega -->
      <!-- <div v-if="loading" class="skeleton-card" v-for="n in 6" :key="n"> -->
        <div class="skeleton-image"></div>
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
      <!-- </div> -->

      <!-- Conteúdo real -->
      <!-- <div v-else class="card" v-for="item in items" :key="item.id">
        <img :src="item.image" alt="Produto" />
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
      </div> -->
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const loading = ref(true);
const items = ref([]);

onMounted(async () => {
  // Simula carregamento de API
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Conteúdo real
  items.value = [
    { id: 1, name: "Produto 1", description: "Descrição 1", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Produto 2", description: "Descrição 2", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Produto 3", description: "Descrição 3", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Produto 4", description: "Descrição 4", image: "https://via.placeholder.com/150" },
    { id: 5, name: "Produto 5", description: "Descrição 5", image: "https://via.placeholder.com/150" },
    { id: 6, name: "Produto 6", description: "Descrição 6", image: "https://via.placeholder.com/150" },
  ];

  loading.value = false;
});
</script>

<style scoped>
/* Container principal */
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

/* Section representa a página / área de cards */
section {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

/* Skeleton cards */
.skeleton-card {
  width: 150px;
  height: 250px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #e0e0e0;
  position: relative;
  overflow: hidden;
}

/* Skeleton shimmer */
.skeleton-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  width: 150px;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  animation: shimmer 1.2s infinite;
}

/* Partes do skeleton */
.skeleton-image {
  width: 100%;
  height: 100px;
  border-radius: 4px;
  background-color: #ccc;
  margin-bottom: 10px;
}
.skeleton-title {
  width: 80%;
  height: 20px;
  border-radius: 4px;
  background-color: #ccc;
  margin-bottom: 6px;
}
.skeleton-text {
  width: 100%;
  height: 12px;
  border-radius: 4px;
  background-color: #ccc;
}

/* Conteúdo real */
.card {
  width: 150px;
  height: 250px;
  border-radius: 8px;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.card img {
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
}

.card h3 {
  font-size: 1rem;
  margin: 0;
  text-align: center;
}

.card p {
  font-size: 0.8rem;
  color: #555;
  text-align: center;
}

/* Animação shimmer */
@keyframes shimmer {
  0% { transform: translateX(-150px); }
  100% { transform: translateX(150px); }
}
</style>
