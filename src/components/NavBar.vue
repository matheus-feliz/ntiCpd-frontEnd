<template>
    <div class="navBar">
        <router-link to="/home"><img class="imgNav" src="../assets/img/iconLogo.png"></router-link>
        <div>
                <div class="ajusteRelogio">
                    <p id="relogio" class="relogio">00:00:00</p>
                    <router-link to="/" class="nav-link">Sair</router-link>
                </div>
        </div>
    </div>
</template>
<script>
export default{
    name: 'navbarView'
}
</script>
<style scoped>
@import '~@/assets/css/navBarStyle.css';
</style>
