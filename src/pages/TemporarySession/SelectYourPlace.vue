<script setup lang="ts">
    import { ref } from 'vue'

    const selected = ref<number | null>(null)

    function selectBox(index: number) {
    selected.value = selected.value === index ? null : index
    }
</script>

<template>
    <div class="container">
    <div class="title">
    <h1>Selecione o que deseja anunciar</h1>
    <p>Por favor, descreva melhor o espaço que deseja anunciar.</p>
    </div>

    <div class="options">
        <div class="box" :class="{ active: selected === 0 }" @click="selectBox(0)">
            <div class="icon">
            <i class="bi bi-house-door-fill"></i>
            </div>
            <p><b>Casa</b></p>
            <p>Casa independente com espaço próprio</p>
        </div>
        <div class="box" :class="{ active: selected === 1 }" @click="selectBox(1)">
            <div class="icon">
            <i class="bi bi-buildings-fill"></i>
            </div>
            <p><b>Apartamento</b></p>
            <p>Unidade em edifício residencial</p>
        </div>
        <div class="box" :class="{ active: selected === 2 }" @click="selectBox(2)">
            <div class="icon">
            <i class="bi bi-arrow-through-heart-fill"></i>
            </div>
            <p><b>Motel</b></p>
            <p>Estadia curta</p>
        </div>
        <div class="box" :class="{ active: selected === 3 }" @click="selectBox(3)">
            <div class="icon">
            <i class="bi bi-house-heart-fill"></i>
            </div>
            <p><b>Pousada</b></p>
            <p>Hospedagem familiar e acolhedora</p>
        </div>
        <div class="box" :class="{ active: selected === 4 }" @click="selectBox(4)">
            <div class="icon">
            <i class="bi bi-star-fill"></i>
            </div>
            <p><b>Hotel</b></p>
            <p>Estabelecimento hoteleiro</p>
        </div>
        <div class="box" :class="{ active: selected === 5 }" @click="selectBox(5)">
            <div class="icon">
            <i class="bi bi-image-alt"></i>
            </div>
            <p><b>Resort</b></p>
            <p>Hotel grande com lazer completo</p>
        </div>
    </div>
    <button>Continuar</button>

    </div>
</template>

<style scoped> 
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 30px;
    }
    .options {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        width: 896px;
        height: 744px;
        padding: 10px;
        margin: 30px;
    }
    .box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    width: 282.656px;
    height: 232px;
    padding: 10px;
    border-radius: 16px;
    border: 2px solid #E5E7EB;
    background: #FFF;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.10),
                0 10px 15px rgba(0, 0, 0, 0.10);

    transition: all 0.3s ease;
    }

    .box:hover {
    transform: scale(1.1);
    }

    .box.active {
        border-color: #0A7C3E;
        box-shadow: 0 0 10px rgba(10, 124, 62, 0.4);
    }

    .icon{
        width: 50px;
        height: 50px;
        background-color: #000;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        margin: 10px;
        margin-bottom: 20px;
    }
    i {
        color: #FFF;
    }

    button {
        background-color: #000;
        color: #FFF;
        border-radius: 7px;
        margin: 10px;
        font-size: large;
        align-self: flex-end;
        margin-right: 100px;
        padding: 7px;
    }
    button:active {
    transform: scale(0.95); 
    }
</style>