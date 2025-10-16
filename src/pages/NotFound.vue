<template>
  <div class="container">
    <section>
      
      <div class="not-found">
        
        <h1>404</h1>
        <div>
          
          <h2>Pagina Não Encontrada</h2>
          <p>A rota que você tentou acessar não existe.</p>
          <router-link class="button" to="/">Voltar para a página inicial</router-link>
        </div>

      </div>
    </section>
  </div>
    
</template>

<script>
export default {

}
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}


.not-found h1 {
  font-size: 80px;
}


.not-found * { 
  margin-top: 10px;
}

.button {
  display: inline-block;
  margin-top:15px;
  text-decoration: none;
  padding: 7px 10px;
  background: white;
  color: black;
  font-weight: 600;
  border-radius: 10px;
  transition: all linear .3s;
}

.button:hover {
  box-shadow: inset 4px 6px 7px rgb(108, 107, 107);
}
</style>
