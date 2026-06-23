<script setup lang="ts" >
import { Icon } from '@iconify/vue'
import { onMounted, onUnmounted,  ref, watch } from 'vue'

import { useWizardStep } from '../../../composables/useWizardStep'
import { useRouter } from 'vue-router'

const { onContinue, canContinue } = useWizardStep()
const router = useRouter()

onMounted(() => {
    canContinue.value = false;
    onContinue.value = async () => {
        await router.push('/accommodation/create/23osjiddjsidjdjsd/place-type')
    }
})

onUnmounted(() => {
    onContinue.value = null;
})

interface PicturesFiles {
    file: File,
    url: string 
}  


const filesData = ref<PicturesFiles[]>([]); 
const fileenter = ref(false);

watch(filesData, (files) => {
    if (files.length >= 5) {
        canContinue.value = true;
    }
}, {
    deep:true
})

const selecionarFotos = (event: Event) => {
    if (filesData.value.length >= 5) {
        return
    }

    const input = event.target as HTMLInputElement

    if (!input.files) {
        return
    }

    for (const file of input.files) {

        filesData.value.push({
            file:file,
            url:URL.createObjectURL(file)
        })

    }
}


const dropfile = (event:DragEvent) => {

    const files = event.dataTransfer?.files;

    if (!files) return;

    for (const file of files) {
        filesData.value.push({
            url:URL.createObjectURL(file),
            file:file
        })
    }

}


    
</script>

<template>
  <div class="container">

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
        :class="{ 'file-enter':fileenter }"
        @dragover.prevent="fileenter = true"
        @drop.prevent="dropfile"
    >
        <div class="uploadTexts">
            <div class="iconeCam">
            <Icon               
                icon="icon-park-solid:camera"
                class="camera-icon"
    
            />
            </div>
            <p>Adicionar fotos</p>
            
        
        </div>

        <span  class="inputFile">
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
        >
          <img
            :src="file.url"
            alt="Foto da acomodação"
          >
        </div>

      </div>

      <div class="tips">

        
        <h3>
            <Icon
                icon = 'lets-icons:lamp-fill'
                style="color: yellow;"
            />
            Dicas para fotos incríveis</h3>

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

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, Helvetica, sans-serif;
}

.container{
    min-height:100vh;
    background:#f5f5f5;
}

.file-enter {
    background-color: #ccc;
}

.top{
    background:white;
    padding:20px 40px;
    display:flex;

    justify-content:space-between;
    border-bottom:1px solid #ddd;
}
.back{
    background:none;
    border:none;
    cursor:pointer;
    font-size:14px;
    color:#333;
}

.back:hover{
    text-decoration:underline;
}

.content{
    width:100%;
    max-width:620px;
    margin:40px auto;
    padding: 0 20px 120px;
}

.header h1{
    margin-bottom:10px;
    font-size: 14px;
}

.description{
    color:#666;
    margin-bottom:10px;
    font-size: 13px;
}

.counter{
    font-size:13px;
    font-weight:600;
    margin-top:15px;
    margin-bottom:8px;
}

.progress{
    width:100%;
    height:6px;
    background:#e5e7eb;
    border-radius:999px;
    overflow:hidden;
    margin-bottom:20px;
}

.progress-bar{
    height:100%;
    background:#166534;
    transition:.3s;
}

.upload{
    background:#fff;
    border:1px dashed #d1d5db;
    border-radius:12px;
    min-height:205px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:12px;
    margin-top:16px;
    cursor: pointer;
}
.iconeCam{
    opacity: 0.09;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}

.uploadTexts p{
    color: #66666653;
    margin-bottom: 13px;
    font-size: 16;
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}




.upload input{
    cursor:pointer;
}

.inputFile{
    background:#000;
    color:#fff;

    padding:10px 18px;

    border-radius:8px;

    font-size:14px;
    font-weight:500;

    cursor:pointer;

}

.preview{
    display:flex;
    flex-wrap:wrap;
    gap:15px;
    margin-top:25px;
}

.photo{
    width:50px;
    height:50px;
}

.photo img{
    width:100%;
    height:100%;
    object-fit:cover;
    border-radius:8px;
}



.tips-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:16px;
    margin-top:10px;
    background-color: #ffffff;
    padding:10px 18px;
    justify-content:center;
    align-items:center;
    border:1px  #6b6b6bb5;
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

.continue {
    width: auto;
    height: 48px;
    padding: 0 20px;
    background: #166534;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}

.continue:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    display: flex;
    justify-content: space-between;

    padding: 16px 40px;

    background: white;
    border-top: 1px solid #e5e7eb;

    align-items: center;

}

.back{
    background: transparent;
    border: 1px solid #d1d5db;
    padding: 10px 18px;
    border-radius: 8px;

    cursor: pointer;
    font-weight: 500;
}



</style>