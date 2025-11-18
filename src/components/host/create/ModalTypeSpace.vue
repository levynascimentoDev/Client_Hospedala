<script>

</script>

<template>
    <div class="modal-select-space">
        <div class="text">
            <h1>Que tipo de espaço você oferece aos hóspedes?</h1>
            <p>Selecione a opção que melhor descreve o espaço que você está disponibilizando</p>
        </div>
        
    <div class="quadro">
        <div class="card">
            <div class="circulo">
                <img src="../../../assets/icons/home.svg"
            </div>
                <h2>Espaço completo</h2>
            <p>Os hóspedes têm acesso exclusivo a toda a propriedade, incluindo entrada privada</p>
        </div>

        
        <div class="card">
            <div class="circulo">
                <img src="../../../assets/icons/sleep.svg"
            </div>
                <h2>Um quarto</h2>
                <p>Os hóspedes têm seu próprio quarto privado e podem compartilhar algumas áreas comuns</p>
        </div>
        <div class="card">
            <div class="circulo">
                <img src="../../../assets/icons/guys.svg"
            </div>
            <h2>Quarto compartilhado em um albergue</h2>
            <p>Os hóspedes dormem em um quarto compartilhado com outros viajantes</p>
        </div>
        
        </div>
    </div>
    


</template>

<style scoped>
    .modal-select-space {
        display: flex;
        width: 896px;
        padding: 48px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 48px;
        text-align: center;
        border-radius: 16px;
        border: 0 solid #E5E7EB;
        background: var(--color-white-solid, #FFF);
        box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.10), 0 20px 25px 0 rgba(0, 0, 0, 0.10);
    }


    .quadro {
        display: flex;
        justify-content: center;
    }
    h2{
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;

    }
    .circulo {
        display: flex;
        width: 80px;
        height: 80px;
        padding: 22px 23.125px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 9999px;
        border: 0 solid #E5E7EB;
        background: #DBEAFE;
    }

    .card{
        display: flex;
        width: 245.328px;
        height: 336.25px;
        padding: 34px 34px 67.25px 34px;
        margin: 20px;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        text-align: center;
        border-radius: 12px;
        border: 2px solid #E5E7EB;
        background: #F9FAFB;
    }
</style>