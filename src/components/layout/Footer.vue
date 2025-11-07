<template>
    <div class="footer">
        <div class="info">
            <div class="title">
                <span class="logo">
                    <img src="../../assets/icons/hospedala.svg" alt="logo hospedala">
                    <span>Hospedala</span>
                </span>
                <p>Viagens com segurança e facilidade.</p>
            </div>

            <div class="links">
                <h1>Hospedagens</h1>
                <ul>
                    <li><router-link to="#">Pousadas</router-link></li>
                    <li><router-link to="#">Hotéis</router-link></li>
                    <li><router-link to="#">Camping</router-link></li>
                </ul>
            </div>

            <div class="links">
                <h1>Suporte</h1>
                <ul>
                    <li><router-link to="#">Central de ajuda</router-link></li>
                    <li><router-link to="#">Contato</router-link></li>
                    <li><router-link to="#">Termos</router-link></li>
                </ul>
            </div>

            <div class="social-media">
                <h1>Redes Sociais</h1>
                <ul>
                    <li><router-link to="#"><i class="bi bi-whatsapp"></i></router-link></li>
                    <li><router-link to="#"><i class="bi bi-instagram"></i></router-link></li>
                    <li><router-link to="#"><i class="bi bi-facebook"></i></router-link></li>
                </ul>
            </div>
        </div>        
        <hr>
        <div class="copyright">
            <p>&copy;2025 Hospedala. Todos os direitos reservados.</p>
        </div>
    </div>
</template>

<style scoped>
.footer {
    background: #111827;
    width: 100%;
    padding: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info {
    width: 100%;
    max-width: 1100px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;
}

.title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo span {
    color: white;
    font-weight: bold;
    font-size: 19px;
}

.title p {
    color: #9CA3AF;
    font-size: 14px;
}

.links, .social-media {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.links h1, .social-media h1 {
    color: white;
    font-size: 15px;
    margin-bottom: 8px;
}

.links ul, .social-media ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.links ul li, .social-media ul li {
    margin-bottom: 6px;
}

a {
    color: #9CA3AF;
    text-decoration: none;
    transition: 0.3s;
}

a:hover {
    color: white;
}

.social-media ul {
    display: flex;
    gap: 10px;
}

.social-media i {
    font-size: 20px;
    color: #9CA3AF;
    transition: 0.3s;
}

.social-media i:hover {
    color: white;
}

hr {
    width: 100%;
    max-width: 1100px;
    border: 1px solid #9CA3AF;
    margin: 20px 0;
}

.copyright p{
    color: #9CA3AF;
    font-size: 15px;
    text-align: center;
}

</style>
