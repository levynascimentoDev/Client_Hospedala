<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {  onMounted, onUnmounted, ref, watch } from 'vue'
import { useWizardStep } from '../../../composables/useWizardStep'
import { useRouter } from 'vue-router'

const { onContinue, canContinue } = useWizardStep()
const router = useRouter()


onMounted(() => {
    canContinue.value = false;
    onContinue.value = async () => {
        await router.push('rules')
    }
    
})

onUnmounted(() => {
    onContinue.value = null
})

interface PicturesFiles {
    file?: File
    url: string
}

const modalShow = ref<string | null>(null)
const filesData = ref<PicturesFiles[]>([])
const fileenter = ref(false)

watch(filesData, (files) => {
    if (files.length >= 5) {
        canContinue.value = true
    }
}, { deep: true })

const selecionarFotos = (event: Event) => {
    if (filesData.value.length >= 5) return

    const input = event.target as HTMLInputElement
    if (!input.files) return

    for (const file of input.files) {
        filesData.value.push({
            file,
            url: URL.createObjectURL(file)
        })
    }
}

const dropfile = (event: DragEvent) => {
    if (filesData.value.length >= 5) return

    const files = event.dataTransfer?.files
    fileenter.value = false
    if (!files) return

    for (const file of files) {
        filesData.value.push({
            url: URL.createObjectURL(file),
            file
        })
    }
}

const removerFile = (index: number) => {
    fileenter.value  = false
    filesData.value.splice(index, 1)
}
</script>

<template>
  <div class="container">

    <Teleport to="#modal">
        <div class="overlay" v-if="modalShow != null">
            <div class="modal">
                <div class="top">
                    <button @click="modalShow = null" type="button">
                        <Icon icon="mdi:close" />
                    </button>
                </div>
                <div class="picture">
                    <img :src="modalShow" alt="Imagem selecionada">
                </div>
            </div>
        </div>
    </Teleport>

    <div class="content">

        <div class="header">
            <h1>Adicione fotos da sua acomodação</h1>
            <p class="description">
                Faça upload de pelo menos 5 imagens para mostrar sua acomodação.
            </p>
        </div>

        <div class="counter">
            {{ filesData.length }}/5 imagens enviadas
        </div>

        <div class="progress">
            <div
                class="progress-bar"
                :style="{ width: `${(filesData.length / 5) * 100}%` }"
            ></div>
        </div>

        <label
            class="upload"
            for="input-file"
            :class="{ 'file-enter': fileenter }"
            @dragenter.prevent="fileenter = true"
            @dragover.prevent="fileenter = true"
            @dragleave.prevent="fileenter = false"
            @drop.prevent="dropfile"
        >
            <div class="uploadTexts">
                <div class="iconeCam">
                    <Icon icon="icon-park-solid:camera" class="camera-icon" />
                </div>
                <p>Adicionar fotos</p>
            </div>

            <span class="inputFile">
                + Selecionar arquivos
            </span>

            <input
                id="input-file"
                type="file"
                multiple
                accept="image/*"
                @change="selecionarFotos"
                style="display: none;"
                
            />
        </label>

        <div class="preview" v-if="filesData.length">
            <div
                class="photo"
                v-for="(file, index) in filesData"
                :key="index"
                @click="modalShow = file.url"
            >
                <button class="icon" @click.stop="removerFile(index)">
                    <Icon icon="mdi:delete" color="red" width="24" height="24" />
                </button>
                <img :src="file.url" alt="Foto da acomodação">
            </div>
        </div>

        <div class="tips">
            <h3>
                <Icon icon="lets-icons:lamp-fill" style="color: yellow;" />
                Dicas para fotos incríveis
            </h3>

            <div class="tips-grid">
                <div>✓ Boa iluminação</div>
                <div>✓ Ângulos diversos</div>
                <div>✓ Espaços organizados</div>
                <div>✓ Detalhes importantes</div>
            </div>
        </div>

    </div>
  </div>
</template>

<style scoped>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}

.container {
    min-height: 100vh;
    background: #f5f5f5;
}

.content {
    width: 100%;
    max-width: 620px;
    margin: 40px auto;
    padding: 0 20px 120px;
}

.header h1 {
    margin-bottom: 10px;
    font-size: 14px;
}

.description {
    color: #666;
    margin-bottom: 10px;
    font-size: 13px;
}

.counter {
    font-size: 13px;
    font-weight: 600;
    margin-top: 15px;
    margin-bottom: 8px;
}

.progress {
    width: 100%;
    height: 6px;
    background: #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 20px;
}

.progress-bar {
    height: 100%;
    background: #166534;
    transition: .3s;
}

.upload {
    background: #fff;
    border: 1px dashed #d1d5db;
    border-radius: 12px;
    min-height: 205px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
    cursor: pointer;
    transition: .4 ease-out;
}

.iconeCam {
    opacity: 0.09;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.uploadTexts p {
    color: #66666653;
    font-size: 16px;
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.upload input {
    cursor: pointer;
}

.inputFile {
    background: #000;
    color: #fff;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
}

.preview {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 25px;
}

.photo {
    width: 100px;
    height: 100px;
    cursor: pointer;
    position: relative;
}

.photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.photo .icon {
    opacity: 0;
    transition: .2s ease;
}

.photo:hover .icon {
    opacity: 1;
}

.photo:hover img {
    opacity: 0.6;
}

.icon {
    position: absolute;
    z-index: 999;
    top: -10px;
    right: -10px;
    border-radius: 5px;
}

.file-enter {
    background-color: #ccc;
    opacity: 0.6;
}

.tips-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 10px;
    background-color: #ffffff;
    padding: 10px 18px;
    justify-content: center;
    align-items: center;
    border: 1px #6b6b6bb5;
    min-height: 100px;
    border-radius: 10px;
    font-size: 14px;
}

.tips h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    font-size: 13px;
}

</style>

<style>
.overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    background: white;
    border-radius: 16px;
    max-width: 90vw;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.modal .top {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 12px;
}

.modal .top button {
    color: black;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.modal .top button:hover {
    background: #f0f0f0;
}

.modal .picture {
    width: 100%;
    height: 350px;
    padding: 20px;
}

.modal .picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>