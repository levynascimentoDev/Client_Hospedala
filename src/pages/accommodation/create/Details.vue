<script setup lang="ts">
import { ref } from 'vue';

const rooms = ref(0);
const beds = ref(0);
const bathRooms = ref(0);
    
</script>

<template>
    <div class="container">
        <div class="modal-form">
            
            <div class= "title">
                <h1>Detalhes da Acomodação</h1>
                <p>Compartilhe as informações sobre o seu espaço</p> 
                
            </div>

            
            <div class="counters">
                <div class="options">
                    <div class="content">
                        <h2>Quartos</h2>
                        <p>Número de quartos disponiveis</p>
                    </div>
                    <div class="counter">
                        <button 

                            :disabled=" rooms == 0 "
                            @click="() => rooms--"
                        >-</button>
                        <span>{{ rooms }}</span>
                        <button
                            @click="() => {
                                rooms ++
                            }"
                            :disabled="rooms == 20"
                            
                        >+</button>
                    </div>

                </div>

                <!-- contador de camas -->
                <div class="options">
                    <div class="content">
                        <h2>Camas</h2>
                        <p>Número total de camas</p>
                    </div>
                    <div class="counter">
                        <button
                            :disabled=" beds == 0"
                            @click="() => beds --"
                        >-</button>
                        <span>{{ beds }}</span>
                        <button
                            @click="() => {
                                beds ++
                            }"
                            :disabled=" beds==20"

                        >+</button>
                    </div>

                </div>

                <!-- contador de banheiros -->
                <div class="options">
                    <div class="content">
                        <h2>Banheiros</h2>
                        <p>Número de banheiros disponiveis</p>
                    </div>
                    <div class="counter">
                        <button
                            :disabled="bathRooms==0"
                            @click="() => bathRooms--"
                        >-</button>
                        <span>{{ bathRooms }}</span>
                        <button
                            :disabled="bathRooms==20"
                            @click="()=> {
                                bathRooms ++
                            }"
                        >+</button>
                    </div>

                </div>

            </div>

            <div class="buttons">
                <button class="next">   Continuar</button>

                <button class="back">
                    Voltar</button>

            </div>



        </div>
    </div>
</template>

<style>


.container{
    align-items: center;
    justify-content: center;
}

.modal-form {
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    width: 472px;
    height: 515px;
    display: flex;
    align-items: center ;
    justify-content: center;
    flex-direction: column;
    padding: 0 26px;   
}


.modal-form .title h1{
    font-size: 22px;
}

.title h1, p {
    width: 100%;
    text-align: left;
}


.modal-form .title p{
    font-size: 16px;
}


.modal-form .counters .options p {
    font-size: 13px;
}

.modal-form .counters {
    gap: 20px;
    
}

.counters .options {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-form .title, .counters, .buttons {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}

.modal-form .counters .options h2{
    font-size: 16px;

}

.modal-form .buttons {
    flex-direction: row;

}

.modal-form .counters .options button{
    width: 30px;
    height: 30px;
    
    border-radius: 50%;
    font-size: 20px;
    padding: 0;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.381);
    cursor: pointer;
}
.counters .options span{
    width: 30px;
    text-align: center;
    display: inline-block;
    margin: 0 8px;
}

button:disabled{
    opacity: 0.4;

}

.modal-form .counters .options .counter button:disabled{
    cursor: default;
}

.modal-form .buttons .next {
    font-size: 15px;
    width: 260px ;
    height: 50px;
    border-radius: 9px;
    background-color: black;
    color: white;
}

.modal-form .buttons .back{
    font-size: 15px;
    width: 84px;
    height: 50px;
    border-radius: 9px;
    padding: 0 10px;
    background-color: white;
    border: 2px solid #E5E7EB;

}

.modal-form .buttons {
    display: flex;
    gap: 20px;
}


.modal-form .buttons button:hover{
    opacity: 0.5;

}

.modal-form .buttons button{
    transition: all .2s  ease-out;
    cursor: pointer;
}


</style>

