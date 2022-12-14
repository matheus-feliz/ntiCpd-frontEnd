<template>
            <h1 class="text-center ">
                {{unidade.unidade}}
            </h1>
            <div>
                <form class="form-busca">
                    <input type="text" name="busca" id="busca" placeholder="busca pelo tombo">
                    <button class="button-busca" type="submit"><img class="img-button" src="../../assets/img/pesquisa.svg"></button>
                </form>
            </div>
            <div class="traco-busca"></div>
            <div class="ajust">
                        <div class="resultado">
                            <div class="box">
                                <table class="tabela">
                                    <tbody>
                                            <tr v-for="servico in servicos" :key="servico._id">
                                                <td>
                                                    <p>
                                                        {{servico.telefone}}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                       {{servico.responsavel}}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        {{servico.dataDeServico}}
                                                    </p>
                                                </td>
                                                <td>
                                                    <div class="box">
                                                        <button class="button-azul"><img class="button-img1"
                                                        src="../../assets/img/delete.png"></button>
                                                        <button class="button-verde"><img class="button-img1"
                                                                src="../../assets/img/escrever.svg"></button>
                                                     <router-link :to="{name:'impressaodaunidade'}"><button class="button-azul"><img class="button-img1"
                                                        src="../../assets/img/impressora.svg"></button></router-link>
                                                    </div>
                                                </td>
                                            </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>

                                                            <td colspan="3">
                                                                <div class="box">
                                                                     <button class="adicionar" @click="cadastroServico()">  +Nova
                                                                    ordem </button>
                                                                </div>
                                                            </td>
                                                    </tr>
                                    </tfoot>
                                </table>

                            </div>

                        </div>
            </div>
</template>
<script>
import axios from "@/service/axios"
export default{
    name: 'ListagemDeUnidadeView',
      data:()=>({
        unidade:'',
        servicos:[],
        pageUnidade:[],
        limit:5,
        armazenaIndexProximo:0,
        armazenaIndexAnterior:0,
        anteriorDisponivel: false,
        busca:'',
   }),
   props:['id'],
    methods:{
        dataRetorno(){
        axios.get(`listagemunidade/${this.$route.params.id}`).then(({data})=>{
        this.unidade=data.unidade;
        this.servicos=data.servicos
        this.page();
        })
        },
        page(){
            let i=0;
            for(i; i<this.limit; i++){
                this.pageUnidade.push(this.servicos[i]);
            }
        },
        proxima(){
              this.armazenaIndexProximo = this.pageEquipamentos.length;
            this.pageUnidade=[]
              for(let i=0; i<this.limit; i++){
                this.pageUnidade.push(this.servicos[this.armazenaIndexProximo]);
                this.armazenaIndexProximo++;
            }
        },
        anterior(){
            this.pageUnidade=[]        
                this.armazenaIndexAnterior = this.armazenaIndexProximo;
                for(let i=0; i<this.limit; i++){
                this.pageUnidade.push(this.servicos[this.armazenaIndexAnterior]);
                this.armazenaIndexAnterior--;
            }
            this.armazenaIndexProximo = this.armazenaIndexAnterior;
        
            },
            
        disponivel(){
            if(this.armazenaIndexAnterior == 0){
                console.log('está desabilitado')
                 return this.anteriorDisponivel= false;
            }else{
                console.log('está habilitado')
                 return this.anteriorDisponivel=true
            }
        },
        async delete(id){
           await axios.delete(`/cadastrocomputador/delete/${id}`);
           await this.dataRetorno();
        },
        cadastroServico(){
            this.$store.commit('setServicoUnidade', this.unidade)
            this.$router.push({name:"servicodeunidade"})
        }
    },
      created(){
        this.dataRetorno();
    },
    watch:{
        limit(){
            let i=0;
             for(i; i<this.limit; i++){
                this.pageUnidade.pop();
            }
            this.page();
        },
        busca(novo){
            let i=0;
             for(i; i<this.limit; i++){
                this.pageUnidade.pop();
            }
            this.pageUnidade=this.unidade.filter(e =>e.unidade.match(novo.toUpperCase()))
        }
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleListagem.css'
</style>
