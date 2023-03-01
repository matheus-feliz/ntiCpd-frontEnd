<template>
    <h1 class="text-center-nti">
        {{ unidade.unidade }}
    </h1>
    <div>
        <div class="form-busca">
            <input type="text" name="busca" id="busca" placeholder="busca pelo tombo">
            <button class="button-busca" type="submit"><img class="img-button"
                    src="../../assets/img/pesquisa.svg"></button>
            </div>
    </div>
    <div class="traco-busca"></div>
    <div class="ajust" v-if="loading">
        <div class="resultado-flex"><loading-busca-vue /></div>
    </div>
    <div class="ajust" v-if="buscaLoading">
        <div class="resultado">
            <div class="box">
                <table class="tabela">
                    <tbody>
                        <tr v-for="servico in pages" :key="servico._id">
                            <td>
                                <p>
                                    {{ servico.telefone }}
                                </p>
                            </td>
                            <td>
                                <p>
                                    {{ servico.responsavel }}
                                </p>
                            </td>
                            <td>
                                <p>
                                    {{ servico.dataDeServico }}
                                </p>
                            </td>
                            <td>
                                <div class="box">
                                    <button class="button-azul" @click="deleteBanco(servico._id)"><img
                                            class="button-img1" src="../../assets/img/delete.png"></button>
                                    <button class="button-verde" @click="edit(servico)"><img class="button-img1"
                                            src="../../assets/img/escrever.svg"></button>
                                    <button class="button-azul" @click="imprimir(servico)"><img class="button-img1"
                                            src="../../assets/img/impressora.svg"></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>

                            <td colspan="3">
                                <div class="box">
                                    <button class="adicionar" @click="cadastroServico()"> +Nova
                                        ordem </button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>

            </div>

        </div>
    </div>
</template>
<script>
import listagem from "@/mixins/listagem";
import axios from "@/service/axios"
export default {
    name: 'ListagemDeUnidadeView',
    data: () => ({
        unidade: '',
        page: [],
        pages: [],
        limit: 5,
        armazenaIndexProximo: 0,
        armazenaIndexAnterior: 0,
        anteriorDisponivel: false,
        busca: '',
        loading: true,
        buscaLoading: false
    }),
    mixins: [listagem],
    props: ['id'],
    methods: {
        async dataRetorno() {
            await axios.get(`listagemunidade/${this.$route.params.id}`).then(({ data }) => {
                this.unidade = data.unidade;
                this.pages = data.servicos
                this.pagel();
            })
        },
        pagel() {
            let i = 0;
            for (i; i < this.limit; i++) {
                this.page.push(this.pages[i]);
            }
        },
        disponivel() {
            if (this.armazenaIndexAnterior == 0) {
                console.log('está desabilitado')
                return this.anteriorDisponivel = false;
            } else {
                console.log('está habilitado')
                return this.anteriorDisponivel = true
            }
        },
        async deleteBanco(id) {
            await axios.delete(`/listagemunidade/delete/${id}`);
            location.reload();
        },
        cadastroServico() {
            this.$store.commit('setServicoUnidade', this.unidade)
            this.$router.push({ name: "servicodeunidade" })
        },
        edit(servico) {
            this.$store.commit('setEditServicoUnid', servico)
            this.$router.push({ name: "servicodeunidade" })
        },
        imprimir(servico) {
            this.$store.commit('setImprimirUnidade', servico)
            this.$router.push({ name: "impressaodaunidade" })
        }
    },
    created() {
        this.dataRetorno();
        this.loading = false;
        this.buscaLoading = true;
    },
    watch: {
        busca(novo) {
            let i = 0;
            for (i; i < this.limit; i++) {
                this.pageUnidade.pop();
            }
            this.pageUnidade = this.unidade.filter(e => e.unidade.match(novo.toUpperCase()))
        }
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleListagem.css';
@import '~@/assets/css/styleLogado.css';
</style>
