<template>
<div class="impressao">
    <div class="img-div">
        <img src="../../assets/img/iconLogo.png" class="img">
        <p class="p">Protocolo de saida(GMCR)</p>
        <p class="espaco">N° de O.S:{{numero}}</p>

    </div>
    <div class="traco"></div>

    <div class="pag-impressao">
        <div class="form-group  ">
            <p class="informacao ">Telefone: </p>
            <p class="informacao">
                {{telefone}}
            </p>
        </div>
        <div class="form-group ">
            <p class="informacao">Unidade: </p>
            <p class="informacao">
                {{unidade}}
            </p>
        </div>
        <div class="form-group ">
            <p class="informacao">Responsável: </p>
            <p class="informacao ">
                {{responsavel}}
            </p>
        </div>

        <div class="form-group fundo ">
            <p class="informacao">Tombo:</p>
            <p class="informacao">
                {{tombo}}
            </p>
        </div>
        <div class="form-group fundo ">
            <p class="informacao">backup: </p>
            <p class="informacao">
               {{backup}}
            </p>
        </div>
        <div class="form-group fundo ">
            <p class="informacao">Tipo de serviço:</p>
            <p class="informacao ">
                {{tipoDeServico}}
            </p>
        </div>
        <div class="form-group ">
            <p class="informacao">Solução: </p>
            <p class="informacao ">
               {{solucao}}
            </p>
        </div>
        <div class="form-group ">
            <p class="informacao">data de entrada:</p>
            <p class="informacao">
                {{dataDeEntrada}}
            </p>
        </div>
        <div class="form-group ">
            <p class="informacao"> data de saida:</p>
            <p class="informacao ">
                {{dataDeSaida}}
            </p>
        </div>
        <div class="form-espaco">

        </div>

        <div class="form-group ">
            <h3 class="informacao">Observação
                </h3>
                    <textarea class="impressao-area" id="observacao" disabled name="observacao" cols="30"
                        rows="10" v-model="observacao"></textarea>
        </div>


        <div class="form-group reponsavel">
            <h1 class="titulo"> SAIDA: </h1>
            <p class="informacao reponsavel "> responsável do NTI: Paulo Amorim</p>
            <p class="informacao  responsavel">assinatura:___________________</p>
        </div>

        <button class="button-imprimir" @click="print()">imprimir</button>
    </div>
</div>
</template>
<script>
import { mapState} from 'vuex'
export default{
    name: 'ImprimirEquipamentoView',
    computed:{
        ...mapState({
        telefone: state => state.imprimirEquipamento.telefone,
        unidade:state => state.imprimirEquipamento.unidade,
        responsavel:state => state.imprimirEquipamento.responsavel,
        tombo: state=> state.imprimirEquipamento.tombo,
        tipoDeServico: state => state.imprimirEquipamento.tipo,
        backup: state=>state.imprimirEquipamento.backup,
        dataDeEntrada: state=>state.imprimirEquipamento.dataInicial,
        dataDeSaida: state => state.imprimirEquipamento.dataFinal,
        solucao: state => state.imprimirEquipamento.solucao,
        observacao:state => state.imprimirEquipamento.observacao,
        numero: state =>  state.imprimirEquipamento.numero
        })
    },
    created(){
        console.log('numeor:', this.numero)
    },
    methods:{
        print(){
            console.log('aqui')
            this.$nextTick(() => {
            window.print();
               });
        },
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleListagem.css';
</style>
