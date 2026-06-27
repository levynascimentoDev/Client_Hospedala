<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useWizardStep } from '../../../composables/useWizardStep'
import { useRouter } from 'vue-router'
import { useAccommodationWizardStore } from '../../../stores/accomodation'
import type { SpaceType } from '../../../types'

const router = useRouter()

const value = ref("")

const { canContinue, onContinue, onBack, canBack } = useWizardStep()
const store = useAccommodationWizardStore();

canContinue.value = true
canBack.value = true;

onMounted(() => {

    if (store.accommodation?.spacetype) {
        value.value = store.accommodation.spacetype
    }
})

onContinue.value = async () => {
    const ok = await store.setSpace(value.value as SpaceType)
    if (ok) {
        await router.push(`services`)
    };
}

onBack.value = () => {
    router.push(`property`)
}

const selectBox = (v: string) => {
  value.value = v
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
        <div class="box" :class="{ active: value === 'ALL' }" @click="selectBox('ALL')">
          <div class="icon">
            <div class="iconBlue">
              <i class="bi bi-house-door-fill"></i>
            </div>
          </div>
          <b><p>Espaço completo</p></b>
          <p class="subtitle">
            Os hóspedes têm acesso exclusivo a toda a propriedade, incluindo entrada privada
          </p>
        </div>

        <div class="box" :class="{ active: value === 'BEDROOM' }" @click="selectBox('BEDROOM')">
          <div class="icon">
            <div class="iconGreen">
              <i class="bi bi-door-open-fill"></i>
            </div>
          </div>
          <b><p>Um quarto</p></b>
          <p class="subtitle">
            Os hóspedes têm seu próprio quarto privado e podem compartilhar algumas áreas comuns
          </p>
        </div>

        <div class="box" :class="{ active: value === 'ALBERG' }" @click="selectBox('ALBERG')">
          <div class="icon">
            <div class="iconPurple">
              <i class="bi bi-people-fill"></i>
            </div>
          </div>
          <b><p>Quarto compartilhado em um albergue</p></b>
          <p class="subtitle">
            Os hóspedes dormem em um quarto compartilhado com outros viajantes
          </p>
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
  background-color: #f9fafb;
}

.title {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 10px;
}

.title p {
  color: #4b5563;
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
  border: 0 solid #e5e7eb;
  background: #fff;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1), 0 20px 25px rgba(0, 0, 0, 0.1);
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
  border: 2px solid #e5e7eb;
  background: #f9fafb;
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 16px;
}

.icon i {
  color: #fff;
}

.box b p {
  margin-bottom: 8px;
}

.subtitle {
  color: #4b5563;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  max-width: 480px;
}
</style>