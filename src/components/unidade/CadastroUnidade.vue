<template>
            <h1 class="text-center "> Cadastro de unidade
            </h1>
            <div class="grid-form">
                <fieldset class="form-contact">
                    <div class="form-group">
                         <label class="label-form" for="telefone">Telefone</label>
                        <input :class="`input-form-unidade ${invalida[0]}`" id="telefone" name="telefone" type="tel" placeholder="(77) 3333-3333" v-model="telefone">
                    </div>
                    <div class="form-group">
                     <label class="label-form" for="unidade">Unidade</label>
                     <input  :class="`input-form-unidade ${invalida[1]}`" id="unidade" name="unidade" type="text" placeholder="nome da unidade" v-model="unidade">
                    </div>
                    <div class="form-group">
                        <label class="label-form" for="responsavel">Responsável</label>
                        <input  :class="`input-form-unidade ${invalida[2]}`" id="responsavel" name="responsavel" type="text" placeholder="nome do Responsável" v-model="responsavel">
                    </div>
                          <button class="button-cadastro-unidade" @click="cadastro"><img class="button-img"
                             src="../../assets/img/salvar.svg"></button>
                    </fieldset>
                </div>
</template>
<script>
import axios from "@/service/axios"
import { mapState } from 'vuex';
export default{
    name: 'CadastroDeUnidadeView',
      data:()=>({
        invalida:["","",""]
    }),
    computed:{
        ...mapState({
        telefone:state=> state.servicoUnidade.telefone?state.servicoUnidade.telefone:"",
        unidade:state=> state.servicoUnidade.unidade?state.servicoUnidade.unidade:"",
        responsavel:state=> state.servicoUnidade.responsavel?state.servicoUnidade.responsavel:"",
        id:state => state.servicoUnidade._id
    })
    }
    ,
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
        },
        cadastro(){
           let error = this.validacao();
           let unidadeResponse={
             telefone: this.telefone,
             unidade:this.unidade,
             responsavel: this.responsavel
           }
           if(error.length ===0){
            if(this.id !=="" & this.id !== null){
            const response =axios.post(`/registrounidade/edit/${this.id}`,unidadeResponse).cacth(e=>{console.log(e)})
            if(response.data._id){   
                  this.$store.commit('setServicoUnidade', {})             
                this.$router.push({name:'listagemdeunidade', params:{id:response.data._id}})
               }
            }else{
              const response =axios.post('/registrounidade',unidadeResponse).cacth(e=>{console.log(e)})
            if(response.data._id){                
                this.$router.push({name:'listagemdeunidade', params:{id:response.data._id}})
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