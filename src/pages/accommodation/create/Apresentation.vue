<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useWizardStep } from '../../../composables/useWizardStep';
import { useAccommodationWizardStore } from '../../../stores/accomodation';
import { Icon } from '@iconify/vue';



const router = useRouter()
const { onContinue, canContinue, canBack } = useWizardStep()

canContinue.value = true;
canBack.value = false;
const store = useAccommodationWizardStore();

onContinue.value = async () => {
    await store.create();

    if (store.accommodation) {
        router.push(`/accommodation/create/${store.accommodation.id}/property-type`)
    }
    
}



</script>



<template>
<div class="container">
    <div class="left">
        <img
            class="logo"
            src="../../../../public/hospedala-logo.png"
            alt="Hospedala"
        />

        <div class="content">
            <h1>
                Pronto para <br>
                começar a <br>
                hospedar?
            </h1>

            <p>
                Compartilhe seu espaço com o mundo e comece a faturar.
                Nós fornecemos as ferramentas e o suporte necessários
                para você ter sucesso desde a primeira reserva.
            </p>

            <div class="checklist">
                <div class="check-item">
                    <Icon
                        icon="healthicons:yes"
                        color="#73C69D"
                        width="18"
                        height="18"
                    />
                    <span>Segurança garantida para você e seu imóvel</span>
                </div>

                <div class="check-item">
                    <Icon
                        icon="healthicons:yes"
                        color="#73C69D"
                        width="18"
                        height="18"
                    />
                    <span>Pagamentos rápidos e transparentes</span>
                </div>
            </div>
        </div>
    </div>

    <div class="right">
        <img src="../../../assets/icons/iconhotel.png" alt="Hotel">
    </div>
</div>
</template>

<style scoped>
.container {
    display: flex !important;
    flex-direction: row !important;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 650px;
}

.left {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 70px;
    box-sizing: border-box;
    padding-right: 30px;
}

.logo {
    width: 170px;
    margin-bottom: 55px;
}

.content {
    max-width: 360px;
}

.content h1 {
    margin: 0 0 24px;
    font-size: 48px;
    font-weight: 700;
    line-height: 1.05;
    color: #1F2937;
}

.content p {
    margin: 0 0 36px;
    font-size: 16px;
    line-height: 1.8;
    color: #6B7280;
}

.checklist {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.check-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    color: #374151;
}


.right {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}

.right img {
    width: 100%;
    max-width: 508px;
    max-height: 508px;
    object-fit: cover;
    object-position: center;
    display: block;
    padding-top: 110px;
    padding-right: 50px;
}
</style>