<script setup lang="ts">
import { useWizardStep } from '../../../composables/useWizardStep';


const { onContinue, canContinue, canBack } = useWizardStep()

canContinue.value = true;
canBack.value = false;
onContinue.value = async () => {
    
}


</script>

<template>
    <div class="conatiner">
        <div>
            <h1>Voce deseja criar uma acomodação ??</h1>
        </div>
    </div>    
</template>

<style scoped>
.container {
    align-items: center;
    justify-content: center;
}

.container div {
    display: flex;
}
</style>