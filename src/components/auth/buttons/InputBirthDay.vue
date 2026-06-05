<script setup lang="ts">

import { computed, reactive, ref, watch } from 'vue';


const day = ref("");
const month = ref("");
const year = ref("");
const months = ref([
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro"
])

const errorInput = reactive({
    day:false,
    month:false,
    year:false,
    age:false
})


const props = withDefaults(
    defineProps<{
        error?:boolean
    }>(),
    {
        error:false
    }
)

const emit = defineEmits<{
    (e:"error", value:boolean):void;
    (e:"date", value:string):void;
}>()


const emitDate = () => {
    if (!day.value || !month.value || !year.value) {
        errorInput.age = false;

        if (props.error) {
            errorInput.day = !day.value;
            errorInput.month = !month.value;
            errorInput.year = !year.value;
        }
        return;
    }

    errorInput.day = false;
    errorInput.month = false;
    errorInput.year = false;

    emit('error', false);

    
    const date = new Date(Number(year.value), Number(month.value), Number(day.value))

    const dateNow = new Date();

    let age = dateNow.getFullYear() - date.getFullYear() 

    if ( !(dateNow.getMonth() > date.getMonth()) )  {   
        age -= 1
    } else if ( date.getMonth() == dateNow.getMonth() && dateNow.getDate() >= date.getDate())  {
        age -= 1
    }

    if (age < 18) {

        day.value = ""
        month.value = ""
        year.value = ""
        return errorInput.age = true;

    }
    
    const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
    emit("date", formattedDate)
    
}

const listYears = computed(() => {
    const currentYear:number = new Date().getFullYear()
    const years = [];
    for (let i:number = currentYear; i >= 1900; i-- ) {
        years.push(i);
    }
    return years;
})


watch(() => props.error, (after:boolean) => {
    if (after) {
        errorInput.day = !day.value;
        errorInput.month = !month.value;
        errorInput.year = !year.value;
        errorInput.age = !errorInput.age;
    }
})

</script>


<template>
    <label class="birthday-input">
        <span class="label">Data de nascimento</span>
        <div class="selects">
            <select  v-model="day" @change="emitDate" :class="{ 'error': errorInput.day  }">
                <option value="" disabled selected class="first-option">Dia</option>
                    <option 
                        v-for="d in 31" 
                        :key="d" 
                        :value="d"
                    >
                    {{ d }}</option>
            </select>   
            <select v-model="month" @change="emitDate" :class="{ 'error': errorInput.month  }">
                <option value="" disabled selected class="first-option">Mês</option>
                <option 
                    v-for="(m, index) in months" 
                    :key="index" 
                    :value="index"
                >
                {{ m }}</option>
            </select>
            <select  v-model="year" @change="emitDate" :class="{ 'error': errorInput.year }">
                <option value="" disabled selected class="first-option">Ano</option>                
                <option 
                    v-for="(y, index) in listYears" 
                    :key="index" 
                    :value="y"
                >
                {{ y }}</option>
            </select>
        </div>
        <span class="text-alert" v-if="errorInput.year || errorInput.month || errorInput.day">
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span>Coloque sua data de nascimento para continuar o registro</span>
        </span>

        <span class="text-alert" v-else-if="errorInput.age">
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span>Você deve ter no minimo 18 anos para continuar</span>
        </span>
    </label>
</template>


<style scoped>

.birthday-input {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    padding: 10px 10px;
    padding-left: 0;
}

.birthday-input span {
    font-size: 14px;
}


.birthday-input .selects {
    display: flex;
    align-self: center;
    justify-content: center;
    gap: 15px;
}

.selects select {
    padding: 9px 30px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.276);
    border: 0.5px solid #D1D5DB;
    border-radius: 5px;
    cursor: pointer;
    padding-left: 5px;
    font-size: 15px;
}


.selects #select option {
    text-align: left;
    width: 100%;
    text-align-last: left;    
}


.text-alert {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.text-alert span {
    color: red;
    font-size: 11px;
}

.text-alert i {
    color: red;
}

.error {
    border: 2px solid red !important;
    outline-color: red !important;
}


</style>