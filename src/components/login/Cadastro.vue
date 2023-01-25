<template>
    <div class="fundo-cadastro" v-if="exibir">
        <div class="cadastro">
            <p class="close" @click="exibirC">×</p>
            <input type="text" :class="`form-control ${invalidaCadastro[0]}`" placeholder="nome de usuário" id="nome"
                name="nome" v-model="name">
            <input type="email" :class="`form-control ${invalidaCadastro[1]}`" placeholder="Email" id="email"
                name="email" v-model="emailCadastro">
            <input type="password" :class="`form-control ${invalidaCadastro[2]}`" id="password" placeholder="senha"
                name="password" v-model="passwordCadastro">
            <input type="password" :class="`form-control ${invalidaCadastro[3]}`" id="password2"
                placeholder="confirma senha" name="password2" v-model="confirmPassword">
            <button type="submit" @click="cadastro" class="buttonCadastro"><span v-if="cadastroLoading">Cadastro</span>
                <loadingVue v-if="loading" />
            </button>
        </div>
    </div>
</template>
<script>
import axios from "@/service/axios";
import validator from "validator";
import loadingVue from "../loading.vue";
export default {
    name: 'cadastroComponent',
    data: () => ({
        emailCadastro: "",
        passwordCadastro: "",
        confirmPassword: "",
        name: "",
        invalidaCadastro: ["", "", "", ""],
        loading: false,
        cadastroLoading: true,
        msg: "",
        tipo: ""
    }), components: {
        loadingVue,
    },
    props: {
        exibir: { type: Boolean }
    },
    methods: {
        exibirC() {
            this.$emit('exbirCadastro')
        },
        msgs(msg, tipo) {
            this.msg = msg;
            this.tipo = tipo
            this.$emit('msgs', { msg: this.msg, tipo: this.tipo })
        }
        ,
        validacao() {
            let erro = [];
            if (this.name.length > 0) {
                this.invalidaCadastro[0] = ""
            }
            if (this.passwordCadastro.length > 0) {
                this.invalidaCadastro[2] = ""
            }
            if (this.confirmPassword.length > 0) {
                this.invalidaCadastro[3] = ""
            }
            if (this.emailCadastro.length === 0) {
                erro.push('email está vazio');
                this.invalidaCadastro[1] = 'invalido'
            }
            if (this.emailCadastro.length > 0) {
                if (!validator.isEmail(this.emailCadastro)) {
                    erro.push('email invalido');
                    this.invalidaCadastro[1] = 'invalido'
                } else {
                    this.invalidaCadastro[1] = ""
                }
            }
            if (this.passwordCadastro.length === 0) {
                erro.push('senha vazia');
                this.invalidaCadastro[2] = 'invalido'
            }
            if (this.confirmPassword.length === 0) {
                erro.push('confirma senha vazia');
                this.invalidaCadastro[3] = 'invalido'
            }
            if (this.passwordCadastro.length > 0 && this.confirmPassword.length > 0) {
                if (this.passwordCadastro !== this.confirmPassword) {
                    erro.push('senha não estão idênticas');
                    this.invalidaCadastro[3] = 'invalido'
                    this.invalidaCadastro[2] = 'invalido'
                }
            }
            if (this.name.length === 0) {
                erro.push('nome vazio');
                this.invalidaCadastro[0] = 'invalido'
            }
            return erro;
        },
        async cadastro() {
            try {
                let erro = this.validacao();
                if (erro.length > 0) {
                    this.msgs(erro, "alert-danger");
                }
                if (erro.length === 0) {
                    this.loading = true
                    this.cadastroLoading = false
                    const response = await axios.post('/cadastro', {
                        nome: this.name,
                        email: this.emailCadastro,
                        password: this.passwordCadastro,
                        password2: this.confirmPassword
                    });
                    if (response.data._id) {
                        this.loading = false
                        this.cadastroLoading = true
                        this.name = "";
                        this.emailCadastro = "";
                        this.passwordCadastro = "";
                        this.confirmPassword = "";
                        this.msgs("criado com sucesso", "alert-success");
                    } else {
                        this.msg = response.data;
                        this.tipo = "alert-danger"
                    }
                }

            } catch (e) {
                console.log(e);
            }
        }
    }
}
</script>
