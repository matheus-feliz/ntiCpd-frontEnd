<template>
    <div class="navBar">
        <router-link to="/home"><img class="imgNav" src="../assets/img/iconLogo.png"></router-link>
        <div>
                <div class="ajusteRelogio">
                    <p id="relogio" class="relogio">00:00:00</p>
                    <p class="nav-link" @click="logout()">Sair</p>
                </div>
        </div>
    </div>
</template>
<script>
import axios from '@/service/axios';
export default{
    name: 'navbarView',
    methods:{
        logout(){
            axios.get('/logout')
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
@import '~@/assets/css/navBarStyle.css';
</style>
