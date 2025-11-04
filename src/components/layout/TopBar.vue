<template>
    <div class="top-bar">
        <div class="logo">
            <h1>Hospedala</h1>
        </div>
        <div v-if="home" class="links">
            <router-link class="link" to="/">
                <i class="bi bi-airplane-fill"></i>
                <span>Hospedagens</span>
            </router-link>
        </div>
        <button v-if="!home" class="link" @click="showBar">
            <i class="bi bi-gear-fill"></i>
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            toogleButton:false
        }
    },
    props:{
        home:{
            type:Boolean,
            required:false,
            default:true
        }
    },
    methods:{
        showBar() {
            this.$emit('show-bar')
        }
    },
});


</script>
<style scoped>
    .top-bar {
        width: 100%;
        padding: 10px 20px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        box-sizing: border-box;
        position: absolute;
        max-height: 100px;
        top: 0;
        z-index: 9999;
        box-shadow: 0 3px 2px rgba(0, 0, 0, 0.3);
    }

    .top-bar .logo h1 {
        position: relative;
        color: black;
        font-size: 30px;
        padding-left: 10px;
    }
    
    .links {
        display: block;
        margin-right: 40px;
    }
    .link {
        position: relative;
        color: black;
        border-radius: 7px;
        cursor: pointer;
        text-decoration: none;
        margin: 10px 10px;
        font-weight: 600;
        font-size: 18px;
        display: flex;
        gap: 5px;
        /* padding: 5px; */
        /* box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4); */
    }
    
    
    .link::after {
        content: ' ';
        display: inline-block;
        height: 2px;
        background: black;
        position: absolute;
        width: 0;
        bottom: -2px;
        left: 0;
        transition: all linear .3s;
    }

    .link:hover::after {
        width: 100%;
    }

    .link > span {
        display: block;
    }

    .link > i {
        margin-left: 5px ;
        display: block;
    }
    
    .logo {
        display: block;
    }
    

    /* @media (max-width: 600px) {
        .top-bar {
            flex-direction: row;
            justify-content: space-between;
            padding: 15px 5px;
        }

        .top-bar .logo h1 {
            font-size: 22px;
            padding-left: 5px;
        }

        .link {
            padding: 8px 12px;
            font-size: 12px;
            margin: 5px;
        }

        button.link {
            display: block;
        }
    }
     */
</style>