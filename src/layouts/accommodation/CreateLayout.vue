
<script setup lang="ts">
import { Transition } from 'vue';
import { useWizardStep } from '../../composables/useWizardStep'

const { onContinue, onBack, canContinue } = useWizardStep()

const handleContinue =  async () => {
    if (onContinue.value) {
        await onContinue.value()
    } 
}

const handleBack = () => {
    if (onBack.value) {
        onBack.value()
    } 
}
</script>

<template>
    <div class="container">
        <div class="content">
            <Transition name="slide" mode="in-out">
                <RouterView v-slot="{ Component }">
                    <component :is="Component"/>
                </RouterView>
            </Transition>
        </div>
        <div class="bottom-bar">
            <button class="back" @click="handleBack">Voltar</button>
            <button class="next" @click="handleContinue" :disabled="!canContinue">Continuar</button>
        </div>
    </div>
</template>

<style scoped>

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
}

.content {
    flex: 1;
    overflow: auto;
    width: 100%;
}

.slide-enter-active {
    animation: slideEnter 0.3s ease-out;
}

.slide-leave-active {
    animation: slideLeave 0.3s ease-out;
}

@keyframes slideEnter {
    from {
        transform: translateX(-100px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideLeave {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(-100px);
        opacity: 0;
    }
}

.bottom-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 70px;
    height: 100px;
    width: 100%;
    border: 1px solid black;
}


.back {
    background-color: white;
    color: black;
    border: 1px solid black;
}

.next {
    background-color: black;
    color: white;
}

.back, .next {
    text-align: center;
    padding: 10px 15px;
    border-radius: 10px;
    transition: .2s ease-out;
}

.back:hover, .next:hover {
    opacity: 0.9;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.283);
}

.next:disabled {
    opacity: 0.3;
}


</style>