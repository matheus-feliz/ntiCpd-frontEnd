<template>
            <h1 class="text-center "> Busca de tombo
            </h1>
            <div>
                    <div class="form-busca">
                    <input type="text" name="busca" id="busca" placeholder="busca de equipamento" v-model="busca">
                    <button class="button-busca" type="submit"><img class="img-button"
                            src="../../assets/img/pesquisa.svg"></button>
                </div>
            </div>
            <div class="traco-busca"></div>

            <div class="ajust">
                        <div class="resultado">
                            <div>
                                <table class="tabela">
                                    <tbody>
                                        
                                            <tr  v-for="equipamento in pageEquipamentos " :key="equipamento._id">
                                                <td>
                                                    <p>
                                                        {{equipamento.tombo}}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        {{equipamento.unidade}}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        {{equipamento.responsavel}}
                                                    </p>
                                                </td>
                                                <td>
                                                    <div class="box">
                                                        <button class="button-azul"><img class="button-img" src="../../assets/img/delete.png" @click="delete(equipamento._id)"></button>
                                                         <button class="button-verde"><img class="button-img" src="../../assets/img/escrever.svg" @click="editEquipamento(equipamento)"></button>
                                                         <button class="button-azul" @click="Equipamento(equipamento)"><img class="button-img" src="../../assets/img/registro.svg"></button>
                                                         <button class="button-verde"><img class="button-img" src="../../assets/img/lista-de-tarefas.svg" @click="$router.push({name:'listagemdeequipamento',params:{id:equipamento._id}})"></button>
                                                    </div>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>                               
                            </div>
                        </div>
                          <div class="box">
                                             <button @click="anterior"> page anterior </button>
                                             <button @click="proxima"> page posterior</button>
                                         <select v-model="limit">
                                             <option value="3">3</option>
                                             <option value="5">5</option>
                                             <option value="10">10</option>
                                         </select>
                                                </div>
                                        <div class="box">
                                                 <router-link :to="{name:'cadastrodeequipamento'}"><button class="adicionar">+ Cadastro</button></router-link>
                                         </div> 
            </div>
            proxima:{{armazenaIndexProximo}}
            limit:{{limit}}
            anterior:{{armazenaIndexAnterior}}
</template>
<script>
import axios from "@/service/axios";
export default{
    name: 'BuscaEquipamentoView',
    data:()=>({
        equipamentos:[],
        pageEquipamentos:[],
        limit:5,
        armazenaIndexProximo:0,
        armazenaIndexAnterior:0,
        anteriorDisponivel: false,
        busca:''

    }),
    methods:{
        dataRetorno(){
        axios.get('/buscacomputador').then(({data})=>{
        this.equipamentos=data;
        this.page();
        })
        },
        page(){
            let i=0;
            for(i; i<this.limit; i++){
                this.pageEquipamentos.push(this.equipamentos[i]);
            }
        },
        proxima(){
              this.armazenaIndexProximo = this.pageEquipamentos.length;
            this.pageEquipamentos=[]
              for(let i=0; i<this.limit; i++){
                this.pageEquipamentos.push(this.equipamentos[this.armazenaIndexProximo]);
                this.armazenaIndexProximo++;
            }
        },
        anterior(){
            this.pageEquipamentos=[]        
                this.armazenaIndexAnterior = this.armazenaIndexProximo;
                for(let i=0; i<this.limit; i++){
                this.pageEquipamentos.push(this.equipamentos[this.armazenaIndexAnterior]);
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
        editEquipamento(equipamento){
            this.$store.commit('setServicoEquipamento',equipamento)
            this.$router.push({name:'cadastrodeequipamento'})
        },
           Equipamento(equipamento){
            this.$store.commit('setServicoEquipamento',equipamento)
            this.$router.push({name:'servicodeequipamento'})
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
@import '~@/assets/css/styleBusca.css';
</style>
