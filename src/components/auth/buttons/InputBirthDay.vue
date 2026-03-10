<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            day:"",
            month:"",
            year:"",
            months:[
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
            ],
            errorInput:{
                day:false,
                month:false,
                year:false,
                age:false
            }
        }
        
    },
    props:{
        error:{
            type:Boolean,
            required:false,
            default:false
        }
    },
    methods:{
        emitDate() {
            if (!this.day || !this.month || !this.year) {
                this.errorInput.age = false;

                if (this.error) {
                    this.errorInput.day = !this.day;
                    this.errorInput.month = !this.month;
                    this.errorInput.year = !this.year;
                }
                return;
            }

            this.errorInput.day = false;
            this.errorInput.month = false;
            this.errorInput.year = false;

            this.$emit('error', false);

            
            const date = new Date(Number(this.year), Number(this.month), Number(this.day))

            const dateNow = new Date();

            let age = dateNow.getFullYear() - date.getFullYear() 

            if ( !(dateNow.getMonth() > date.getMonth()) )  {   
                age -= 1
            } else if ( date.getMonth() == dateNow.getMonth() && dateNow.getDate() >= date.getDate())  {
                age -= 1
            }

            if (age < 18) {

                this.day = ""
                this.month = ""
                this.year = ""
                return this.errorInput.age = true;

            }
            
            const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
            this.$emit('date', formattedDate)
            
        }
    },
    computed:{
        listYears() {
            const currentYear:number = new Date().getFullYear()
            const years = [];
            for (let i:number = currentYear; i >= 1900; i-- ) {
                years.push(i);
            }
            return years;
        }
    },
    watch:{
        error(after:boolean, ) {
            if (after) {
                this.errorInput.day = !this.day;
                this.errorInput.month = !this.month;
                this.errorInput.year = !this.year;
                this.errorInput.age = !this.errorInput.age;
            }
        }
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