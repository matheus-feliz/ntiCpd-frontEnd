<template>
            <h1 class="text-center "> Busca de unidade
            </h1>
            <div>
                <div class="form-busca">
                    <input type="text" name="busca" id="busca" placeholder="busca de unidade" v-model="busca">
                    <button class="button-busca" type="submit"><img class="img-button"
                            src="../../assets/img/pesquisa.svg"></button>
                </div>
            </div>
            <div class="traco-busca"></div>
            <div class="ajust">
                        <div class="resultado">
                            <div>
                                <table class="tabela">
                                    <tbody v-for="unidade in pageUnidade" :key="unidade.id">
                                            <tr>
                                                <td>
                                                    <p>
                                                       {{unidade.telefone}}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        {{unidade.unidade}}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        {{unidade.responsavel}}
                                                    </p>
                                                </td>
                                                <td>
                                                    <div class="box">
                                                      <button class="button-azul"><img class="button-img1" src="../../assets/img/delete.png"></button>
                                                      <router-link :to="{name:'cadastrodeunidade'}"><button class="button-verde"><img class="button-img1" src="../../assets/img/escrever.svg"></button></router-link>
                                                      <router-link :to="{name:'servicodeunidade'}"><button class="button-azul"><img class="button-img1" src="../../assets/img/registro.svg"></button></router-link>
                                                      <router-link :to="{name:'listagemdeunidade', params:{id:unidade._id}}"><button class="button-verde"><img class="button-img1" src="../../assets/img/lista-de-tarefas.svg"></button></router-link>
                                                    </div>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
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
                                            <router-link :to="{name:'cadastrodeunidade'}"><button class="adicionar">+ Cadastro</button></router-link>
                                    </div>
                            </div>
                   </div>
</template>
<script>
import axios from "@/service/axios"
export default{
    name: 'BuscaDeUnidadeView',
    data:()=>({
        unidade:[],
        pageUnidade:[],
        limit:5,
        armazenaIndexProximo:0,
        armazenaIndexAnterior:0,
        anteriorDisponivel: false,
        busca:''

    }),
    methods:{
        dataRetorno(){
        console.log('retorno data base')
        axios.get('/buscaunidade').then(({data})=>{
        this.unidade=data;
        this.page();
        })
        },
        page(){
            let i=0;
            for(i; i<this.limit; i++){
                this.pageUnidade.push(this.unidade[i]);
            }
        },
        proxima(){
            this.armazenaIndexProximo = this.pageUnidade.length;
            this.pageUnidade=[]
              for(let i=0; i<this.limit; i++){
                this.pageUnidade.push(this.unidade[this.armazenaIndexProximo]);
                this.armazenaIndexProximo++;
            }
        },
        anterior(){
            this.pageUnidade=[]        
                this.armazenaIndexAnterior = this.armazenaIndexProximo;
                for(let i=0; i<this.limit; i++){
                this.pageUnidade.push(this.unidade[this.armazenaIndexAnterior]);
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
           await axios.delete(`/cadastrounidade/delete/${id}`);
           await this.dataRetorno();
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
        },busca(novo){
              let i=0;
             for(i; i<this.limit; i++){
                this.pageUnidade.pop();
            }
            this.pageUnidade=this.unidade.filter(u=> u.unidade.match(novo.toUpperCase()))

        }

    }
}
</script>
<style scoped>
@import '~@/assets/css/styleBusca.css';
</style>
