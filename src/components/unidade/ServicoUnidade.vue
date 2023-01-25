<template>
    <div class="folha">
        <h1 class="text-center-servico"> Cadastro de serviços
        </h1>
        <div class="grid-form">
            <fieldset class="form-contact-servico">
                <div class="form-group-servico">
                    <label class="label-form" for="telefone">Telefone</label>
                    <input :class="`input-form ${invalida[0]}`" id="telefone" name="telefone" type="tel"
                        placeholder="(77) 3333-3333" v-maska data-maska="(##) #####-####" v-model="telefone">
                </div>
                <div class="form-group-servico">
                    <label class="label-form" for="unidade">Unidade</label>
                    <input :class="`input-form ${invalida[1]}`" id="unidade" name="unidade" type="text"
                        placeholder="nome da unidade" v-model="unidade">
                </div>
                <div class="form-group-servico">
                    <label class="label-form" for="responsavel">Responsável</label>
                    <input :class="`input-form ${invalida[2]}`" id="responsavel" name="responsavel" type="text"
                        placeholder="nome do Responsável" v-model="responsavel">
                </div>

                <div class="form-group-servico">
                    <label class="label-form" for="tipo">Tipo de serviço</label>
                    <select :class="`input-form ${invalida[3]}`" name="tipo" id="tipo" v-model="tipoDeServico">
                        <option value=""></option>
                        <option value="Ponto De Rede">Ponto de Rede</option>
                        <option value="Reparos\Configuração">Reparos/ Configuração</option>
                        <option value="VisitaTecnica\Reparos\Configuração">Visita Técnica/ Reparos/ Configuração
                        </option>
                    </select>

                </div>
                <div class="form-group-servico">
                    <label class="label-form" for="dataDeServico">data de serviços</label>
                    <input :class="`input-form ${invalida[4]}`" id="dataDeServico" name="dataDeServico" type="date"
                        v-model="dataDeServico">
                </div>


                <div class="form-espaco">

                </div>

                <div class="form-group-servico">
                    <label class="label-form" for="observacao">Observação</label>
                    <textarea class="input-form" id="observacao" name="observacao" cols="30" rows="10"
                        v-model="observacao"> </textarea>
                </div>
                <button class="button" type="submit" @click="cadastro()"><img class="button-img"
                        src="../../assets/img/salvar.svg" v-if="cadastroLoading">
                    <loadingVue v-if="loading" />
                </button>
            </fieldset>
        </div>
    </div>
    <mensagens :msg="msg" :tipo="tipo" :possicao="possicao" />
</template>
<script>
import { mapState } from 'vuex'
import axios from "@/service/axios"
import loadingVue from "../loading.vue";
import mensagens from '../mensagens.vue';
export default {
    name: 'ServicoUnidadeView',
    data: () => ({
        invalida: ["", "", "", "", ""],
        cadastroLoading: true,
        loading: false,
        telefone: "",
        unidade: "",
        responsavel: "",
        tipoDeServico: "",
        dataDeServico: "",
        observacao: "",
        msg: "",
        tipo: "",
        idEdit:"",
        idEditServico:"",
        possicao: "leftMensagen"
    }), components: {
        loadingVue,
        mensagens
    },
    computed: {
        ...mapState({
            telefoneState: state => state.servicoUnidade.telefone ? state.servicoUnidade.telefone : state.editServicoUnidade.telefone,
            unidadeState: state => state.servicoUnidade.unidade ? state.servicoUnidade.unidade : state.editServicoUnidade.unidade,
            responsavelState: state => state.servicoUnidade.responsavel ? state.servicoUnidade.responsavel : state.editServicoUnidade.responsavel,
            tipoDeServicoState: state => state.editServicoUnidade.tipo ? state.editServicoUnidade.tipo : "",
            dataDeServicoState: state => state.editServicoUnidade.dataDeServico ? state.editServicoUnidade.dataDeServico : "",
            observacaoState: state => state.editServicoUnidade.observacao ? state.editServicoUnidade.observacao : "",
            idServicoState: state => state.editServicoUnidade._id,
            idState: state => state.servicoUnidade._id
        })
    },
    created() {
        this.telefone = this.telefoneState,
            this.unidade = this.unidadeState,
            this.responsavel = this.responsavelState,
            this.tipoDeServico = this.tipoDeServicoState,
            this.dataDeServico = this.dataDeServicoState,
            this.observacao = this.observacaoState
            this.idEdit= this.idState,
            this.idEditServico=this.idServicoState 
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
            if (this.tipoDeServico.length === 0) {
                this.invalida[3] = "invalido";
                erro.push('tipo de serviço vazio');
            } else {
                this.invalida[3] = "";
            }
            if (this.dataDeServico.length === 0) {
                this.invalida[4] = "invalido";
                erro.push('data de serviço vazio');
            } else {
                this.invalida[4] = "";
            }
            return erro;
        },
        async cadastro() {
            try {
                const error = this.validacao();
                if (error.length > 0) {
                    this.msg = error;
                    this.tipo = "alert-danger"
                }
                let servicoUnidade = {
                    telefone: this.telefone,
                    unidade: this.unidade,
                    responsavel: this.responsavel,
                    tipo: this.tipoDeServico,
                    dataDeServico: this.$moment(this.dataDeServico).format('DD/MM/YYYY'),
                    observacao: this.observacao
                }
                if (error.length === 0) {
                    this.cadastroLoading = false;
                    this.loading = true;
                   if (typeof this.idEditServico !== typeof undefined) {
                       const response = await axios.put(`/registro/edit/servicoUnidade/${this.idEditServico}`, servicoUnidade)
                        if (response.data._id) {
                            this.$store.commit('setEditServicoUnid', {})
                            this.$router.push({ name: 'listagemdeunidade', params: { id: response.data._id } })
                        }
                        else {
                            this.loading = false;
                            this.cadastroLoading = true;
                            this.msg = response.data;
                            this.tipo = "alert-danger"
                        }
                    } else {
                        const response = await axios.post('/registro/servicoUnidade', servicoUnidade)
                        if (response.data._id) {
                            this.$store.commit('setServicoUnidade', {})
                            this.$router.push({ name: 'listagemdeunidade', params: { id: response.data._id } })
                        } else {
                            this.loading = false;
                            this.cadastroLoading = true;
                            this.msg = response.data;
                            this.tipo = "alert-danger"
                        }
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleServico.css';
</style>
