<script lang="ts">
import { defineComponent } from "vue";
import Footer from "../components/Footer.vue"
import TopBar from "../components/TopBar.vue";

export default defineComponent({
    components:{
        Footer,
        TopBar
    },
    props:{
        home:{
            type:Boolean,
            default:false
        }
    }
})
</script>

<template>
    <div class="container">
        <TopBar :home="home"/>
        <main :class="{homeSpace:home}">
            <slot/>
        </main>
        <Footer/>
    </div>
</template>

<style scoped>
.homeSpace {
    margin-top: 180px;
}
main {
    flex: 1;
}
</style>
