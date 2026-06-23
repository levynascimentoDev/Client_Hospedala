
<script setup lang="ts">
import { Icon } from '@iconify/vue';



const emit = defineEmits<{
    clicked:[];
}>()

const props = defineProps<{
    icon:string;
    content:string;
    selected:boolean;
}>()
</script>

<template>
    <button 
        :class="['big-button', { 'selected':props.selected }]"
        @click="emit('clicked')"
    >

        <div>
            <Icon class="icon" width="20" height="20" :icon="props.icon"/>
            <span>{{ content }}</span>
        </div>
    </button>
</template>


<style scoped>

.big-button {
    width: 200px;
    height: 70px;
    display: flex;
    align-items: start;
    justify-content: flex-start;
    padding: 10px;
    flex-wrap: wrap;
    border-radius: 5px;
    border: 2px solid transparent;
    transition: ease .3s;
    background: #cdcdcd64;
}


.big-button div {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    gap: 5px;
}

.icon {
    flex-shrink: 0; 
}

.big-button:hover {
    border-color: black;
}

.selected {
    background:black;
    color: white;
}

</style>