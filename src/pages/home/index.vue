<script lang="ts">
import { defineComponent } from 'vue';
import Host from './components/Host.vue';
import SpinerLoading from '../../components/spinnerLoading.vue';
import type { User } from '../../settings/types/types';
import { useHostStore } from '../../stores/hosts';
import DefaultLayout from '../../layouts/DefaultLayout.vue';

export default defineComponent({
    name:"Homepage",
    data() {
        return {
            places:useHostStore(),
            user:null as User | null,
            isLoading:false
        }
    },
    components:{
        Host,
        SpinerLoading,
        DefaultLayout
    },
    async created() {
        this.isLoading = true;
        await this.places.fetchAllPlaces();
        this.isLoading = false;
    },
    mounted() {
        window.scrollTo({ top: 0 });
    },
    watch: {
        isLoading(after:boolean, before:boolean) {

            if (after) {
                window.scrollTo({ top: 0    });
                document.body.style.overflow = "hidden"    
            } else {
                window.scrollTo({ top: 0 });
                document.body.style.overflow = ""    
            }
        }
    }
});
</script>


<template>
    <DefaultLayout>
        <div class="content" v-if="isLoading" style="margin-top: 60px;">
            <div class="row-content" v-for="row in 2" :key="row">
                <div class="values">
                    <host :isLoading="true" v-for="i in 8" :key="i"/>
                </div>
            </div>
        </div>
        <div class="content" v-else>
            <div class="row-content" v-for="(listValues, indexList) in places.filterPlaces" :key="indexList">
                <h1>Em destaque</h1>
                <div class="values">
                    <Host v-for="(value, indexValue) in listValues" :data="value" :key="indexValue"  />
                </div>
            </div>

            <div class= "not-found" v-if="!places.filterPlaces.length">
                <i class="bi bi-emoji-frown"></i>
                <h1>Ops!, Sem valores no momento.</h1>
            </div>
        </div>
    </DefaultLayout>

</template>

<style scoped>
.content {
    display: flex;
    justify-content: start;
    align-content: start;
    padding-left: 38px;
    padding-right: 38px;
    padding-bottom: 30px;
    padding-top: 35px;
    gap: 25px;
    flex-wrap: wrap;
    margin-bottom: 80px;
    flex: 1;
}

.row-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

.row-content h1 {
    font-size: 20px;
    margin-left: 20px;
    margin-bottom: 10px;
    flex-shrink: 0;
}

.row-content .values {
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

.row-content .values::-webkit-scrollbar {
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


