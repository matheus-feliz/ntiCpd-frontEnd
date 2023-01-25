<template>
            <h1 class="text-center ">
                Tombo: {{equipamentos.tombo}}
            </h1>
            <div>
                <form class="form-busca">
                    <input type="text" name="busca" id="busca" placeholder="busca pelo tombo">
                    <button class="button-busca" type="submit"><img class="img-button"
                                src="../../assets/img/pesquisa.svg"></button>
                </form>
            </div>
            <div class="traco-busca"></div>
            <div class="ajust" v-if="loading"><div class="resultado-flex" ><loading-busca-vue/></div></div>
            <div class="ajust" v-if="buscaLoading">
                        <div class="resultado">
                            <div class="box2">
                                <table class="tabela">
                                    <tbody>
                                            <tr v-for="servico in servicos" :key="servico._id">
                                               <td>
                                                    <p>
                                                        {{servico.tombo}}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        {{servico.dataInicial}}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        {{servico.dataFinal}}
                                                    </p>
                                                </td>
                                                <td>
                                                    <div class="box">
                                                        <button class="button-azul" @click="deleteBanco(servico._id)"><img class="button-img"
                                                            src="../../assets/img/delete.png"></button>
                                                        <button class="button-verde"><img class="button-img"
                                                                    src="../../assets/img/escrever.svg" @click="editServico(servico)"></button>
                                                        <button class="button-azul" @click="imprimir(servico)"><img class="button-img"
                                                            src="../../assets/img/impressora.svg"></button>
                                                    </div>
                                                </td>
                                            </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>                       
                                    
                                        <td colspan="3">
                                                <div class="box">
                                                    <button class="adicionar" @click="cadastroServico()"> +Nova ordem</button>
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
import listagem from '@/mixins/listagem';
import loadingBuscaVue from "../loadingBusca.vue";
export default{
    name: 'ListagemEquipamentoView',
      data:()=>({
        equipamentos:'',
        servicos:'',
        pages:[],
        limit:5,
        armazenaIndexProximo:0,
        armazenaIndexAnterior:0,
        anteriorDisponivel: false,
        busca:'',
        loading:true,
        buscaLoading:false
   }),mixins:[listagem],
   components:{
    loadingBuscaVue
   },
    methods:{
        async dataRetorno(){
        await axios.get(`listagemcomputador/${this.$route.params.id}`).then(({data})=>{
            this.equipamentos = data.equipamento;
            this.servicos=data.servicos;
        })
        await this.page();
        }, 
        page(){
            let i=0;
            for(i; i<this.limit; i++){
                this.pages.push(this.servicos[i]);
            }
        },
      
        async deleteBanco(id){
           await axios.delete(`/listagemcomputador/delete/${id}`);
           await this.dataRetorno();
        },
        cadastroServico(){
            this.$store.commit('setServicoEquipamento',this.equipamentos)
            this.$router.push({name:"servicodeequipamento"})
        },
        editServico(servico){
            this.$store.commit('setEditServicoEquip',servico)
            this.$router.push({name:"servicodeequipamento"})
        },
          imprimir(servico){
            this.$store.commit('setImprimirEquipamento',servico)
            this.$router.push({name:"impressaodeequipamento"})
        }

    },
      async created(){
       await this.dataRetorno();
        this.loading = false;
        this.buscaLoading = true;
    },
    watch:{
        limit(){
            let i=0;
             for(i; i<this.limit; i++){
                this.pages.pop();
            }
            this.page();
        },
        busca(novo){
            let i=0;
             for(i; i<this.limit; i++){
                this.pages.pop();
            }
            this.pages=this.servicos.filter(e =>e.tombo.match(novo.toUpperCase()))
        }
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleListagem.css';
</style>
