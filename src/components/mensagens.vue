<template>
    <div v-if="exbir" :class="`${possicao}`">
        <div :class="`alert ${tipo}`" role="alert">
            <span v-for="i in msg" :key="i"> {{ i }}<br /></span>
            <div>
                <div class="tempo" :style="`width: ${tempo}%;  background-color: ${cor};`"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "mensagenVue",
    data: () => ({
        tempo: 100,
        exbir: false,
        cor:"red"
    }),
    props: ["msg", "tipo", "possicao"],
    methods: {
        count() {
            let set = setInterval(() => {
                this.tempo=this.tempo-20;
                if (this.tempo === 0) {
                    this.exbir = false;
                    clearInterval(set)
                    this.tempo = 80;
                }
                console.log(this.tempo)
            }, 1000)
        }
    },
    watch: {
        msg() {
            this.exbir = true;
            if(this.tipo ==="alert-danger"){
                this.cor="red"
            }else if(this.tipo ==="alert-success"){
                this.cor="green"
            }
           this.count();
        }
    }
}
</script>

<style scoped>
@import '~@/assets/css/mensagensStyle.css';
</style>