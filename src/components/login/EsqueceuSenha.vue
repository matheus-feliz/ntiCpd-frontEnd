<template>
    <section class="sencao">
        <div>
            <img class="img-login" title="logo do nti" src="../../assets/img/paulo.png">
        </div>
        <div class="login-esqueceu">
                        <form class="formCadastro" method="POST">
                                    <input type="email" class="form-control margin" placeholder="Email" id="email" name="email">
                                        <input type="email" class="form-control margin" placeholder="Email" id="email" name="email">
                                        <input type="password" class="form-control" id="password" placeholder="senha" name="password">
                                        <input type="password" class="form-control" id="password2" placeholder="confirma senha" name="password2">
                                         <div class="traco-login"></div>
                                            <button type="submit" class="buttonLogin-1">mudar Senha</button>
                                           
                        </form>
        </div>
    </section>
</template>
<script>
export default{
    name: 'EsqueceuSenhaView'
}
</script>
<style scoped>
@import '~@/assets/css/styleLogin.css';
</style>
