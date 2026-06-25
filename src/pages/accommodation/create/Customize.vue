<script setup lang="ts">
import { reactive } from 'vue'

interface FormData {
  title: string
  description: string
  price: number | null
}

const form = reactive<FormData>({
  title: '',
  description: '',
  price: null
})

function handleContinue() {
  console.log(form)
  // emit('next', form)
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1 class="title">Descrição da Acomodação</h1>
      <p class="subtitle">
        Descreva sua acomodação para atrair mais hóspedes
      </p>

      <div class="form-group">
        <label for="title">Título do local</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          placeholder="Ex: Casa de campo aconchegante"
        />
        <small>Um título curto e atraente funciona melhor.</small>
      </div>

      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="5"
          placeholder="Compartilhe o que torna seu espaço especial..."
        />
      </div>

      <div class="form-group">
        <label for="price">Preço por noite</label>
        <div class="price-input">
          <span>R$</span>
          <input
            id="price"
            v-model="form.price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0,00"
          />
        </div>
        <small>Você pode alterar isso a qualquer momento.</small>
      </div>
    </div>

    
  </div>
</template>



<style scoped>
.page {
  min-height: 100vh;
  background: #f8f8f8;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
  padding: 32px;
  border-radius: 20px ;
}

.title {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 8px;
  color: #1f2937;
}

.subtitle {
  font-size: 14px;
  margin: 0 0 32px;
  color: #6b7280;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #111827;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #111827;
  outline: none;
  box-sizing: border-box;
}

input::placeholder,
textarea::placeholder {
  color: #9ca3af;
}

input:focus,
textarea:focus {
  border-color: #2563eb;
}

textarea {
  resize: none;
}

small {
  display: block;
  margin-top: 8px;
  color: #9ca3af;
  font-size: 12px;
}

.price-input {
  display: flex;
  align-items: center;
  width: 160px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
}

.price-input span {
  padding: 12px;
  background: #f9fafb;
  border-right: 1px solid #d1d5db;
  font-size: 14px;
  color: #374151;
}

.price-input input {
  width: 100%;
  border: none;
  border-radius: 0;
}



</style>