<template>
    <h1 class="text-center-nti"> Cadastro do computador
    </h1>
   
    <div class="grid-form">
        <fieldset class="form-contact">
            <div class="form-group">
                <label class="label-form" for="telefone">Telefone</label>
                <input :class="`input-form-equipamento ${invalida[0]}`" id="telefone" name="telefone" type="tel"
                    placeholder="(77) 3333-3333" v-maska data-maska="(##) #####-####" v-model="telefone">
            </div>
            <div class="form-group">
                <label class="label-form" for="unidade">Unidade</label>
                <input :class="`input-form-equipamento ${invalida[1]}`" id="unidade" name="unidade" type="text"
                    placeholder="nome da unidade" v-model="unidade">
            </div>
            <div class="form-group">
                <label class="label-form" for="responsavel">Responsável</label>
                <input :class="`input-form-equipamento ${invalida[2]} `" id="responsavel" name="responsavel" type="text"
                    placeholder="nome do Responsável" v-model="responsavel">
            </div>
            <div class="form-group">
                <label class="label-form" for="tombo">Tombo</label>
                <input :class="`input-form-equipamento ${invalida[3]}`" id="tombo" name="tombo" type="text"
                    placeholder="13545357" v-model="tombo">
            </div>
            <div class="form-group">
                <label class="label-form" for="tipo">Tipo do equipamento</label>
                <input :class="`input-form-equipamento ${invalida[4]}`" id="tipo" name="tipo" type="text"
                    placeholder="cpu" v-model="tipoDeEquipamento">
            </div>

            <div class="form-espaco">

            </div>
            <div class="form-group">
                <label class="label-form" for="observacao">Observação</label>
                <textarea class="input-form-equipamento-area" id="observacao" name="observacao" cols="30" rows="10"
                    v-model="observacao"></textarea>
            </div>
            <button class="button-cadastro-unidade" @click="cadastro()"><img class="button-img" src="../../assets/img/salvar.svg"
                    v-if="cadastroLoading">
                <loadingVue v-if="loading" />
            </button>
        </fieldset>
    </div>
    <mensagens :msg="msg" :tipo="tipo" :possicao="possicao"/>
</template>
<script>
import axios from "@/service/axios"
import { mapState } from 'vuex'
import loadingVue from "../loading.vue";
import mensagens from "../mensagens.vue";
export default {
    name: 'CadastroEquipamentoView',
    data: () => ({
        loading: false,
        cadastroLoading: true,
        invalida: ["", "", "", "", ""],
        tipoDeEquipamento: "",
        observacao: "",
        telefone: "",
        unidade: "",
        responsavel: "",
        tombo: "",
        msg: "",
        tipo: "",
        idEdit:"",
        possicao: "rightMensagen"

    }), components: {
        loadingVue,
        mensagens
    },
    computed: {
        ...mapState({
            tipoDeEquipamentoState: state => state.servicoEquipamento.tipoDeEquipamento ? state.servicoEquipamento.tipoDeEquipamento : "",
            observacaoState: state => state.servicoEquipamento.observacao ? state.servicoEquipamento.observacao : "",
            telefoneState: state => state.servicoEquipamento.telefone ? state.servicoEquipamento.telefone : "",
            unidadeState: state => state.servicoEquipamento.unidade ? state.servicoEquipamento.unidade : "",
            responsavelState: state => state.servicoEquipamento.responsavel ? state.servicoEquipamento.responsavel : "",
            tomboState: state => state.servicoEquipamento.tombo ? state.servicoEquipamento.tombo : "",
            idSate: state => state.servicoEquipamento._id,
        })
    }, created() {
        this.tipoDeEquipamento = this.tipoDeEquipamentoState,
            this.observacao = this.observacaoState,
            this.telefone = this.telefoneState,
            this.unidade = this.unidadeState,
            this.responsavel = this.responsavelState,
            this.tombo = this.tomboState,
            this.idEdit = this.idSate
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
            if (this.tombo.length === 0) {
                this.invalida[3] = "invalido";
                erro.push('tombo vazio');
            } else {
                this.invalida[3] = "";
            }
            if (this.tipoDeEquipamento.length === 0) {
                this.invalida[4] = "invalido";
                erro.push('tipo de equipamento vazio');
            } else {
                this.invalida[4] = "";
            }
            return erro;
        },
        async cadastro() {
            let error = this.validacao();
            if(error.length >0){
                this.msg=error;
                this.tipo="alert-danger"
            }
            let equipamento = {
                telefone: this.telefone,
                unidade: this.unidade,
                responsavel: this.responsavel,
                tombo: this.tombo,
                tipo: this.tipo,
                observacao: this.observacao
            };
            if (error.length === 0) {
                this.cadastroLoading = false;
                this.loading = true;
                if (typeof this.idEdit !== typeof undefined && this.idEdit !== null && this.idEdit !== "" && this.idEdit !== " ") {
                    const response = await axios.put(`/register/edit/${this.idEdit}`, equipamento)
                    if (response.data._id) {
                        this.$store.commit('setServicoEquipamento', {})
                        this.$router.push({ name: "listagemdeequipamento", params: { id: response.data._id } })
                    } else {
                        this.loading = false;
                        this.cadastroLoading = true;
                        this.msg = response.data;
                        this.tipo = "alert-danger"
                    }
                }
                else {
                    const response = await axios.post('/cadastrocomputador', equipamento)
                    if (response.data._id) {
                        this.$router.push({ name: "listagemdeequipamento", params: { id: response.data._id } })
                    } else {
                        this.loading = false;
                        this.cadastroLoading = true;
                        this.msg = response.data;
                        this.tipo = "alert-danger"
                    }
                }
            }
        }
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleCadastro.css';
@import '~@/assets/css/styleLogado.css';
</style>
