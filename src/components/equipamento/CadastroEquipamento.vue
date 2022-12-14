<template>
                <h1 class="text-center "> Cadastro do computador
                </h1>
                <div class="grid-form">                           
                                        <fieldset class="form-contact">
                                            <div class="form-group">
                                                <label class="label-form" for="telefone">Telefone</label>
                                                <input :class="`input-form-equipamento ${invalida[0]}`" id="telefone" name="telefone" type="tel" placeholder="(77) 3333-3333" v-model="telefone">
                                            </div>
                                            <div class="form-group">
                                                <label class="label-form" for="unidade">Unidade</label>
                                                <input :class="`input-form-equipamento ${invalida[1]}`" id="unidade" name="unidade" type="text" placeholder="nome da unidade" v-model="unidade">
                                            </div>
                                            <div class="form-group">
                                                <label class="label-form" for="responsavel">Responsável</label>
                                                <input :class="`input-form-equipamento ${invalida[2]} `" id="responsavel" name="responsavel" type="text" placeholder="nome do Responsável" v-model="responsavel">
                                            </div>
                                            <div class="form-group">
                                                <label class="label-form" for="tombo">Tombo</label>
                                                <input :class="`input-form-equipamento ${invalida[3]}`" id="tombo" name="tombo" type="text" placeholder="13545357" v-model="tombo">
                                            </div>
                                            <div class="form-group">
                                                <label class="label-form" for="tipo">Tipo do equipamento</label>
                                                <input :class="`input-form-equipamento ${invalida[4]}`" id="tipo" name="tipo" type="text" placeholder="cpu" v-model="tipoDeEquipamento">
                                            </div>

                                            <div class="form-espaco">

                                            </div>
                                            <div class="form-group">
                                                <label class="label-form" for="observacao">Observação</label>
                                                <textarea class="input-form-equipamento-area" id="observacao" name="observacao" cols="30" rows="10" v-model="observacao"></textarea>
                                            </div>
                                            <button class="button" @click="cadastro"><img class="button-img"
                                            src="../../assets/img/salvar.svg"></button>
                                        </fieldset>
                </div>
</template>
<script>
import axios from "@/service/axios"
import { mapState} from 'vuex'
export default{
    name: 'CadastroEquipamentoView',
    data:()=>({
        invalida:["","","","",""]
    }),
    computed:{
        ...mapState({
              tipoDeEquipamento: state => state.servicoEquipamento.tipoDeEquipamento?state.servicoEquipamento.tipoDeEquipamento :"",
              observacao:state => state.servicoEquipamento.observacao?state.servicoEquipamento.observacao :"",
              telefone: state => state.servicoEquipamento.telefone ? state.servicoEquipamento.telefone: "",
              unidade:state => state.servicoEquipamento.unidade ? state.servicoEquipamento.unidade: "",
              responsavel:state => state.servicoEquipamento.responsavel ? state.servicoEquipamento.responsavel: "",
              tombo: state=>state.servicoEquipamento.tombo ? state.servicoEquipamento.tombo: "",
              id:state=>state.servicoEquipamento._id,
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
                if(this.tipoDeEquipamento.length === 0){
                this.invalida[4] = "invalido";
                erro.push('tipo de equipamento vazio');
            }else{
                this.invalida[4]="";
            }
            return erro;
        },
        async cadastro(){
            let error = this.validacao();
            let equipamento = {
                        telefone: this.telefone,
                        unidade:this.unidade,
                        responsavel: this.responsavel,
                        tombo: this.tombo,
                        tipo:this.tipo,
                        observacao:this.observacao
                };
            if(error.length ===0){
               if(this.id !=="" & this.id !== null){
                 const response= await axios.post(`/register/edit/${this.id}`,equipamento).catch(e=>{console.log(e)})
                console.log(response)
                if(response.data._id ){
                    console.log(response.data._id)
                      this.$store.commit('setServicoEquipamento',{})
                    this.$router.push({name:"listagemdeequipamento",params:{id:response.data._id}})
                }
               }
               else{
                 const response= await axios.post('/cadastrocomputador',equipamento).catch(e=>{console.log(e)})
                console.log(response)
                if(response.data._id ){
                    console.log(response.data._id)
                    this.$router.push({name:"listagemdeequipamento",params:{id:response.data._id}})
                }
               }
                }
        }
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleCadastro.css';
</style>
