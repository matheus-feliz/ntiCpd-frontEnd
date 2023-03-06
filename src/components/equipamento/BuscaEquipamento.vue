<template>
    <h1 class="text-center-nti"> Busca de tombo
    </h1>
    <div>
        <div class="form-busca">
            <input type="text" name="busca" id="busca" placeholder="busca de equipamento" v-model="busca">
            <button class="button-busca"><img class="img-button" src="../../assets/img/pesquisa.svg"></button>
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
                    <tbody>
                        <tr v-for="equipamento in page " :key="equipamento._id">
                            <td>
                                <p>
                                    {{ equipamento.tombo }}
                                </p>
                            </td>
                            <td>
                                <p>
                                    {{ equipamento.unidade }}
                                </p>
                            </td>
                            <td>
                                <p>
                                    {{ equipamento.responsavel }}
                                </p>
                            </td>
                            <td>
                                <div class="box">
                                    <button class="button-azul" @click="deletebanco(equipamento._id)"><img
                                            class="button-img1" src="../../assets/img/delete.png"></button>
                                    <button class="button-verde" @click="editEquipamento(equipamento)"><img
                                            class="button-img1" src="../../assets/img/escrever.svg"></button>
                                    <button class="button-azul" @click="Equipamento(equipamento)"><img class="button-img1"
                                            src="../../assets/img/registro.svg"></button>
                                    <button class="button-verde"
                                        @click="$router.push({ name: 'listagemdeequipamento', params: { id: equipamento._id } })"><img
                                            class="button-img1" src="../../assets/img/lista-de-tarefas.svg"></button>
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
            <router-link :to="{ name: 'cadastrodeequipamento' }"><button class="adicionar">+
                    Cadastro</button></router-link>
        </div>
    </div>
</template>
<script>
import axios from "@/service/axios";
import listagem from '@/mixins/listagem';
import loadingBuscaVue from "../loadingBusca.vue";
export default {
    name: 'BuscaEquipamentoView',
    data: () => ({
        pages: [],
        page: [],
        limit: 5,
        armazenaIndexProximo: 0,
        armazenaIndexAnterior: 0,
        anteriorDisponivel: false,
        busca: '',
        buscaLoading: false,
        loading: true,

    }), components: {
        loadingBuscaVue
    }
    , mixins: [listagem],
    methods: {
        async dataRetorno() {
            await axios.get('/buscacomputador').then(({ data }) => {
                this.pages = data;
                this.pagev();
            })
        },
        async deletebanco(id) {
            await axios.delete(`/cadastrocomputador/delete/${id}`);
            location.reload();
        },
        editEquipamento(equipamento) {
            this.$store.commit('setServicoEquipamento', equipamento)
            this.$router.push({ name: 'cadastrodeequipamento' })
        },
        Equipamento(equipamento) {
            this.$store.commit('setServicoEquipamento', equipamento)
            this.$router.push({ name: 'servicodeequipamento' })
        }

    },
    async created() {
        await this.dataRetorno();
        this.loading = false;
        this.buscaLoading = true;
    },
    watch: {
        limit() {
            this.limpaPage()
            this.pagev();
        },
        busca(novo) {
            this.limpaPage();
            this.page = this.pages.filter(e => e.tombo.match(novo.toUpperCase()));
            if (this.page.length === 0) {
                //this.exibir = false;
                this.limpaPage();
                 window.alert("não encontrado");
                
            }
            if (novo.length === 0) {
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
