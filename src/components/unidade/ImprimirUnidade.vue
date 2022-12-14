<template>
               
<div class="impressao">
    <div class="img-div">
        <img src="../../assets/img/iconLogo.png" class="img">
        <p class="p">Protocolo de saida(GMCR)</p>
        <p class="espaco">N° de O.S: numero do serviço</p>

    </div>
    <div class="traco"></div>


    <div class="pag-impressao">
        <div class="form-group  ">
            <p class="informacao ">Telefone: </p>
            <p class="informacao">telefone</p>
        </div>
        <div class="form-group ">
            <p class="informacao">Unidade: </p>
            <p class="informacao">unidade</p>
        </div>
        <div class="form-group ">
            <p class="informacao">Responsável: </p>
            <p class="informacao ">responsável</p>
        </div>


        <div class="form-group fundo ">
            <p class="informacao">Tipo de serviço:</p>
            <p class="informacao ">tipo de serviço</p>
        </div>


        <div class="form-group fundo ">
            <p class="informacao"> data de serviço:</p>
            <p class="informacao "> data do serviço</p>
        </div>
        <div class="form-espaco">

        </div>

        <div class="form-group ">
            <h3 class="informacao">Observação
                </h3>
                    <textarea class="impressao-area" id="observacao" disabled name="observacao" cols="30" rows="10">observação</textarea>
        </div>


        <div class="form-group reponsavel">
            <h1 class="titulo"> SAIDA: </h1>
            <p class="informacao reponsavel "> responsável do NTI: Paulo Amorim</p>
            <p class="informacao  responsavel">assinatura:___________________</p>
        </div>

        <button class="button-imprimir" onClick="window.print()">imprimir</button>

    </div>
</div>

</template>
<script>
export default{
    name: 'ImprimirUnidadeView'
}
</script>
<style scoped>
@import '~@/assets/css/styleListagem.css';
</style>
