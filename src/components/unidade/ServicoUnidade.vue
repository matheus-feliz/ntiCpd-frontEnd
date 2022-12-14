<template>
                <div class="folha">
                    <h1 class="text-center-servico"> Cadastro de serviços
                    </h1>
                    <div class="grid-form">
                            <fieldset class="form-contact-servico">
                                <div class="form-group-servico">
                                    <label class="label-form" for="telefone">Telefone</label>
                                    <input :class="`input-form ${invalida[0]}`" id="telefone" name="telefone" type="tel" placeholder="(77) 3333-3333" v-model="telefone">
                                </div>
                                <div class="form-group-servico">
                                    <label class="label-form" for="unidade">Unidade</label>
                                    <input :class="`input-form ${invalida[1]}`" id="unidade" name="unidade" type="text" placeholder="nome da unidade" v-model="unidade">
                                </div>
                                <div class="form-group-servico">
                                    <label class="label-form" for="responsavel">Responsável</label>
                                    <input :class="`input-form ${invalida[2]}`" id="responsavel" name="responsavel" type="text" placeholder="nome do Responsável" v-model="responsavel">
                                </div>

                                <div class="form-group-servico">
                                    <label class="label-form" for="tipo">Tipo de serviço</label>
                                    <select :class="`input-form ${invalida[3]}`" name="tipo" id="tipo" v-model="tipoDeServico">
                                    <option value=""></option>
                                    <option value="Ponto De Rede">Ponto de Rede</option>
                                    <option value="Reparos\Configuração">Reparos/ Configuração</option>
                                    <option value="VisitaTecnica\Reparos\Configuração">Visita Técnica/ Reparos/ Configuração</option>
                                  </select>

                                </div>
                                <div class="form-group-servico">
                                    <label class="label-form" for="dataDeServico">data de serviços</label>
                                    <input :class="`input-form ${invalida[4]}`" id="dataDeServico" name="dataDeServico" type="date" v-model="dataDeServico">
                                </div>


                                <div class="form-espaco">

                                </div>

                                <div class="form-group-servico">
                                    <label class="label-form" for="observacao">Observação</label>
                                    <textarea class="input-form" id="observacao" name="observacao" cols="30" rows="10" v-model="observacao"> </textarea>
                                </div>
                                <button class="button" type="submit"><img class="button-img"  src="../../assets/img/salvar.svg" @click="cadastro()"></button>
                            </fieldset>
                    </div>
                </div>
</template>
<script>
import { mapState} from 'vuex'
export default{
    name: 'ServicoUnidadeView',
     data:()=>({
        tipoDeServico:"",
        dataDeServico:"",
        observacao:"",
        invalida:["","","","",""]
    }),
    computed:{
        ...mapState({
             telefone: state => state.servicoUnidade.telefone,
             unidade: state => state.servicoUnidade.unidade,
             responsavel: state => state.servicoUnidade.responsavel,
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
                if(this.tipoDeServico.length === 0){
                this.invalida[3] = "invalido";
                erro.push('tipo de serviço vazio');
            }else{
                this.invalida[3]="";
            }
               if(this.dataDeServico.length === 0){
                this.invalida[4] = "invalido";
                erro.push('data de serviço vazio');
            }else{
                this.invalida[4]="";
            }
        },
        cadastro(){
            this.validacao();
            let servicoUnidade={
                 telefone: this.telefone,
                 unidade:this.unidade,
                 responsavel: this.responsavel,
                 tipo: this.tipoDeServico,
                 dataDeServico: this.dataDeServico,
                 observacao:this.observacao
            }
            console.log(servicoUnidade)

        }
        }
}
</script>
<style scoped>
@import '~@/assets/css/styleServico.css';
</style>
