<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            query:"",
            showDropdown:false,
            currentDate:new Date(),
            prevMonth:{
                date:new Date(),
                days:[] as number[],
                weekStart:null as number | null
            },
            nextMonth:{
                date:new Date(),
                days:[] as number[],
                weekStart:null as number | null
            },
            weeks:[
                "D",
                "S",
                "T",
                "Q",
                "Q",
                "S",
                "S"
            ],
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
            ]
        }
    },
    methods:{
        hideDropdown() {
            this.showDropdown = false;  
            this.$emit('selected', false);
        },
        activeDropdown() {
            this.showDropdown = true;
            this.$emit('selected', true);
        },
        handlerClickOutside(event:Event) {
            const dropdown = this.$refs.dropdown as HTMLElement
            if (dropdown && !(dropdown as HTMLElement).contains(event.target as Node)) {
                this.$emit('selected', false)
                this.showDropdown = false;
            }
        }
    },
    created() {
        const startDay:Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const endDay:number = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
        const prevDays = []

        for (let i = startDay.getDate(); i <= endDay; i++) {
            prevDays.push(i)
        }

        this.prevMonth = {
            date:this.currentDate,
            days:prevDays,
            weekStart:startDay.getDay()
        }

        const nextDays = []
        const nextStartDay:Date = new Date(this.prevMonth.date.getFullYear(), this.prevMonth.date.getMonth()+1, 1);
        const nextEndDay:number = new Date(this.prevMonth.date.getFullYear(), this.prevMonth.date.getMonth()+1, 0).getDate();

        for (let i = nextStartDay.getDate(); i <= nextEndDay; i++) {
            nextDays.push(i)
        }

        this.nextMonth = {
            date:nextStartDay,
            days:nextDays,
            weekStart:nextStartDay.getDay()
        }
        
    },  
    mounted() {
        document.addEventListener('click', this.handlerClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handlerClickOutside);
    }
})
</script>


<template>
    <label for="date" class="input-date" ref="dropdown" :class="{ 'button-active' : showDropdown }">
        <span class="label">
            <img 
                src="../../../assets/icons/calendar.svg" 
                width="18px"
                height="18px"
                alt="Calendario"
            >
            <span>Para Quando</span>
        </span>
        <button 
            type="button"
            id="date" 
            @click="activeDropdown"
        >Insira as datas</button>

        <div v-if="showDropdown" class="dropdown">
            <div class="calendar">
                <div class="prev-month month">
                    <div class="header">
                        <button v-if="currentDate.getMonth() != prevMonth.date.getMonth()"><i class="bi bi-caret-right-fill back" style="rotate: 360deg;"></i></button>
                        <span>{{ months[prevMonth.date.getMonth()] }} de {{ prevMonth.date.getFullYear() }}</span>
                    </div>
                    <div class="weeks">
                        <div class="week" v-for="(w, index) in weeks" :key="index">{{ w }}</div>
                    </div>
                    <div class="days">
                        <div class="voids" v-for="v in prevMonth.weekStart" :key="v"></div>
                        <button 
                            type="button" 
                            class="day" 
                            v-for="(d, index) in prevMonth.days" 
                            :key="index"
                            :disabled="d < currentDate.getDate()"
                        >
                        {{ d }}
                        </button>
                    </div>
                </div>
                <div class="next-month month">
                    <div class="header">
                        <span>{{ months[nextMonth.date.getMonth()] }} de {{ nextMonth.date.getFullYear() }}</span>
                        <button><i class="bi bi-caret-right-fill next"></i></button>
                    </div>
                    <div class="weeks">
                        <div class="week" v-for="(w, index) in weeks" :key="index">{{ w }}</div>
                    </div>
                    <div class="days">
                        <div class="voids" v-for="v in nextMonth.weekStart" :key="v"></div>
                        <button 
                            type="button" 
                            class="day" 
                            v-for="(d, index) in nextMonth.days" 
                            :key="index"
                        >
                        {{ d }}
                        </button>
                    </div>

                </div>
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

.input-date:hover {
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
    left: -300px;
    width: 800px;      
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 30px;
    margin-top: 8px;
    height: 400px;
    overflow-y: auto;
    list-style: none;
    padding: 6px 10px;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);
    z-index: 999;
    animation: slideSmoth ease .2s forwards;
    overflow: auto;
}

.dropdown .calendar {
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
    gap: 30px;
}

.calendar .header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
}

.header span {
    font-size: 19px;
}

.header i {
    position: absolute;
    right: 10px;
    top: 30%;
    padding: 0px 5px;
    background: #ccc;
}

.calendar .prev-month,
.calendar .next-month {
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
}

.month {
    flex: 1;
}

.weeks {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 3px;
    user-select: none;
    cursor: default;
}

.weeks .week {
    flex: 1;
    text-align: center;
}

.days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3px;
    width: 100%;
    cursor: default !important;
}

.days .day,
.days .voids {
    width: 100%;
    text-align: center;
}


.day {
    cursor: pointer;
    background: transparent;
    border: 2px solid transparent;
    border-radius: 8px;
    font-size: 16px;
    padding: 6px 0;
}

.day:not(:disabled):hover {
    border: 2px solid black;
}

.day:disabled {
    opacity: 0.4;
    cursor: default !important;
    user-select: none !important;
}
.day:not(:disabled):active {
    background: black;
    color: white;
}

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
