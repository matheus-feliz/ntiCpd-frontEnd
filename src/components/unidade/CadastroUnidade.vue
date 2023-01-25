<template>
    <h1 class="text-center-nti"> Cadastro de unidade
    </h1>
    <div class="grid-form">
        <fieldset class="form-contact">
            <div class="form-group">
                <label class="label-form" for="telefone">Telefone</label>
                <input :class="`input-form-unidade ${invalida[0]}`" id="telefone" name="telefone" type="tel"
                    placeholder="(77) 93333-3333" v-maska data-maska="(##) #####-####" v-model="telefone">
            </div>
            <div class="form-group">
                <label class="label-form" for="unidade">Unidade</label>
                <input :class="`input-form-unidade ${invalida[1]}`" id="unidade" name="unidade" type="text"
                    placeholder="nome da unidade" v-model="unidade">
            </div>
            <div class="form-group">
                <label class="label-form" for="responsavel">Responsável</label>
                <input :class="`input-form-unidade ${invalida[2]}`" id="responsavel" name="responsavel" type="text"
                    placeholder="nome do Responsável" v-model="responsavel">
            </div>
            <button class="button-cadastro-unidade" @click="cadastro"><img class="button-img"
                    src="../../assets/img/salvar.svg" v-if="cadastroLoading">
                <loadingVue v-if="loading" />
            </button>
        </fieldset>
        <mensagens :msg="msg" :tipo="tipo" :possicao="possicao" />
    </div>
</template>
<script>
import axios from "@/service/axios"
import { mapState } from 'vuex';
import loadingVue from "../loading.vue";
import mensagens from "../mensagens.vue";
export default {
    name: 'CadastroDeUnidadeView',
    data: () => ({
        invalida: ["", "", ""],
        loading: false,
        cadastroLoading: true,
        telefone: "",
        unidade: "",
        responsavel: "",
        idEdit:"",
        msg: "",
        tipo: "",
        possicao: "cimaMensagen"
    }), components: {
        loadingVue,
        mensagens
    },
    computed: {
        ...mapState({
            telefoneState: state => state.servicoUnidade.telefone ? state.servicoUnidade.telefone : "",
            unidadeState: state => state.servicoUnidade.unidade ? state.servicoUnidade.unidade : "",
            responsavelState: state => state.servicoUnidade.responsavel ? state.servicoUnidade.responsavel : "",
            idState: state => state.servicoUnidade._id
        })
    }, created() {
            this.telefone = this.telefoneState,
            this.unidade = this.unidadeState,
            this.responsavel = this.responsavelState,
            this.idEdit = this.idState
    },
    methods: {
        validacao() {
            let erro = [];
            if (this.telefone.length === 0) {
                this.invalida[0] = "invalido";
                erro.push('telefone vazio');
            }
            else {
                this.invalida[0] = "";
            }
            if (this.unidade.length === 0) {
                this.invalida[1] = "invalido";
                erro.push('unidade vazio');
            } else {
                this.invalida[1] = "";
            }
            if (this.responsavel.length === 0) {
                this.invalida[2] = "invalido";
                erro.push('responsavel vazio');
            } else {
                this.invalida[2] = "";
            }
            return erro
        },
        async cadastro() {
            try {
                let error = this.validacao();
                console.log(error)
                if (error.length > 0) {
                    this.msg = error;
                    this.tipo = "alert-danger"
                }
                let unidadeResponse = {
                    telefone: this.telefone,
                    unidade: this.unidade,
                    responsavel: this.responsavel
                }
                console.log( typeof this.idEdit === typeof undefined, 'undefined' )
                if (error.length === 0) {
                    this.cadastroLoading = false;
                    this.loading = true;
                    if (typeof this.idEdit !== typeof undefined) {
                        console.log('tipo edite ')
                        const response = await axios.put(`/registrounidade/edit/${this.idEdit}`, unidadeResponse)
                        if (response.data._id) {
                            console.log(response.data._id)
                            this.$store.commit('setServicoUnidade', {})
                            this.$router.push({ name: 'listagemdeunidade', params: { id: response.data._id } })
                        }
                        else {
                            this.loading = false;
                            this.cadastroLoading = true;
                            this.msg = response.data;
                            this.tipo = "alert-danger"
                        }
                    } else {
                        console.log('tipo de cadastro')
                        const response = await axios.post('/registrounidade', unidadeResponse)
                        if (response.data._id) {
                            console.log(response.data)
                            this.$router.push({ name: 'listagemdeunidade', params: { id: response.data._id } })
                        } else {
                            this.loading = false;
                            this.cadastroLoading = true;
                            this.msg = response.data;
                            this.tipo = "alert-danger"
                        }
                    }
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleCadastro.css';
@import '~@/assets/css/styleLogado.css';
</style>