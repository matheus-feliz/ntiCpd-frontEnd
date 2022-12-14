<template>
                <div class="folha">
                    <h1 class="text-center "> Cadastro de serviços de equipamento
                    </h1>
                    <div class="grid-form">
                            <fieldset class="form-contact-servico-equipamento">
                                <div class="form-group-servico-equipamento">
                                    <label class="label-form" for="telefone">Telefone</label>
                                    <input :class="`input-form-servico-equipamento  ${invalida[0]}`" id="telefone" name="telefone" type="tel" placeholder="(77) 3333-3333" v-model="telefone">
                                </div>
                                <div class="form-group-servico-equipamento">
                                    <label class="label-form" for="unidade">Unidade</label>
                                    <input :class="`input-form-servico-equipamento  ${invalida[1]}`" id="unidade" name="unidade" type="text" placeholder="nome da unidade" v-model="unidade">
                                </div>
                                <div class="form-group-servico-equipamento">
                                    <label class="label-form" for="responsavel">Responsável</label>
                                    <input :class="`input-form-servico-equipamento  ${invalida[2]}`" id="responsavel" name="responsavel" type="text" placeholder="nome do Responsável" v-model="responsavel">
                                </div>
                                <div class="form-group-servico-equipamento">
                                    <label class="label-form" for="tombo">Tombo</label>
                                    <input :class="`input-form-servico-equipamento  ${invalida[3]}`" id="tombo" name="tombo" type="text" placeholder="13545357" v-model="tombo">
                                </div>
                                <div class="form-group-servico-equipamento">
                                    <label class="label-form" for="tipo">Tipo de serviço</label>
                                    <select :class="`input-form-servico-equipamento  ${invalida[4]}`" name="tipo" id="tipo" v-model="tipoDeServico">
                                    <option value=""></option>
                                    <option value="Formatação">Formatação</option>
                                    <option value="Ponto De Rede">Ponto de Rede</option>
                                    <option value="Reparos\Configuração">Reparos/ Configuração</option>
                                  </select>

                                </div>

                                <div class="form-group-servico-equipamento">
                                    <label class="label-form" for="backup">Backup</label>
                                    <select :class="`input-form-servico-equipamento  ${invalida[5]}`" name="backup" id="backup" v-model="backup">
                                    <option value=""></option>
                                    <option value="sim">sim</option>
                                    <option value="não">não</option>

                                  </select>
                                </div>
                                <div class="form-group-servico-equipamento">
                                    <label class="label-form" for="data-inicial">data de entrada</label>
                                    <input :class="`input-form-servico-equipamento  ${invalida[6]}`" id="data-inicial" name="dataInicial" type="date" v-model="dataDeEntrada">
                                </div>
                                <div class="form-group-servico-equipamento">
                                    <label class="label-form" for="data-final">data de saida</label>
                                    <input :class="`input-form-servico-equipamento  ${invalida[7]}`" id="data-final" name="dataFinal" type="date" v-model="dataDeSaida">
                                </div>
                                <div class="form-group-servico-equipamento">
                                    <label class="label-form" for="solucao">Solução(opcional)</label>
                                    <input class="input-form-servico-equipamento " id="solucao" name="solucao" type="text" placeholder="solução" v-model="solucao">
                                </div>
                                <div class="form-espaco">

                                </div>

                                <div class="form-group-servico-equipamento">
                                    <label class="label-form" for="observacao">Observação</label>
                                    <textarea class="input-form-servico-equipamento " id="observacao" name="observacao" cols="30" rows="10" v-model="observacao"> </textarea>
                                </div>


                                <button class="button" @click="cadastro"><img class="button-img"  src="../../assets/img/salvar.svg"></button>
                            </fieldset>
                    </div>
                </div>

</template>
<script>
import { mapState} from 'vuex'
import axios from "@/service/axios"
export default{
    name: 'ServiçoEquipamentoView',
     data:()=>({
        invalida:["","","","","","","",""],
    }),
    computed:{
        ...mapState({
        telefone: state => state.servicoEquipamento.telefone ? state.servicoEquipamento.telefone: state.editServicoEquipamento.telefone,
        unidade:state => state.servicoEquipamento.unidade ? state.servicoEquipamento.unidade: state.editServicoEquipamento.unidade,
        responsavel:state => state.servicoEquipamento.responsavel ? state.servicoEquipamento.responsavel: state.editServicoEquipamento.responsavel,
        tombo: state=>state.servicoEquipamento.tombo ? state.servicoEquipamento.tombo: state.editServicoEquipamento.tombo,
        id:state=>state.servicoEquipamento._id,
        idServico:state => state.editServicoEquipamento._id,
        tipoDeServico: state => state.editServicoEquipamento.tipoDeServico?state.editServicoEquipamento.tipoDeServico:"" ,
        backup: state=>state.editServicoEquipamento.backup?state.editServicoEquipamento.backup:"",
        dataDeEntrada: state=>state.editServicoEquipamento.dataDeEntrada?state.editServicoEquipamento.dataDeEntrada:"",
        dataDeSaida: state => state.editServicoEquipamento.dataDeSaida?state.editServicoEquipamento.dataDeSaida:"",
        solucao: state => state.editServicoEquipamento.solucao?state.editServicoEquipamento.solucao:"",
        observacao:state => state.editServicoEquipamento.observacao?state.editServicoEquipamento.observacao:"",
        })
    },
    methods:{
        validacao(){
            let erro =[];
            if(this.telefone.length === 0){
                this.invalida[0] = "invalido";
                erro.push('telefone vazio');
            }
            else{
                this.invalida[0]="";
            }
                if(this.unidade.length === 0){
                this.invalida[1] = "invalido";
                erro.push('unidade vazio');
            }else{
                this.invalida[1]="";
            }
                if(this.responsavel.length === 0){
                this.invalida[2] = "invalido";
                erro.push('responsavel vazio');
            }else{
                this.invalida[2]="";
            }
                if(this.tombo.length === 0){
                this.invalida[3] = "invalido";
                erro.push('tombo vazio');
            }else{
                this.invalida[3]="";
            }
                if(this.tipoDeServico.length === 0){
                this.invalida[4] = "invalido";
                erro.push('tipo de serviço vazio');
            }else{
                this.invalida[4]="";
            }
               if(this.backup.length === 0){
                this.invalida[5] = "invalido";
                erro.push('tipo de backup vazio');
            }else{
                this.invalida[5]="";
            }
               if(this.dataDeEntrada.length === 0){
                this.invalida[6] = "invalido";
                erro.push('data de entrada vazio');
            }else{
                this.invalida[6]="";
            }
               if(this.dataDeSaida.length === 0){
                this.invalida[7] = "invalido";
                erro.push('data de saida vazio');
            }else{
                this.invalida[7]="";
            }
            return erro;
        },
        cadastro(){
           let error = this.validacao();
            const servicoEquipamento={
                  telefone: this.telefone,
                  unidade:this.unidade,
                  responsavel: this.responsavel,
                  tombo:this.tombo ,
                  tipo: this.tipoDeServico,
                  backup:this.backup ,
                  dataInicial:this.dataDeEntrada,
                  dataFinal : this.dataDeSaida,
                  solucao:this.solucao,
                  observacao: this.observacao
            }
            if(error.length ===0){
             if(this.idServico !== ""& this.idServico !== null){
                 const response=axios.post(`/registro/edit/servico/${this.idServico}`,servicoEquipamento);
                if(response.data._id){
                     this.$store.commit('setEditServicoEquip',{})
                    this.$router.push({name:'listagemdeequipamento',params:{id:this.id}})
                }
                
             }else{
                const response= axios.post('/registro/servico',servicoEquipamento);
                if(response.data._id){
                    this.$store.commit('setServicoEquipamento',{})
                    this.$router.push({name:'listagemdeequipamento',params:{id:this.id}})
                }
             }
            }
        }
        }
}
</script>
<style scoped>
@import '~@/assets/css/styleServico.css';
</style>
