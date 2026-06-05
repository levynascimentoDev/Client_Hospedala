<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
const query = ref("")
const showDropdown = ref(false)

const emit = defineEmits<{
    (e:"selected", value:boolean):void;
}>()

const hideDropdown = () => {
    showDropdown.value = false;  
    emit('selected', false);
}

const activeDropdown = () => {
    showDropdown.value = true;
    emit('selected', true);
}

const dropdown = useTemplateRef<HTMLElement>("dropdown")

const handlerClickOutside = (event:Event) => {
    if (dropdown && !dropdown.value?.contains(event.target as Node)) {
        emit('selected', false)
        showDropdown.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handlerClickOutside);
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handlerClickOutside);
})

</script>


<template>
    <label for="date" class="input-date" :class="{ 'button-active' : showDropdown }" ref="dropdown">
        <span class="label">
            <img 
                src="../../../assets/icons/calendar.svg" 
                width="18px"
                height="18px"
                alt="Calendario"
            >
            <span>Hospedes</span>
        </span>
        <button 
            type="button"
            id="date" 
            @click="activeDropdown"
        >Insira as datas</button>

        <div v-if="showDropdown" class="dropdown">
            <div class="calendars">
                <div class="calendar checkin">
                    <div class="header">
                        <button class="button">
                            
                        </button>
                    </div>
                    <div class="weeks">

                    </div>
                    <div class="days">

                    </div>
                </div>
            </div>
            <div class="dates">
                
            </div>
        </div>

    </label>
</template>



<style scoped>
.input-date {
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    padding: 10px;
    transition: all linear .2s;
    border: 1px solid rgba(92, 92, 92, 0.416);
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    background: transparent;
}

.input-date:not(.button-active):hover {
    background: #cccccc75;
}

.input-date .label {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    gap: 4px;
}

.label span {
    font-size: 13px;
    font-weight: 500;
}

.input-date #date {
    width: 100%;
    outline: none;
    padding: 5px 0;
    font-size: 14px;
    background:transparent;
    cursor: pointer;
}

.input-date:active {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.288);
    background: white;
    border-radius: 23px;
}

.button-active {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.288);
    background: white;
    border-radius: 23px;
}


.dropdown {
    position: absolute;
    top: 100%;  
    left: -10px;
    width: 300px;      
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 8px;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 6px 0;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);
    z-index: 999;
    animation: slideSmoth ease .2s forwards;
    overflow: auto;
}



/* .dropdown .option {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 5px;
    gap: 15px;
    border-radius: 10px;
    transition: ease .2s;
    cursor: pointer;
    margin: 5px 5px;
} */

/* .option:hover {
    background: #ccc;
} */

/* .dropdown i {
    padding: 10px 15px;
    background: rgb(0, 0, 0);
    color: white;
    border-radius: 8px;
} */

@keyframes slideSmoth {
    from {
        transform: translate(-10px, -10px);
        opacity: 0;
    }

    to {
        transform: translate(10px, 10px);
        opacity: 1;
    }


}

</style>
