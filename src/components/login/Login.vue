<template>   
<cadastro :exibir="exibir" @exbirCadastro="exibirCadastro"/> 
            <div class="login">
                    <input type="email" :class="`form-control margin ${invalida[0]}`" placeholder="Email" id="email" name="email" v-model="emailLogin">
                    <input type="password" :class="`form-control ${invalida[1]}`" id="password" placeholder="senha" name="password" v-model="password">
                    <router-link  class="senha" to="/esqueceusenha">esqueceu senha?</router-link>
                   <button @click="login" class="buttonLogin-1">Login</button>
                    <div class="traco-login"></div>
                    <button class="buttonCadastro" @click="exibirCadastro">Cadastro</button>
            </div>
</template>
<script>
import axios from "@/service/axios";
import validator from "validator";
import Cadastro from "./Cadastro.vue";
export default{
    name: 'loginComponent',
    data:()=>({
        exibir: false,
        emailLogin: "",
        password:"",
        invalida:["",""],
        user:{}        
    }),components:{
        Cadastro
    },
    methods:{
          exibirCadastro(){
            this.exibir = !this.exibir
        },
        validacao(){
            let erroLogin =[];
                if(this.emailLogin.length === 0){
                    erroLogin.push('email está vazio');
                    this.invalida[0] = 'invalido';
                }
                if(this.emailLogin.length>0){
                    if(!validator.isEmail(this.emailLogin)){
                    erroLogin.push('email invalido');
                    this.invalida[0] = 'invalido';
                }
                else{
                    this.invalida[0] = "";
                }
                }
                if(this.password.length===0){
                    erroLogin.push('senha vazia');
                    this.invalida[1] = 'invalido';
                }
                
                if(this.password.length >0){
                    this.invalida[1] = "";
                }
                return erroLogin;
        },
       async login(){
            try{
                let erroLogin = this.validacao();
                if(erroLogin.length===0){
                const response = await axios.post('/login',{
                email: this.emailLogin,
                password: this.password,
                });                
                if( response.data.email === this.emailLogin){
                this.user = response.data;
                this.$store.commit('setUser',this.user);
                this.email = "";
                this.password = "";
                this.$router.push('/home');
               }
               }                
            }catch(e){
                console.log(e);
            }
        },
    }
}
</script>
