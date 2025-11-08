<script lang="ts">
import { defineComponent, ref } from 'vue';
import TopBar from '../components/layout/TopBar.vue';
import Apresentation from '../components/home/Apresentation.vue';
import Footer from '../components/layout/Footer.vue';
import Host from '../components/home/Host.vue';
import type { hostData, User } from '../types/types';
import Menu from '../components/layout/Menu.vue';

export default defineComponent({
    name:"Homepage",
    data() {
        return {
            filter:ref<hostData[][]>([]),
            datas:ref<hostData[]>([
                { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                 { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortalezasddsddssdsdd",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,  
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                 { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortalezasddsddssdsdd",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,  
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                 { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortaleza",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,
                        media:4.5
                    }
                },
                { 
                    title:"Reserva de quarto em fortalezasddsddssdsdd",
                    default_value:45.5,
                    region:"fortaleza",
                    type:"quarto",
                    images:[
                        "https://a0.muscache.com/im/pictures/miso/Hosting-1463445144407173757/original/f4ff9a3f-fec0-4bfd-a39c-fe1971a1fc0c.jpeg?im_w=1200"
                    ],
                    review:{
                        total:100,  
                        media:4.5
                    }
                }
            ]),
            isLogged:false,
            user:ref<User>({
                name:"teste",
                email:"teste@gmail.com",
                admin:false,
                id:122313123,
                icon:"http://localhost:5000/src/assets/imgs/Apresentation2.png"
            }),
            showMenu:false
        }
    },
    components:{
        TopBar,
        Apresentation,
        Footer,
        Menu,
        Host
    },
    methods:{
        async getRequets() {
            const resp = await fetch(`${import.meta.env.VITE_API_URI}/api/users/me`, {
                headers:{
                    "Conetent-Type":"application/json"
                },
                credentials:"include"
            })

            if (resp.ok) this.isLogged = true;
            else this.isLogged = false;
        },
    },
    created() {

        this.getRequets();

        if (this.datas.length) {
            for (let i = 0; i < this.datas.length; i+=8 ) {
                this.filter.push(this.datas.slice(i, i+8));
            }
        }
    }
});
</script>


<template>
    <div class="container">
        <TopBar :home="true" :isLogged="true"/>
        <Apresentation />
        <div class="hosts">
            <div class="row-values" v-for="(listValues, indexList) in filter" :key="indexList">
                <h1>Em destaque</h1>
                <div class="values">
                    <Host v-for="(value, indexValue) in listValues" :data="value" :key="indexValue"  />
                </div>
            </div>

            <div class="not-found" v-if="datas.length == 0">
                <i class="bi bi-emoji-frown"></i>
                <h1>Ops!, Sem valores no momento.</h1>
            </div>
        </div>
        <Footer />
    </div>

</template>

<style scoped>

.hosts {
    display: flex;
    justify-content: start;
    align-content: start;
    padding-left: 38px;
    padding-right: 38px;
    
    padding-bottom: 30px;
    padding-top: 20px;
    gap: 25px;
    flex-wrap: wrap;
    margin-bottom: 80px;
}

.row-values {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

.row-values h1 {
    font-size: 20px;
    margin-left: 20px;
    margin-bottom: 10px;
    flex-shrink: 0;
}

.row-values .values {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-x: auto;   
    overflow-y: hidden;
    gap: 20px;
    padding: 10px 20px;
    scroll-behavior: smooth;
    width: 100%;
}

.row-values .values::-webkit-scrollbar {
    height: 0;
}


.not-found {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13.4px;
    gap: 5px;
    margin-top: 50px;
}

.not-found h1 {
    color: rgba(101, 102, 103, 0.689);
}

.not-found i {
    font-size: 27px;
    color: rgba(101, 102, 103, 0.689);

}


</style>


