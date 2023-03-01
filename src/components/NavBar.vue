<template>
    <nav class="navBar">
        <router-link to="/home"><img class="imgNav" src="../assets/img/iconLogo.png"></router-link>
        <div>
            <div class="ajusteRelogio">
                <p id="relogio" class="relogio">{{ hor }}:{{ minuto }}:{{ segundo }}</p>
                <p class="nav-link" @click="logout()">Sair</p>
            </div>
        </div>
    </nav>
</template>
<script>
import axios from '@/service/axios';
export default {
    name: 'navbarView',
    data: () => ({
        hora: 0,
        min: 30,
        segun: 0,
        hor: "00",
        minuto: "30",
        segundo: "00",
        set: 0
    }),
    methods: {
        async cromonometro() {
            this.set = setInterval(async () => {
                this.contagem();
                this.segun--;
                if (this.hora === 0 && this.min === 0 && this.segun === 0) {
                    clearInterval(this.set)
                    this.logout();
                }
            }, 1000)

        },
        contagem() {
            if (this.min > 0 && this.segun === 0) {
                this.min--;
                this.segun = 59;
            }
            this.hor = this.hora < 10 ? `0${this.hora}` : `${this.hora}`;
            this.minuto = this.min < 10 ? `0${this.min}` : `${this.min}`;
            this.segundo = this.segun < 10 ? `0${this.segun}` : `${this.segun}`;
        }
        ,
        async logout() {
            await axios.get('/logout')
            clearInterval(this.set)
            this.$router.push('/');
        }
    },/*beforeCreate(){
        let cromomentoString = localStorage.getItem('cromometro');
        let cromomentoObj = JSON.parse(cromomentoString);
        console.log(cromomentoObj.minL)
        if(cromomentoObj.minL > 0 && cromomentoObj.segunL > 0){
            this.min = cromomentoObj.minL;
            this.segun = cromomentoObj.segunL;
        }
    },*/
    created() {
        this.cromonometro()
    },
   /* beforeUpdate(){
        let cromometro = { horaL : this.hora, minL: this.min, segunL: this.segun }
        localStorage.setItem('cromometro', JSON.stringify(cromometro));
    }*/
}
</script>
<style scoped>
@import '~@/assets/css/navBarStyle.css';
</style>
