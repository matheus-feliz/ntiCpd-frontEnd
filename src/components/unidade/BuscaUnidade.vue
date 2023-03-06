<template>
    <h1 class="text-center-nti"> Busca de unidade
    </h1>
    <div>
        <div class="form-busca">
            <input type="text" name="busca" id="busca" placeholder="busca de unidade" v-model="busca">
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
            <div>
                <table class="tabela">
                    <tbody v-for="unidade in page" :key="unidade._id">
                        <tr>
                            <td>
                                <p>
                                    {{ unidade.telefone }}
                                </p>
                            </td>
                            <td>
                                <p>
                                    {{ unidade.unidade }}
                                </p>
                            </td>
                            <td>
                                <p>
                                    {{ unidade.responsavel }}
                                </p>
                            </td>
                            <td>
                                <div class="box">
                                    <button class="button-azul" @click="deleteBanco(unidade._id)"><img
                                            class="button-img1" src="../../assets/img/delete.png"></button>
                                    <button class="button-verde" @click="editUnidade(unidade)"><img class="button-img1"
                                            src="../../assets/img/escrever.svg"></button>
                                    <button class="button-azul" @click="Unidade(unidade)"><img class="button-img1"
                                            src="../../assets/img/registro.svg"></button>
                                    <router-link
                                        :to="{ name: 'listagemdeunidade', params: { id: unidade._id } }"><button
                                            class="button-verde"><img class="button-img1"
                                                src="../../assets/img/lista-de-tarefas.svg"></button></router-link>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="box">
            <button @click="anterior" class="botao"> <i class="bi bi-arrow-left-short"></i> </button>
            <button @click="proxima" class="botao"><i class="bi bi-arrow-right-short"></i></button>

        </div>
        <div class="box">
            <router-link :to="{ name: 'cadastrodeunidade' }"><button class="adicionar">+ Cadastro</button></router-link>
        </div>
    </div>
</template>
<script>
import axios from "@/service/axios"
import listagem from '@/mixins/listagem'
import loadingBuscaVue from "../loadingBusca.vue"
export default {
    name: 'BuscaDeUnidadeView',
    data: () => ({
        pages: [],
        page: [],
        limit: 5,
        armazenaIndexProximo: 0,
        armazenaIndexAnterior: 0,
        anteriorDisponivel: false,
        busca: '',
        buscaLoading: false,
        loading: true

    }),
    mixins: [listagem],
    components: {
        loadingBuscaVue
    },
    methods: {
        async dataRetorno() {
            await axios.get('/buscaunidade').then(({ data }) => {
                this.pages = data;
                this.pagev();
            })
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
            await axios.delete(`/cadastrounidade/delete/${id}`);
            for(let i =0;i<this.page;i++){
                if(this.page.id === id){
                    this.page.splice(i,1);

                }
            }
            //location.reload();
        },
        editUnidade(unidade) {
            this.$store.commit('setServicoUnidade', unidade)
            this.$router.push({ name: 'cadastrodeunidade' })
        },
        Unidade(unidade) {
            this.$store.commit('setServicoUnidade', unidade)
            this.$router.push({ name: 'servicodeunidade' })
        }

    },
    async created() {
        await this.dataRetorno();
        this.loading = false;
        this.buscaLoading = true;
    },
    watch: {
        limit() {
            this.limpaPage();
            this.pagev();
        }, busca(novo) {
            this.limpaPage();
            this.page = this.pages.filter(u => u.unidade.match(novo.toUpperCase()));
            if(this.page.length === 0){
                this.limpaPage();
                 window.alert("não encontrado");
            }
            if(novo.length === 0){
                this.limpaPage();
                this.pagev();
            }

        }

    }
}
</script>
<style scoped>
@import '~@/assets/css/styleBusca.css';
@import '~@/assets/css/styleLogado.css';
@import '~@/assets/css/styleRelatorio.css';
</style>
