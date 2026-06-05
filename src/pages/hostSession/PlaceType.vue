<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<number | null>(null)

function selectBox(index: number) {
    selected.value = selected.value === index ? null : index
}
</script>


<template>
    <div class="container">
        <div class="content">
            <div class="title">
                <h1>Que tipo de espaço você oferece aos hóspedes?</h1>
                <p>Selecione a opção que melhor descreve o espaço que você está disponibilizando</p>
            </div>
            <div class="options">
                <div class="box" :class="{ active: selected === 1 }" @click="selectBox(1)">
                <div class="icon">
                    <div class="iconBlue">
                    <i class="bi bi-house-door-fill"></i>
                    </div>
                </div>
                <b><p>Espaço completo</p></b>
                <p class="subtitle">Os hóspedes têm acesso exclusivo a toda a propriedade, incluindo entrada privada</p>
                </div>
                <div class="box" :class="{ active: selected === 2 }" @click="selectBox(2)">
                <div class="icon">
                    <div class="iconGreen">
                    <i class="bi bi-door-open-fill"></i>
                    </div>
                </div>
                <b><p>Um quarto</p></b>
                <p class="subtitle">Os hóspedes têm seu próprio quarto privado e podem compartilhar algumas áreas comuns</p>
                </div>
                <div class="box" :class="{ active: selected === 3 }" @click="selectBox(3)">
                    <div class="icon">
                        <div class="iconPurple">
                        <i class="bi bi-people-fill"></i>
                    </div>
                    </div>
                    <b><p>Quarto compartilhado em um albergue</p></b>
                    <p class="subtitle">Os hóspedes dormem em um quarto compartilhado com outros viajantes</p>
                </div>
                <div class="button">
                <button>Continuar</button>
                </div>
            </div>
                
        </div>
    </div>
</template>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 30px;
        background-color: #F9FAFB;
    }
    .title {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin: 10px;
        margin-left: 35px;
    }
    .title p {
        color: #4B5563;
        margin-top: 20px;
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

    .content {
        display: flex;
        flex-wrap: wrap;
        
        width: 896px;
        height: 658.25px;
        padding: 20px;
        margin: 10px;
        text-align: center;

        border-radius: 16px;
        border: 0 solid #E5E7EB;
        background: var(--color-white-solid, #FFF);
        box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.10), 0 20px 25px 0 rgba(0, 0, 0, 0.10);
    }

    .box {
        display: flex;
        width: 245.328px;
        height: 336.25px;
        padding: 34px 34px 67.25px 34px;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        margin: 3px;

    
        border-radius: 12px;
        border: 2px solid #E5E7EB;
        background: #F9FAFB;

        transition: all 0.3s ease;
    }

    .box:hover {
        transform: scale(1.1);
    }

    .box.active {
        border-color: #0A7C3E;
    }

    .icon{
        width: 50px;
        height: 50px;
        background-color: #02552A;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        margin: 10px;
        margin-bottom: 20px;
    }

    .icon i {
        color: #FFF;
    }

    .subtitle {
        color: #4B5563;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 23px; 
    }

    button {
        display: flex;
        justify-content: center;
        width: 139.031px;
        height: 48px;
        padding: 14px 0 10px 0;
 
        align-items: center;
        flex-shrink: 0; 

        background-color: #000;
        color: #FFF;
        border-radius: 7px;
        margin: 30px;
        font-size: large;
        padding: 7px;
    }
    button:active {
    transform: scale(0.95); 
    }
    .button {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 250px;
    }
</style>