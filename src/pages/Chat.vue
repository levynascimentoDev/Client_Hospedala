<template>
    <div class="conatiner">
        <section>
            <div class="messages-wraper">

                <div class="messages" ref="messageContainer">
                    <div class="message" v-for="(value, index) in messages" :key="index">
                        <strong>{{ value.author }}</strong>
                        <p>{{ value.content }}</p>
                    </div>
                </div>

            </div>

            <form @submit.prevent="onMessage">
                <input type="text" v-model="textValue"><br><button type="submit">Enviar</button>
            </form>
        </section>
    </div>
</template>
<script lang="ts">
    import { defineComponent, ref, nextTick} from 'vue';

    interface Message {
        author:string,
        content:string
    }
 
    export default defineComponent({
        data() {
    
            return {
                textValue:ref<string>(""),
                messages:ref<Message[]>([])
            }
        },
        methods: {
            onMessage() {
                if (!this.textValue.trim()) return;
                this.messages.push({
                    author:"user",
                    content:this.textValue
                })
                this.textValue = "";

                nextTick(() => {
                    const container = this.$refs.messageContainer as HTMLElement;
                    if (container) {                    
                        container.scrollTop = container.scrollHeight;
                    }
                });
            }
        }
    })
</script>
<style scoped>
    
    section {
        gap: 20px;
    }

    
    input {
        width: 500px;
    }
    
    .messages-wraper {
        padding: 5px 0 ;
        background: white;
        width: max-content;
        height: max-content;
        border-radius: 10px;
    }
    .messages { 
        scrollbar-width: 0;
        color: black;
        padding: 20px 20px;
        min-height: 400px;
        max-height: 400px;
        width: 600px;
        background: white;
        border-radius: 20px;
        overflow: auto;
        box-sizing: border-box;
    }

    .messages::-webkit-scrollbar {
       width: 8px;          
    }

    .messages::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.4);  
        border-radius: 4px;         
    }

    .messages::-webkit-scrollbar-track {
        background: transparent;  
    }
    .messages .message * {

        color: black;
    }
    
    .message {
        
        margin-top:5px;
    }

    .message p {
        text-align: center;
        width: max-content;
        padding: 5px 10px;
        padding-right: 40px;
        background: rgba(0, 0, 0, 0.3);   
        border-radius: 10px 10px 10px 2px;
    }
</style>