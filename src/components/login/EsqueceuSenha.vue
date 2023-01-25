<template>
    <mensagens :msg="msg" :tipo="tipo" :possicao="possicao" />
    <section class="sencao">
        <div>
            <img class="img-login" title="logo do nti" src="../../assets/img/paulo.png">
        </div>
        <div class="login-esqueceu">
            <input type="email" :class="`form-control margin ${invalida[0]}`" placeholder="Email" id="email"
                name="email">
            <div v-if="exibir">
                <input type="password" :class="`form-control ${invalida[1]}`" id="password" placeholder="senha"
                    name="password" v-model="senha">
                <input type="password" :class="`form-control ${invalida[2]}`" id="password2"
                    placeholder="confirma senha" name="password2" v-model="senha2">
            </div>

            <div class="traco-login"></div>
            <button class="buttonLogin-1" @click="mudarSenha()"><span v-if="esqueceuLoading">mudar Senha</span>
                <loadingVue v-if="loading" />
            </button>

        </div>
    </section>
</template>
<script>
import axios from '@/service/axios';
import loadingVue from "../loading.vue";
import validator from "validator";
import mensagens from '../mensagens.vue';
export default {
    name: 'EsqueceuSenhaView',
    data: () => ({
        id: "",
        senha: "",
        senha2: "",
        email: "",
        exibir: false,
        loading: false,
        esqueceuLoading: true,
        invalida: ["", "", ""],
        msg: "",
        tipo: "",
        possicao: "cimaMensagen"
    }), components: {
        loadingVue,
        mensagens
    },
    methods: {
        valida() {
            let erro = [];
            if (this.email.length === 0) {
                erro.push('email está vazio');
                this.invalida[0] = 'invalido';
            }
            if (this.email.length > 0) {
                if (!validator.isEmail(this.email)) {
                    erro.push('email invalido');
                    this.invalida[0] = 'invalido';
                }
                else {
                    this.invalida[0] = "";
                }
            }
            if (this.exibir) {
                if (this.senha.length === 0) {
                    erro.push('senha vazia');
                    this.invalida[1] = 'invalido';
                }

                if (this.senha.length > 0) {
                    this.invalida[1] = "";
                }
                if (this.senha2.length === 0) {
                    erro.push('senha vazia');
                    this.invalida[2] = 'invalido';
                }

                if (this.senha2.length > 0) {
                    this.invalida[2] = "";
                }
                if (this.senha.length > 0 && this.senha2.length > 0) {
                    if (this.senha !== this.senha2) {
                        erro.push('senha não são iquais');
                        this.invalida[1] = 'invalido';
                        this.invalida[2] = 'invalido';
                    }
                }
            }
            return erro;
        },
        async mudarSenha() {
            let erro = this.valida();
            if (erro.length > 0) {
                this.msg = erro;
                this.tipo = "alert-danger"
            }
            if (erro.length === 0) {
                this.esqueceuLoading = false;
                this.loading = true;
                if (this.id === "") {
                     const response=await axios.post('/esqueceusenha', this.email)
                        this.senha = response.data.user;
                        this.id = response.data.user._id
                    
                    if (this.id) {
                        this.esqueceuLoading = true;
                        this.loading = false;
                        this.exibir = true
                    } else {
                        this.esqueceuLoading = true;
                        this.loading = false;
                        this.exibir = false
                    }
                }
                if (this.id) {
                    const senha = {
                        password: this.senha,
                        password2: this.senha2

                    }
                    const response = await axios.put(`/registersenha/edit/${this.id}`, senha)
                    if (response.data._id) {
                        this.msg = "senha alterada com sucesso";
                        this.tipo = "alert-success"
                    }
                    else {
                        this.loading = false;
                        this.esqueceuLoading = true;
                        this.msg = response.data;
                        this.tipo = "alert-danger"
                    }
                }
            }

        }
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleLogin.css';
</style>
