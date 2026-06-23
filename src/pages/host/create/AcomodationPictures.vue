<script setup lang="ts" >
import { Icon } from '@iconify/vue'
import { ref } from 'vue'


interface PicturesFiles {
    arquivo: File,
    url: string 
}    


const fotos = ref<PicturesFiles[]>([]); 


    

const selecionarFotos = (event: Event) => {
    fotos.value = []

    const input = event.target as HTMLInputElement

    if (!input.files) {
        return
    }

    for (let i = 0; i < input.files.length; i++) {

        const arquivo = input.files[i]

        if (!arquivo) {
            continue
        }

        const foto = {
            arquivo: arquivo,
            url: URL.createObjectURL(arquivo)
        }

        fotos.value.push(foto)
    }
}
   
    
</script>

<template>
  <div class="container">

    <div class="top">
       <button
            class="back"
            @click=""
        >
        ← Voltar
        </button>

    </div>

    <div class="content">

    <div class="header">

        <h1>Adicione fotos da sua acomodação</h1>

        <p class="descpription">
        Faça upload de pelo menos 5 imagens para mostrar sua acomodação.
        </p>

    </div>

      <div class="contador">
        {{ fotos.length }}/5 imagens enviadas
      </div>

      <div class="upload">
        <div class="uploadTexts">
            <div class="iconeCam">
            <Icon               
                icon="icon-park-solid:camera"
                class="camera-icon"
    
            />
            </div>
            <p>Adicionar fotos</p>
        
        </div>

        <label for="meu-input-file" class="inputFile">
            + Selecionar arquivos
        </label>

        <input 
            id="meu-input-file"
            type="file" 
            multiple 
            accept="image/*" 
            @change="selecionarFotos" 
            style="display: none;"
        />

      </div>

      <div class="preview">

        <div
            class="photo"
            v-for="(foto, index) in fotos"
            :key="index"
        >
          <img
            :src="foto.url"
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

        <ul>
          <li>Boa iluminação</li>
          <li>Ângulos diversos</li>
          <li>Espaços organizados</li>
          <li>Detalhes importantes</li>
        </ul>

      </div>

      <button
        class="continuar"
        :disabled="fotos.length < 5"
      >
        Continuar
      </button>

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
    max-width:800px;
    margin:auto;
    padding:40px;
}

.header h1{
    margin-bottom:13px;

}

.description{
    color:#666;
    margin-bottom:20px;
}

.counter{
    font-weight:bold;
    margin-bottom:15px;
}

.upload{
    background:white;
    border:2px dashed #ccc;
    padding:130px;
    text-align:center;
    border-radius:10px;
    color: #666;
    gap: 1;
    font-size: 12;
}
.iconeCam{
    opacity: 9%;
}

.uploadTexts p{
    color: #66666653;
    margin-bottom: 13px;
    font-size: 16;
    margin-bottom: 18px;
}



.upload input{
    cursor:pointer;
}

.inputFile{
    background-color: #0f6d3d;
    border-radius: 8px;
    color: #fff;
    padding: 10px 20px;

}

.preview{
    display:flex;
    flex-wrap:wrap;
    gap:15px;
    margin-top:25px;
}

.photo{
    width:100px;
    height:100px;
}

.photo img{
    width:100%;
    height:100%;
    object-fit:cover;
    border-radius:8px;
}



.tip{
    margin-top:30px;
    background:white;
    padding:20px;
    border-radius:10px;
}

.dicas h3{
    margin-bottom:10px;
}

.dicas ul{
    margin-left:20px;
}

.dicas li{
    margin-bottom:8px;
}

.continue{
    margin-top:30px;
    width:100%;
    padding:15px;
    border:none;
    border-radius:8px;
    background:#0f6d3d;
    color:white;
    font-size:16px;
    cursor:pointer;
}



</style>