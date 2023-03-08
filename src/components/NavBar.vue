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
        hor: "",
        minuto: "",
        segundo: "",
        set: 0,
        cromometro: { horaL: '', minL: '', segunL: '' },
        cromomentoObj: { horaL: "", minL: '', segunL: '' }
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
            this.cromometro.horaL = 0;
            this.cromometro.minL = 0;
            this.cromometro.segunL = 0;
            localStorage.setItem('cromometro', JSON.stringify(this.cromometro));
            clearInterval(this.set)
            this.$router.push('/');
        },
        checaLocalStore() {
            let cromomentoString = localStorage.getItem('cromometro');
            let cromomentoObjF = JSON.parse(cromomentoString);
            this.cromomentoObj = cromomentoObjF;
        }
    }, beforeCreate() {
        let cromometro={horaL:0,minL:0,segunL:0};
        localStorage.setItem('cromometro', JSON.stringify(cromometro));
    },
    created() {
        this.checaLocalStore();
        if (this.cromomentoObj.minL > 0 && this.cromomentoObj.segunL > 0) {
            console.log("created", this.cromomentoObj.minL)
            this.min = this.cromomentoObj.minL;
            this.segun = this.cromomentoObj.segunL;
        } else {
            this.min = 30;
            this.segun = 0;
        }
        this.cromonometro()
    },
    beforeUpdate() {
        this.cromometro.horaL = this.hora;
        this.cromometro.minL = this.min;
        this.cromometro.segunL = this.segun;
        localStorage.setItem('cromometro', JSON.stringify(this.cromometro));
    }
}
</script>
<style scoped>
@import '~@/assets/css/navBarStyle.css';
</style>
