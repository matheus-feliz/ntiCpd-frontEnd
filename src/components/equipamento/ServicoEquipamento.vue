<template>
    <div class="folha">
        <h1 class="text-center "> Cadastro de serviços de equipamento
        </h1>
        <div class="grid-form">
            <fieldset class="form-contact-servico-equipamento">
                <div class="form-group-servico-equipamento">
                    <label class="label-form" for="telefone">Telefone</label>
                    <input :class="`input-form-servico-equipamento  ${invalida[0]}`" id="telefone" name="telefone"
                        type="tel" placeholder="(77) 3333-3333" v-maska data-maska="(##) #####-####" v-model="telefone">
                </div>
                <div class="form-group-servico-equipamento">
                    <label class="label-form" for="unidade">Unidade</label>
                    <input :class="`input-form-servico-equipamento  ${invalida[1]}`" id="unidade" name="unidade"
                        type="text" placeholder="nome da unidade" v-model="unidade">
                </div>
                <div class="form-group-servico-equipamento">
                    <label class="label-form" for="responsavel">Responsável</label>
                    <input :class="`input-form-servico-equipamento  ${invalida[2]}`" id="responsavel" name="responsavel"
                        type="text" placeholder="nome do Responsável" v-model="responsavel">
                </div>
                <div class="form-group-servico-equipamento">
                    <label class="label-form" for="tombo">Tombo</label>
                    <input :class="`input-form-servico-equipamento  ${invalida[3]}`" id="tombo" name="tombo" type="text"
                        placeholder="13545357" v-model="tombo">
                </div>
                <div class="form-group-servico-equipamento">
                    <label class="label-form" for="tipo">Tipo de serviço</label>
                    <select :class="`input-form-servico-equipamento  ${invalida[4]}`" name="tipo" id="tipo"
                        v-model="tipoDeServico">
                        <option value=""></option>
                        <option value="Formatação">Formatação</option>
                        <option value="Ponto De Rede">Ponto de Rede</option>
                        <option value="Reparos\Configuração">Reparos/ Configuração</option>
                    </select>

                </div>

                <div class="form-group-servico-equipamento">
                    <label class="label-form" for="backup">Backup</label>
                    <select :class="`input-form-servico-equipamento  ${invalida[5]}`" name="backup" id="backup"
                        v-model="backup">
                        <option value=""></option>
                        <option value="sim">sim</option>
                        <option value="não">não</option>

                    </select>
                </div>
                <div class="form-group-servico-equipamento">
                    <label class="label-form" for="data-inicial">data de entrada</label>
                    <input :class="`input-form-servico-equipamento  ${invalida[6]}`" id="data-inicial"
                        name="dataInicial" type="date" v-model="dataDeEntrada">
                </div>
                <div class="form-group-servico-equipamento">
                    <label class="label-form" for="data-final">data de saida</label>
                    <input :class="`input-form-servico-equipamento  ${invalida[7]}`" id="data-final" name="dataFinal"
                        type="date" v-model="dataDeSaida">
                </div>
                <div class="form-group-servico-equipamento">
                    <label class="label-form" for="solucao">Solução(opcional)</label>
                    <input class="input-form-servico-equipamento " id="solucao" name="solucao" type="text"
                        placeholder="solução" v-model="solucao">
                </div>
                <div class="form-espaco">

                </div>

                <div class="form-group-servico-equipamento">
                    <label class="label-form" for="observacao">Observação</label>
                    <textarea class="input-form-servico-equipamento " id="observacao" name="observacao" cols="30"
                        rows="10" v-model="observacao"> </textarea>
                </div>


                <button class="button" @click="cadastro"><img class="button-img" src="../../assets/img/salvar.svg"
                        v-if="cadastroLoading">
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
import loadingVue from '../loading.vue';
import mensagens from '../mensagens.vue';
export default {
    name: 'ServiçoEquipamentoView',
    data: () => ({
        invalida: ["", "", "", "", "", "", "", ""],
        cadastroLoading: true,
        loading: false,
        telefone: "",
        unidade: "",
        responsavel: "",
        tombo: "",
        tipoDeServico: "",
        backup: "",
        dataDeEntrada: "",
        dataDeSaida: "",
        solucao: "",
        observacao: "",
        msg: "",
        tipo: "",
        possicao: "leftMensagen"
    }), components: {
        loadingVue,
        mensagens
    },
    computed: {
        ...mapState({
            telefoneState: state => state.servicoEquipamento.telefone ? state.servicoEquipamento.telefone : state.editServicoEquipamento.telefone,
            unidadeState: state => state.servicoEquipamento.unidade ? state.servicoEquipamento.unidade : state.editServicoEquipamento.unidade,
            responsavelState: state => state.servicoEquipamento.responsavel ? state.servicoEquipamento.responsavel : state.editServicoEquipamento.responsavel,
            tomboState: state => state.servicoEquipamento.tombo ? state.servicoEquipamento.tombo : state.editServicoEquipamento.tombo,
            id: state => state.servicoEquipamento._id,
            idServicoState: state => state.editServicoEquipamento._id,
            tipoDeServicoState: state => state.editServicoEquipamento.tipo ? state.editServicoEquipamento.tipo : "",
            backupState: state => state.editServicoEquipamento.backup ? state.editServicoEquipamento.backup : "",
            dataDeEntradaState: state => state.editServicoEquipamento.dataInicial ? state.editServicoEquipamento.dataInicial : "",
            dataDeSaidaState: state => state.editServicoEquipamento.dataFinal ? state.editServicoEquipamento.dataFinal : "",
            solucaoState: state => state.editServicoEquipamento.solucao ? state.editServicoEquipamento.solucao : "",
            observacaoState: state => state.editServicoEquipamento.observacao ? state.editServicoEquipamento.observacao : "",
        }),
    },
    created() {
        this.telefone = this.telefoneState,
            this.unidade = this.unidadeState,
            this.responsavel = this.responsavelState,
            this.tombo = this.tomboState,
            this.tipoDeServico = this.tipoDeServicoState,
            this.backup = this.backupState,
            this.dataDeEntrada = this.dataDeEntradaState,
            this.dataDeSaida = this.dataDeSaidaState,
            this.solucao = this.solucaoState,
            this.observacao = this.observacaoState,
            this.idEditServico = this.idServicoState
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
            if (this.tipoDeServico.length === 0) {
                this.invalida[4] = "invalido";
                erro.push('tipo de serviço vazio');
            } else {
                this.invalida[4] = "";
            }
            if (this.backup.length === 0) {
                this.invalida[5] = "invalido";
                erro.push('tipo de backup vazio');
            } else {
                this.invalida[5] = "";
            }
            if (this.dataDeEntrada.length === 0) {
                this.invalida[6] = "invalido";
                erro.push('data de entrada vazio');
            } else {
                this.invalida[6] = "";
            }
            if (this.dataDeSaida.length === 0) {
                this.invalida[7] = "invalido";
                erro.push('data de saida vazio');
            } else {
                this.invalida[7] = "";
            }
            return erro;
        },
        async cadastro() {
            try {
                let error = this.validacao();
                if (error.length > 0) {
                    this.msg = error;
                    this.tipo = "alert-danger"
                }
                const servicoEquipamento = {
                    telefone: this.telefone,
                    unidade: this.unidade,
                    responsavel: this.responsavel,
                    tombo: this.tombo,
                    tipo: this.tipoDeServico,
                    backup: this.backup,
                    dataInicial: this.$moment(this.dataDeEntrada).format('DD/MM/YYYY'),
                    dataFinal: this.$moment(this.dataDeSaida).format('DD/MM/YYYY'),
                    solucao: this.solucao,
                    observacao: this.observacao
                }
                if (error.length === 0) {
                    this.cadastroLoading = false;
                    this.loading = true;
                    if (typeof this.idEditServico !== typeof undefined) {
                        const response = await axios.put(`/registro/edit/servico/${this.idEditServico}`, servicoEquipamento);
                        if (response.data._id) {
                            this.$store.commit('setEditServicoEquip', {})
                            this.$router.push({ name: 'listagemdeequipamento', params: { id: response.data._id } })
                        }else {
                            this.loading = false;
                            this.cadastroLoading = true;
                            this.msg = response.data;
                            this.tipo = "alert-danger"
                        }

                    } else {
                        const response = await axios.post('/registro/servico', servicoEquipamento);
                        if (response.data._id) {
                            this.$store.commit('setServicoEquipamento', {})
                            this.$router.push({ name: 'listagemdeequipamento', params: { id: response.data._id } })
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
