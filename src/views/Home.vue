<template>
<nav-bar/>
<router-view/>
<div class="conteinar-menu-barra-lateral">
    <div class="barra-lateral" @mouseover="exibirMenu=true">
    <div class="logo">
        <img title="computador" class="logoImg" src="../assets/img/computador.svg">
    </div>
    <div class="logo">
        <img title="unidade" class="logoImg" src="../assets/img/file.png">
    </div>
    <div class="logo">
        <img title="relatorio" class="logoImg" src="../assets/img/grafico.svg">
    </div>
</div>
<transition appear enter-active-class="animate__animated animate__slideInLeft" name="slide">
<div class="menu-exibir" v-if="exibirMenu" @mouseleave="exibirMenu=false">
         <ul class="lista">
            <li class="menu"><router-link class="link-lista" :to="{name:'cadastrodeequipamento'}">Cadastro</router-link></li>
            <li class="menu"><router-link class="link-lista" :to="{name:'buscadeequipamento'}">Busca</router-link></li>
        </ul>
          <ul class="lista">
            <li class="menu"><router-link class="link-lista" :to="{name:'cadastrodeunidade'}">Cadastro de Unidade</router-link></li>
            <li class="menu"><router-link class="link-lista" :to="{name:'buscadeunidade'}">Busca de Unidade</router-link></li>
        </ul>
            <ul class="lista">
            <li class="menu"><router-link class="link-lista" :to="{name:'relatorio'}">Relatório</router-link></li>
        </ul>
</div>
</transition>
</div>
</template>
<script>
import navBar from '@/components/NavBar'
export default{
    name: 'homeView',
    components:{
        navBar
    },
    data:()=>({
        exibirMenu: false
    })
}
</script>
<style scoped>
@import '~@/assets/css/styleBarra.css';
</style>
