<template>
            <h1 class="text-center ">
                Tombo: {{equipamentos.tombo}}
            </h1>
            <div>
                <form class="form-busca">
                    <input type="text" name="busca" id="busca" placeholder="busca pelo tombo">
                    <button class="button" type="submit"><img class="img-button"
                                src="../../assets/img/pesquisa.svg"></button>
                </form>
            </div>
            <div class="traco-busca"></div>
            <div class="ajust">
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
                                                        <button class="button-azul"><img class="button-img"
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
export default{
    name: 'ListagemEquipamentoView',
      data:()=>({
        equipamentos:'',
        servicos:'',
        pageEquipamentos:[],
        limit:5,
        armazenaIndexProximo:0,
        armazenaIndexAnterior:0,
        anteriorDisponivel: false,
        busca:'',
   }),
    methods:{
        dataRetorno(){
        axios.get(`listagemcomputador/${this.$route.params.id}`).then(({data})=>{
        this.equipamentos=data.equipamento;
        this.servicos=data.servicos;
        this.page();
        })
        },
        page(){
            let i=0;
            for(i; i<this.limit; i++){
                this.pageEquipamentos.push(this.servicos[i]);
            }
        },
        proxima(){
              this.armazenaIndexProximo = this.pageEquipamentos.length;
            this.pageEquipamentos=[]
              for(let i=0; i<this.limit; i++){
                this.pageEquipamentos.push(this.servicos[this.armazenaIndexProximo]);
                this.armazenaIndexProximo++;
            }
        },
        anterior(){
            this.pageEquipamentos=[]        
                this.armazenaIndexAnterior = this.armazenaIndexProximo;
                for(let i=0; i<this.limit; i++){
                this.pageEquipamentos.push(this.servicos[this.armazenaIndexAnterior]);
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
            this.$store.commit('setServicoEquipamento',this.equipamentos)
            this.$router.push({name:"servicodeequipamento"})
        },
        editServico(servico){
            this.$store.commit('setEditServicoEquip',servico)
            this.$router.push({name:"servicodeequipamento"})
        },
          imprimir(servico){
            this.$store.commit('setEditServicoEquip',servico)
            this.$router.push({name:"impressaodeequipamento"})
        }

    },
      created(){
        this.dataRetorno();
    },
    watch:{
        limit(){
            let i=0;
             for(i; i<this.limit; i++){
                this.pageEquipamentos.pop();
            }
            this.page();
        },
        busca(novo){
            let i=0;
             for(i; i<this.limit; i++){
                this.pageEquipamentos.pop();
            }
            this.pageEquipamentos=this.equipamentos.filter(e =>e.tombo.match(novo.toUpperCase()))
        }
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleListagem.css';
</style>
