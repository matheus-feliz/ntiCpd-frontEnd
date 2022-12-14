<template>
    <section>
            <h1 class="text-center-relatorio "> Busca de relatorio
            </h1>
            <div>
                <div class="form-busca-relatorio">
                    <label for="data-inicial">data inicial</label>
                    <input type="date" name="busca" id="dataInicial" :class="`${invalida[0]}`" v-model="dataInicial">
                    <label for="data-final">data final</label>
                    <input type="date" name="busca" id="dataFinal" :class="`${invalida[1]}`" v-model="dataFinal">
                    <button class="button-relatorio" @click="enviar"><img class="img-button" src="../../assets/img/pesquisa.svg"></button>
                </div>
            </div>
            <div class="traco-relatorio"></div>
            <span>
                <div class="response-relatorio" id="response">
                    <table class="tabela-relatorio" id="tabela">
                        <caption>relatorio geral</caption>

                        <thead>
                            <tr>
                                <th colspan="6">Relatorio de manutenção</th>

                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Setor</td>
                                <td>Formatação</td>
                                <td>Pontos de rede</td>
                                <td>Reparos/configuração</td>
                                <td>Visitas/reparos/configuração</td>
                                <td>Total</td>


                            </tr>
                            <div>
                                <tr>
                                    <td>
                                        nomeDaUnidade
                                    </td>
                                    <td>
                                        formatacao
                                    </td>
                                    <td>
                                        pontoDeRede
                                    </td>
                                    <td>
                                        reparos
                                    </td>
                                    <td>
                                        visitas
                                    </td>
                                    <td>
                                        total
                                    </td>
                                </tr>
                            </div>

                        </tbody>
                        <tfoot class="rodape">
                            <tr>
                                <td colspan="2">Total de serviços:</td>
                                <td colspan="4">
                                    totalDeServico
                                </td>

                            </tr>
                        </tfoot>
                    </table>

                    <div class="data-footer">
                        <p id="dataInicial">data inicial:
                            dataInicial
                        </p>
                        <p id="dataFinal">data final:
                            dataFinal
                        </p>
                    </div>
                     <button class="pdf-button">Download</button>
                </div>
            </span>
    </section>
</template>
<script>
export default{
    name: 'relatorioView',
    data:()=>({
        dataInicial:"",
        dataFinal:"",
        invalida:["",""]
    }),
    methods:{
        validacao(){
            if(this.dataInicial.length === 0){
                this.invalida[0]="invalido";
            }else{
                this.invalida[0]="";
            }
             if(this.dataFinal.length === 0){
                this.invalida[1]="invalido";
            }else{
                this.invalida[1]="";
            }
        }
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleRelatorio.css';
</style>
