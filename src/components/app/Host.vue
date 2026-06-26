<script setup lang="ts">
import { ref } from 'vue'

interface Props {
    isLoading?: boolean
    data?: {
        images: string[]
        title: string
        distance: string
        dates: string
        price: number
        isNew?: boolean
    }
}

const props = withDefaults(defineProps<Props>(), {
    isLoading: false,
    data: () => ({
        images: [
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
        ],
        title: 'Jericoacoara, Ceará',
        distance: 'A 320 km de distância',
        dates: '12–17 de jul.',
        price: 487,
        isNew: true,
    }),
})

const currentImage = ref(0)
const isFavorite = ref(false)

const nextImage = () => {
    if (currentImage.value < props.data.images.length - 1) {
        currentImage.value++
    }
}

const prevImage = () => {
    if (currentImage.value > 0) {
        currentImage.value--
    }
}

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value
}
</script>

<template>
    <div class="host-card" v-if="isLoading">
        <div class="image-wrapper skeleton-img"></div>
        <div class="info">
            <div class="skeleton-line" style="width: 70%; height: 16px;"></div>
            <div class="skeleton-line" style="width: 50%; height: 13px; margin-top: 8px;"></div>
            <div class="skeleton-line" style="width: 40%; height: 13px; margin-top: 6px;"></div>
            <div class="skeleton-line" style="width: 35%; height: 15px; margin-top: 10px;"></div>
        </div>
    </div>

    <div class="host-card" v-else>
        <div
            class="image-wrapper"
            @mouseenter="() => {}"
        >
            <img
                :src="data.images[currentImage]"
                :alt="data.title"
                class="host-image"
            />

            <button class="favorite-btn" @click="toggleFavorite" type="button">
                <i :class="isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
            </button>

            <span v-if="data.isNew" class="badge-new">
                <i class="bi bi-star-fill"></i> Novo
            </span>

            <button
                v-if="currentImage > 0"
                class="nav-btn nav-prev"
                type="button"
                @click.stop="prevImage"
            >
                <i class="bi bi-chevron-left"></i>
            </button>
            <button
                v-if="currentImage < data.images.length - 1"
                class="nav-btn nav-next"
                type="button"
                @click.stop="nextImage"
            >
                <i class="bi bi-chevron-right"></i>
            </button>

            <div class="dots" v-if="data.images.length > 1">
                <span
                    v-for="(_, i) in data.images"
                    :key="i"
                    class="dot"
                    :class="{ active: i === currentImage }"
                ></span>
            </div>
        </div>

        <div class="info">
            <h2 class="title">{{ data.title }}</h2>
            <p class="distance">{{ data.distance }}</p>
            <p class="dates">{{ data.dates }}</p>
            <p class="price">
                <strong>R$ {{ data.price.toLocaleString('pt-BR') }}</strong> noite
            </p>
        </div>
    </div>
</template>

<style scoped>
.host-card {
    display: flex;
    flex-direction: column;
    width: 220px;
    flex-shrink: 0;
    cursor: pointer;
}

.image-wrapper {
    position: relative;
    width: 100%;
    height: 220px;
    border-radius: 14px;
    overflow: hidden;
    background-color: #eee;
}

.host-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.favorite-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.35);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    transition: transform 0.15s ease;
}

.favorite-btn:hover {
    transform: scale(1.1);
}

.favorite-btn .bi-heart-fill {
    color: #ff385c;
}

.badge-new {
    position: absolute;
    top: 10px;
    left: 10px;
    background: white;
    color: #222;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.badge-new i {
    font-size: 9px;
}

.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.15s ease;
}

.image-wrapper:hover .nav-btn {
    opacity: 1;
}

.nav-prev {
    left: 8px;
}

.nav-next {
    right: 8px;
}

.dots {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 4px;
}

.dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
}

.dot.active {
    background: white;
}

.info {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
}

.title {
    font-size: 14px;
    font-weight: 600;
    color: #222;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.distance,
.dates {
    font-size: 13px;
    color: #717171;
    margin-top: 2px;
}

.price {
    font-size: 13px;
    color: #222;
    margin-top: 6px;
}

.price strong {
    font-weight: 600;
}

/* skeleton */
.skeleton-img {
    background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
}

.skeleton-line {
    background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
</style>