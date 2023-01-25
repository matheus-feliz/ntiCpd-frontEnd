<template>
    <cadastro :exibir="exibir" @exbirCadastro="exibirCadastro" @msgs="msgs($event)" />
    <mensagens :msg="msg" :tipo="tipo" :possicao="possicao" />
    <div class="login">
        <input type="email" :class="`form-control margin ${invalida[0]}`" placeholder="Email" id="email" name="email"
            v-model="emailLogin">
        <input type="password" :class="`form-control ${invalida[1]}`" id="password" placeholder="senha" name="password"
            v-model="password">
        <router-link class="senha" to="/esqueceusenha">esqueceu senha?</router-link>
        <button @click="login" class="buttonLogin-1"><span v-if="loginLoading">Login</span>
            <loading-vue v-if="loading" /></button>

        <div class="traco-login"></div>
        <button class="buttonCadastro" @click="exibirCadastro">Cadastro</button>
    </div>
</template>
<script>
import axios from "@/service/axios";
import validator from "validator";
import Cadastro from "./Cadastro.vue";
import loadingVue from "../loading.vue";
import mensagens from "../mensagens.vue";
export default {
    name: 'loginComponent',
    data: () => ({
        exibir: false,
        emailLogin: "",
        password: "",
        loading: false,
        loginLoading: true,
        invalida: ["", ""],
        user: {},
        msg: "",
        tipo: "",
        possicao: "cimaMensagen"
    }), components: {
        Cadastro,
        loadingVue,
        mensagens
    },
    methods: {
        exibirCadastro() {
            this.exibir = !this.exibir
        }, msgs(m) {
            this.msg = m.msg
            this.tipo = m.tipo
        },
        validacao() {
            let erroLogin = [];
            if (this.emailLogin.length === 0) {
                erroLogin.push('email está vazio');
                this.invalida[0] = 'invalido';
            }
            if (this.emailLogin.length > 0) {
                if (!validator.isEmail(this.emailLogin)) {
                    erroLogin.push('email invalido');
                    this.invalida[0] = 'invalido';
                }
                else {
                    this.invalida[0] = "";
                }
            }
            if (this.password.length === 0) {
                erroLogin.push('senha vazia');
                this.invalida[1] = 'invalido';
            }

            if (this.password.length > 0) {
                this.invalida[1] = "";
            }
            return erroLogin;
        },
        async login() {
            try {
                this.loginLoading = false
                this.loading = true;
                let erroLogin = this.validacao();
                if (erroLogin.length > 0) {
                    this.loading = false;
                    this.loginLoading = true;
                    this.msg = erroLogin;
                    this.tipo = "alert-danger"
                }
                if (erroLogin.length === 0) {
                    const response = await axios.post('/login', {
                        email: this.emailLogin,
                        password: this.password,
                    });

                    if (response.data.email === this.emailLogin) {
                        this.user = response.data;
                        this.$store.commit('setUser', this.user);
                        this.email = "";
                        this.password = "";
                        this.msg = erroLogin;
                        this.tipo = "alert-success"
                        this.$router.push('/home');
                    } else {
                        this.loading = false;
                        this.loginLoading = true;
                        this.msg = response.data;
                        this.tipo = "alert-danger"
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
    }
}
</script>
