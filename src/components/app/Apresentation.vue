<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Apresentation",
    data() {
        return {
            index:0,
        }
    },
    mounted() {
        setInterval(() => {
            this.index = (this.index + 1) % 2;
        }, 4000);          
    }

});
</script>

<template>
    <div class="span-slides">
        <div
            class="slides"
            :style="{ transform: `translateX(-${index * 100}%)` }"
        >
            <div class="slide">
                <img
                    src="../../assets/imgs/Apresentation1.png"
                    alt="imagem de apresentação"
                />
                <router-link to="#" class="button">
                    Saiba mais sobre RotaCoins
                </router-link>
            </div>

            <div class="slide">
                <img
                    src="../../assets/imgs/Apresentation2.png"
                    alt="imagem de apresentação"
                />
            </div>

        </div>
    </div>
</template>

<style scoped>
.span-slides {
    margin-top: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
    padding-bottom: 10px;
}

.slides {
    display: flex;
    width: 200%; 
    transition: 0.8s ease-in-out;
}

.slide {
    min-width: 100%;
    box-sizing: border-box;
    height: auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px 0;
}

.slide img {        
    user-select: none;
    border-radius: 20px;
    width: 65%;
    height: auto;
    display: block;
    border-radius: 12px;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.4);
}

.button {
    position: absolute;
    bottom: 40px;
    left: 320px;
    font-size: 10px;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    background-color: #026331;
    transition: 0.3s;
}

.button:hover {
    background-color: #064d28;
}
</style>
