<template>
    <div class="meio" id="meio" v-if="exibir">
        <div id="jpeg">
            <canvas id="rosca"></canvas>
            <div class="label">
                <div class="fexLabel" v-for="valor in valores" :key="valor">
                    <div class="corLabel" :style="`background-color:${valor.backgroundChart};`"></div>
                    <div>{{ valor.nomeDaUnidade }} : </div>
                    <div>{{ valor.data }}</div>
                </div>
                <span>total de serviços: {{ dados.totalDeServico }}</span>
            </div>
        </div>
        <button class="but-jpeg" @click="geraJpg()">JPEG</button>
    </div>
</template>
<script>
import axios from '@/service/axios';
import { Chart } from "chart.js/auto"
import domtoimage from 'dom-to-image';
export default {
    name: "dashbordView",
    data: () => ({
        date: { dataInicial: "", dataFinal: "" },
        dados: "",
        exibir: true,
        valores: []
    }),
    methods: {
        async puxaRelatorio() {
            const response = await axios.post('/relatorioBanco', this.date);
            this.dados = response.data;
            if(this.dados.total.length >0){
                //this.exibir=true;
                this.gerarGrafico();
            }
        },
        geraJpg() {
            let nome = `${this.date.dataInicial} ${this.date.dataFinal}.jpeg`;
            domtoimage.toJpeg(document.getElementById('jpeg'), { quality: 1 })
                .then(function (dataUrl) {
                    var link = document.createElement('a');
                    link.download = nome;
                    link.href = dataUrl;
                    link.click();
                });

        }
        ,
        geraData() {
            let valores = {
                label: 'Total de serviço',
                data: [],
                borderWidth: 1
            };
            for (let i = 0; i < this.dados.total.length; i++) {
                valores.data.push(this.dados.total[i].total)

            }
            return valores
        }, geralista(v) {
            let obj = {}
            for (let i = 0; i < v.data.length; i++) {
                obj = {
                    data: v.data[i],
                    nomeDaUnidade: this.dados.total[i].nomeDaUnidade,
                    backgroundChart: v.backgroundColor[i]
                }
                this.valores.push(obj)
            }
        },
        gerarGrafico() {
            const valores = this.geraData()
            const ctx = document.getElementById('rosca');

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [],
                    datasets: [valores]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            this.geralista(valores);
           
        }
    },
    created() {
        const Data = new Date();
        this.date.dataInicial = this.$moment(new Date(Data.getFullYear(), Data.getMonth(), 1)).format('DD/MM/YYYY')
        this.date.dataFinal = this.$moment(new Date(Data.getFullYear(), Data.getMonth(), Data.getDate())).format('DD/MM/YYYY')
        this.puxaRelatorio();

    }
}
</script>
<style scoped>
@import '~@/assets/css/dashbordStyle.css';
</style>
