"use strict";(self["webpackChunknticpd"]=self["webpackChunknticpd"]||[]).push([[77],{4996:function(i,a,s){s.r(a),s.d(a,{default:function(){return b}});var e=s(3396),n=s(7139),t=s(9242),l=s(2982);const o=i=>((0,e.dD)("data-v-68d89ac4"),i=i(),(0,e.Cn)(),i),h={class:"sencao"},d=o((()=>(0,e._)("div",null,[(0,e._)("img",{class:"img-login",title:"logo do nti",src:l})],-1))),c={class:"login-esqueceu"},u={key:0},g=o((()=>(0,e._)("div",{class:"traco-login"},null,-1))),r={key:0};function m(i,a,s,l,o,m){const p=(0,e.up)("mensagens"),v=(0,e.up)("loadingVue");return(0,e.wg)(),(0,e.iD)(e.HY,null,[(0,e.Wm)(p,{msg:i.msg,tipo:i.tipo,possicao:i.possicao},null,8,["msg","tipo","possicao"]),(0,e._)("section",h,[d,(0,e._)("div",c,[(0,e.wy)((0,e._)("input",{type:"email",class:(0,n.C_)(`form-control margin ${i.invalida[0]}`),placeholder:"Email",id:"email",name:"email","onUpdate:modelValue":a[0]||(a[0]=a=>i.email=a)},null,2),[[t.nr,i.email]]),i.exibir?((0,e.wg)(),(0,e.iD)("div",u,[(0,e.wy)((0,e._)("input",{type:"password",class:(0,n.C_)(`form-control ${i.invalida[1]}`),id:"password",placeholder:"senha",name:"password","onUpdate:modelValue":a[1]||(a[1]=a=>i.senha=a)},null,2),[[t.nr,i.senha]]),(0,e.wy)((0,e._)("input",{type:"password",class:(0,n.C_)(`form-control ${i.invalida[2]}`),id:"password2",placeholder:"confirma senha",name:"password2","onUpdate:modelValue":a[2]||(a[2]=a=>i.senha2=a)},null,2),[[t.nr,i.senha2]])])):(0,e.kq)("",!0),g,(0,e._)("button",{class:"buttonLogin-1",onClick:a[3]||(a[3]=i=>m.mudarSenha())},[i.esqueceuLoading?((0,e.wg)(),(0,e.iD)("span",r,"mudar Senha")):(0,e.kq)("",!0),i.loading?((0,e.wg)(),(0,e.j4)(v,{key:1})):(0,e.kq)("",!0)])])])],64)}var p=s(6146),v=s(7971),w=s(7499),_=s.n(w),q=s(6814),f={name:"EsqueceuSenhaView",data:()=>({id:"",senha:"",senha2:"",email:"",exibir:!1,loading:!1,esqueceuLoading:!0,invalida:["","",""],msg:"",tipo:"",possicao:"cimaMensagen"}),components:{loadingVue:v.Z,mensagens:q.Z},methods:{valida(){let i=[];return 0===this.email.length&&(i.push("email está vazio"),this.invalida[0]="invalido"),this.email.length>0&&(_().isEmail(this.email)?this.invalida[0]="":(i.push("email invalido"),this.invalida[0]="invalido")),this.exibir&&(0===this.senha.length&&(i.push("senha vazia"),this.invalida[1]="invalido"),this.senha.length>0&&(this.invalida[1]=""),0===this.senha2.length&&(i.push("senha vazia"),this.invalida[2]="invalido"),this.senha2.length>0&&(this.invalida[2]=""),this.senha.length>0&&this.senha2.length>0&&this.senha!==this.senha2&&(i.push("senha não são iquais"),this.invalida[1]="invalido",this.invalida[2]="invalido")),i},async mudarSenha(){let i=this.valida();if(i.length>0&&(this.msg=i,this.tipo="alert-danger"),0===i.length)if(this.esqueceuLoading=!1,this.loading=!0,this.id.length>0){const i={email:this.email,password:this.senha,password2:this.senha2};console.log("senha edit",this.id);const a=await p.Z.put(`/registersenha/edit/${this.id}`,i);console.log(a),"sucesso"===a.data?(this.msg=["senha alterada com sucesso"],this.tipo="alert-success",this.loading=!1,this.esqueceuLoading=!0):(this.loading=!1,this.esqueceuLoading=!0,this.msg=a.data,this.tipo="alert-danger")}else{console.log("senha email");const i=await p.Z.post("/esqueceusenha",{email:this.email});this.id=i.data._id,console.log(i),this.id?(this.esqueceuLoading=!0,this.loading=!1,this.exibir=!0):(this.esqueceuLoading=!0,this.loading=!1,this.exibir=!1)}}}},k=s(89);const y=(0,k.Z)(f,[["render",m],["__scopeId","data-v-68d89ac4"]]);var b=y}}]);
//# sourceMappingURL=77.5cb0565b.js.map