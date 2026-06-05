<script setup lang="ts">

defineProps<{
    message:string;
    color:string;
}>()

</script>


<template>
    <div ref="spanMessage" class="span-message">
        <span>{{ message }}</span>
    </div>
</template>

<style scoped>
.span-message {
    width: 300px;
    padding: 10px;
    background: rgba(255, 0, 0, 0.2);
    border-radius: 8px;    ;
    animation: shake ease .4s;
}

@keyframes shake {
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-5px);
    }

    20%, 40%, 60%, 80%, 100% {
        transform: translateX(5px);
    }

}

</style>

