<script setup lang="ts">
import { ref } from 'vue';
import { useWizardStep } from '../../../composables/useWizardStep';
import { useRouter } from 'vue-router'

const selected = ref<number | null>(null)


const router = useRouter()

const { canContinue, onBack, onContinue } = useWizardStep()

canContinue.value = true
onContinue.value = async () => {
    await router.push(`/accommodation/create/ejwidjajwj/acomodation-pictures`)
} 

const selectBox = (index: number) => {
    selected.value = selected.value === index ? null : index
}
</script>


<template>
    <div class="container">
        <div class="content">
            <div class="title">
                <h2>Que tipo de espaço você oferece aos hóspedes?</h2>
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
}

.title p {
    color: #4B5563;
    margin-top: 12px;
}

.content {
    display: flex;
    flex-direction: column;
    padding: 30px;
    margin: 10px;
    text-align: center;
    max-width: 700px;
    border-radius: 16px;
    border: 0 solid #E5E7EB;
    background: #FFF;
    box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.10), 0 20px 25px 0 rgba(0, 0, 0, 0.10);
}

.options {
    display: flex;
    flex-direction: row;
    gap: 16px;
    width: 100%;
}

.box {
    display: flex;
    padding: 24px;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    border-radius: 12px;
    border: 2px solid #E5E7EB;
    background: #F9FAFB;

    transition: all 0.2s ease;
}

.box:hover {
    transform: scale(1.02);
    border-color: #000;
}

.box.active {
    border-color: #000;
    background: #bebebe68;
}

.icon {
    width: 50px;
    height: 50px;
    background-color: #000;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    margin-bottom: 16px;
}

.icon i {
    color: #FFF;
}

.box b p {
    margin-bottom: 8px;
}

.subtitle {
    color: #4B5563;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    max-width: 480px;
}

.button {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 24px;
}

button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 139px;
    height: 48px;

    background-color: #000;
    color: #FFF;
    border-radius: 7px;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.1s ease;
}

button:active {
    transform: scale(0.95);
}
</style>