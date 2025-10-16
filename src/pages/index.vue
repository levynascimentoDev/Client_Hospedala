  <template>
    <div class="container">
      <section>
        <TopBar />
        <div class="title">
          <h1>Olá, seja bem-vindo à Hospedala</h1>
          <h2 v-if="message.length > 0">{{ message }}</h2>
        </div>

      </section>

      <section class="content">
        
        <h1>HOSPEDALÁ</h1>

      </section>

    </div>

  </template>

  <script >

  import TopBar from '../components/TopBar.vue'

  export default {
    name:"login",
    data() {
      return {
        message:"",
      }
    },
    components: { TopBar },
    mounted(){
      const message = "AQUI SUA HOSPEDAGEM RENDE MAIS!";
      let index = 0;
      const interval = setInterval(() => {
        if (index+1 == message.length) {
          clearInterval(interval)
        };
        this.message += message[index];
        index++;
        
      },70)
    },
    methods:{
      async Authorization() {
        const resp = await fetch(`https://api.hospedala.com/api/users/me`, {
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include"
        })
        if (resp.ok) return this.$router.push("/home");
      }
    },
    created(){
      this.Authorization();
    },
    
  }

  </script>

  <style scoped>

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: max-content;
    max-width: 100;
  }

  section {
    width: 100%;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .title {
    flex: 1; 
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .title h1 {
    color: white;
  }

  .title h2 {
    padding: 0px 10px;
    color: white;
    font-size: 40px;
  }

  .content h1 {
    font-size: 40px;
  }

  
</style>