<script setup lang="ts">

</script>

<template>
    <div class="section-forgot">
        <div  class="modal-forgot">

            <div class="title">
                <img src="../../../../assets/icons/lock.svg" alt="cadeado">
                <h1>Problemas para entrar?</h1>
                <p> Insira o seu e-mail, telefone ou nome de usuário e enviaremos um link para você voltar a acessar a sua conta.</p>
    
            </div>
            <form>
                <input type="text" placeholder="Email, telefone ou nome de usuário">
                <button class="btn-green">Enviar link para login</button>
    
            </form>
            <div class="footer">
    
               <RouterLink to="/suport/forgot-password" class="link">Não consegue redefinir sua senha?</RouterLink>
               
               <span class="or">OU</span>
               <RouterLink to="/register" class="create-account">Criar nova conta</RouterLink>
               <button type="button" @click="$emit('toogle')">Voltar para o login</button>

            </div>
        </div>
    </div>
</template>

<style scoped>
    .section-forgot{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        z-index: 9999;
        position: fixed;
        background: rgba(102, 100, 100, 0.507);


    }
    .modal-forgot {
        width: 350px;
        height: max-content;
        background: white;
        text-align: center;
        padding-top: 10px;
        border-radius: 10px;
        box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        padding-bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        animation: slide linear .4s forwards;
        
        
        

    }
    .modal-forgot .title{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        max-width: 260px;
    }
    .modal-forgot .title h1 {
        color: black;
        font-size: 14px;


    
    }
    .modal-forgot .title p{
        font-size: 11px;
        
        
    }
    .modal-forgot .title img{
        width: 30%;
        height: auto;
    }
    .title * {
        margin-top: 10px;
    }
    form input{
        width: 260px;
        padding: 10px 15px;
        border: 1px solid #DBDBDB;
        border-radius: 5px;

    }
    form input::placeholder{
        font-size: 13px;
    }
    form button{
        /* background: linear-gradient(#02552A, #026331, #02552A); */
        background: black;
        color: white;
        width: 260px;
        padding: 10px 0px;
        border-radius: 8px;
        transition: ease-out .2s;
        cursor: pointer;
    }
    form button:hover{
        opacity: 0.6;
    }
    form * {
        margin-top: 10px;
    }
    .footer {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        gap: 8px;
    }

    .footer .link {
        color: #4150F7;
        font-size: 11px;
        padding: 7px;
        text-decoration: none;
        transition: ease .2s;
        
    }
    .footer .link:hover{
        text-decoration: underline;

    }
    .footer span{
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;

    }
    .footer span::before, span::after{
        content: '';
        width: 100px;
        background: #DBDBDB ;
        height: 1px;
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
    
    }
    .footer .create-account{
        font-size: 13px;
        text-decoration: none;
        border-radius: 10px;
        padding: 5px 10px;
    }
    .footer .create-account:hover{
        background: rgba(155, 155, 155, 0.377);
        transition: ease .3s;

    }
    .footer button{
        width: 100%;
        padding: 10px 0px;
        cursor: pointer;        
        transition: ease .2s;
    }
    .footer button:hover {
        background: rgba(255, 0, 0, 0.283);
    }
    @keyframes slide {
        from{
            opacity: 0;
            transform: translateY(20px);
        }
        to{
            opacity: 1;
            transform: translateY(0px);
        
        }
    }

</style>