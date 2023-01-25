<template>
    <section>
        <h1 class="text-center-relatorio"> Busca de relatorio
        </h1>
        <div>
            <div class="form-busca-relatorio">
                <label for="data-inicial">data inicial</label>
                <input type="date" name="busca" id="dataInicial" :class="`${invalida[0]}`" v-model="dataInicial">
                <label for="data-final">data final</label>
                <input type="date" name="busca" id="dataFinal" :class="`${invalida[1]}`" v-model="dataFinal">
                <button class="button-relatorio" @click="busca"><img class="img-button"
                        src="../../assets/img/pesquisa.svg" v-if="loadingbutton">
                    <loadingVue v-if="loading" />
                </button>
            </div>
        </div>
        <div class="traco-relatorio"></div>
        <div class="response-relatorio" id="response">
            <loading-busca-vue v-if="loadingBusca" />
            <span v-if="buscaLoading">
                <table class="tabela-relatorio" id="tabela">
                    <caption>relatorio geral</caption>

                    <thead>
                        <tr>
                            <th colspan="6">Relatorio de manutenção</th>

                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Setor</td>
                            <td>Formatação</td>
                            <td>Pontos de rede</td>
                            <td>Reparos/configuração</td>
                            <td>Visitas/reparos/configuração</td>
                            <td>Total</td>
                        </tr>
                        <tr v-for="dado in dados" :key="dado">
                            <td>
                                {{ dado.nomeDaUnidade }}
                            </td>
                            <td>
                                {{ dado.formatacao }}
                            </td>
                            <td>
                                {{ dado.pontoDeRede }}
                            </td>
                            <td>
                                {{ dado.reparos }}
                            </td>
                            <td>
                                {{ dado.visitas }}
                            </td>
                            <td>
                                {{ dado.total }}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot class="rodape">
                        <tr>
                            <td colspan="2">Total de serviços:</td>
                            <td colspan="4">
                                {{ total }}
                            </td>

                        </tr>
                    </tfoot>
                </table>

                <div class="data-footer">
                    <p id="dataInicial">data inicial:
                        {{ data.dataInicial }}
                    </p>
                    <p id="dataFinal">data final:
                        {{ data.dataFinal }}
                    </p>
                </div>
                <button class="pdf-button" @click="exportPdf()">Download</button>
            </span>
        </div>
    </section>
</template>
<script>
import axios from "@/service/axios"
import loadingBuscaVue from "../loadingBusca.vue"
import loadingVue from "../loading.vue";
import html2pdf from "html2pdf.js"
export default {
    name: 'relatorioView',
    data: () => ({
        dataInicial: "",
        dataFinal: "",
        dados: {},
        total: "",
        data: {},
        loadingbutton: true,
        loading: false,
        buscaLoading: true,
        loadingBusca: false,
        invalida: ["", ""]
    }), components: {
        loadingBuscaVue,
        loadingVue
    },
    methods: {
        validacao() {
            let erro = []
            if (this.dataInicial.length === 0) {
                this.invalida[0] = "invalido";
                erro.push('data incial vazia')
            } else {
                this.invalida[0] = "";
            }
            if (this.dataFinal.length === 0) {
                this.invalida[1] = "invalido";
                erro.push('data final vazia')
            } else {
                this.invalida[1] = "";
            }
            return erro;
        },
        async busca() {
            const error = this.validacao();
            this.data = { dataInicial: this.$moment(this.dataInicial).format('DD/MM/YYYY'), dataFinal: this.$moment(this.dataFinal).format('DD/MM/YYYY') }
            if (error.length === 0) {
                this.loadingbutton = false; this.buscaLoading = false; this.loading = true; this.loadingBusca = true;
                const response = await axios.post('/relatorioBanco', this.data)
                this.dados = response.data.total;
                this.total = response.data.totalDeServico;
            }
            this.loading = false; this.loadingBusca = false; this.loadingbutton = true; this.buscaLoading = true;
        },
        exportPdf(){
            html2pdf(document.getElementById("tabela"),{
                margin:1,
                filename: `relatorio-da-data-inicial-${this.data.dataInicial}-data-final-${this.data.dataFinal}.pdf`
            })
        }
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleRelatorio.css';
@import '~@/assets/css/styleLogado.css';
</style>
