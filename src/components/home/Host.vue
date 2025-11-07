<script lang="ts">
import { defineComponent } from 'vue';
import type { hostData } from '../../types/types';
import type { PropType } from 'vue';

export default defineComponent({
    name:"HostComponent",
    props:{
        data:{
            type:Object as PropType<hostData>,
            required:true
        }
    }
})
</script>

<template>
    <div class="host">
        <img 
            :src="data?.images[0]" 
            alt="imagem da hospedagem"
        >
        <div class="info">
            <h1>{{ data.type }} - {{ data.region }}</h1>
            <p>{{ data.title }}</p>    
        </div>
        <div class="footer">
            <span class="value">R${{ data.default_value }}/noite</span>
            <span class="review">
                <i class="bi bi-star-fill"></i> {{ data.review.media }}        
            </span>
        </div>
        
    </div>
</template>


<style scoped>

.host {
    flex: 0 0 auto;
    width: 220px;
    max-width: 220px;
    height: 250px;
    border-radius: 20px;
    box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    overflow: hidden;
    transition: .3s ease;
    cursor: pointer;
    background: white;
    padding-bottom: 15px;
}

.host:hover {
    transform: translateY(-5px);
}

.host img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.info {
    color: black;
    margin-top: 5px;
    padding: 0 10px;
    width: 100%;
}

.info h1 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 3px;
    line-height: 1.2;
}

.info p {
    font-size: 14px;
    color: #444;
    line-height: 1.3;
}

.footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-top: 15px;
}

.footer .value {
    color: #026331;
    font-weight: 600;
}

.footer .review {
    font-size: 15px;
    color: #555;
}

.footer .bi-star-fill {
    margin-right: 3px;
}

@media (max-width: 768px) {
    .host {
        max-width: 180px;
        padding-bottom: 10px;
    }

    .info h1 {
        font-size: 0.9rem;
    }

    .info p,
    .footer .review {
        font-size: 0.8rem;
    }

    .footer .value {
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .host {
        max-width: 100%;
        box-shadow: none;
        border-radius: 10px;
    }

    .info h1 {
        font-size: 0.85rem;
    }

    .info p {
        font-size: 0.75rem;
    }

    .footer {
        gap: 15px;
        padding: 0 8px;
    }

    .footer .value {
        font-size: 0.85rem;
    }
}

</style>