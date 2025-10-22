<template>
  <div class="rightBar" :class="{closeing:isClosing}" @mouseleave="handlerMouseout"> 
    <div class="userinfo">
      <img  v-if="user?.icon != null" :src="user?.icon" alt="icon">
      <span>{{ user?.name }}</span>
    </div>    
    <div class="buttons">
      <button type="button" class="logout" @click="logout">Sair</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { User } from '../types/types';
export default defineComponent({
  data() {
    return {
      isClosing:false
    }
  },
  props:{
    user:{
      type:Object as PropType<User>,
      required:false
    }
  },
  methods:{
    handlerMouseout() {
      
      this.isClosing = true
      
      setTimeout(() => {
        return this.$emit('close')
      }, 300)
    },
    async logout() {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      if (resp.ok) return this.$router.push("/");
    }
  }

})
</script>

<style scoped>
span {
  color: black;
}
.rightBar {
  display: flex;
  justify-content: right;
  flex-direction: column;
  align-items: center;
  position: fixed; 
  z-index: 10;
  height: 100dvh;
  width: 200px;
  background: white;
  box-shadow: 0 3px 6px black;
  right: 0;
  animation: slide 0.3s ease forwards;
}

.buttons button { 
  width: 150px;
  color: white;
  background: rgb(36, 141, 227);
  border: none;
  transition: all linear .2s;
}

.buttons .logout {
  background: red;
}

.userinfo {
  margin-top: 20px;
  border-block-end: 1px solid black;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  flex-direction: column;
}

.buttons {
  margin-top: 20px; 
}
.buttons button:hover {
  opacity: 0.6;
  box-shadow: 2px 4px 5px black;
}


.userinfo img {
  border-radius: 100%;
  width: 60px;
  height: 60px;
}

.closeing {
  animation: slideOut 0.3s ease forwards;  
}


@keyframes slide {
  0% { transform: translateX(200px); }
  100% { transform: translateX(0); }
}

@keyframes slideOut {
  0% { transform: translateX(0); }
  100% { transform: translateX(200px); }
}

</style>
