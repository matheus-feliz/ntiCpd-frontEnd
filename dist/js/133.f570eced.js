"use strict";(self["webpackChunknticpd"]=self["webpackChunknticpd"]||[]).push([[133],{5200:function(i,a){a["Z"]={methods:{pagev(){let i=0;for(i;i<this.limit;i++)this.page.push(this.pages[i])},proxima(){if(0===this.armazenaIndexProximo&&(this.armazenaIndexProximo=this.page.length),this.armazenaIndexProximo<=this.pages.length){this.limpaPage();for(let i=0;i<this.limit;i++)this.page.push(this.pages[this.armazenaIndexProximo]),this.armazenaIndexProximo++}},anterior(){if(this.armazenaIndexAnterior=this.armazenaIndexProximo,this.armazenaIndexAnterior>0){this.limpaPage();let i=this.limit+this.limit;this.armazenaIndexAnterior=this.armazenaIndexAnterior-i;for(let a=0;a<this.limit;a++)this.page.push(this.pages[this.armazenaIndexAnterior]),this.armazenaIndexAnterior++;this.armazenaIndexProximo=this.armazenaIndexAnterior}},limpaPage(){this.page=[]},disponivel(){0===this.armazenaIndexAnterior?(console.log("está desabilitado"),this.anteriorDisponivel=!1):(console.log("está habilitado"),this.anteriorDisponivel=!0)}}}},133:function(i,a,e){e.r(a),e.d(a,{default:function(){return j}});var t=e(3396),s=e(7139),n=e(1295),o=e(8236),r=e(6836),d=e(4999);const l=i=>((0,t.dD)("data-v-36f0f72b"),i=i(),(0,t.Cn)(),i),u={class:"text-center"},c=(0,t.uE)('<div data-v-36f0f72b><form class="form-busca" data-v-36f0f72b><input type="text" name="busca" id="busca" placeholder="busca pelo tombo" data-v-36f0f72b><button class="button-busca" type="submit" data-v-36f0f72b><img class="img-button" src="'+n+'" data-v-36f0f72b></button></form></div><div class="traco-busca" data-v-36f0f72b></div>',2),m={key:0,class:"ajust"},h={class:"resultado-flex"},p={key:1,class:"ajust"},g={class:"resultado"},b={class:"box"},v={class:"tabela"},f={class:"box"},x=["onClick"],_=l((()=>(0,t._)("img",{class:"button-img1",src:o},null,-1))),z=[_],I=["onClick"],k=l((()=>(0,t._)("img",{class:"button-img1",src:r},null,-1))),w=[k],D=["onClick"],C=l((()=>(0,t._)("img",{class:"button-img1",src:d},null,-1))),P=[C],A={colspan:"3"},$={class:"box"};function y(i,a,e,n,o,r){const d=(0,t.up)("loading-busca-vue");return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t._)("h1",u,(0,s.zw)(i.unidade.unidade),1),c,i.loading?((0,t.wg)(),(0,t.iD)("div",m,[(0,t._)("div",h,[(0,t.Wm)(d)])])):(0,t.kq)("",!0),i.buscaLoading?((0,t.wg)(),(0,t.iD)("div",p,[(0,t._)("div",g,[(0,t._)("div",b,[(0,t._)("table",v,[(0,t._)("tbody",null,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(i.pages,(i=>((0,t.wg)(),(0,t.iD)("tr",{key:i._id},[(0,t._)("td",null,[(0,t._)("p",null,(0,s.zw)(i.telefone),1)]),(0,t._)("td",null,[(0,t._)("p",null,(0,s.zw)(i.responsavel),1)]),(0,t._)("td",null,[(0,t._)("p",null,(0,s.zw)(i.dataDeServico),1)]),(0,t._)("td",null,[(0,t._)("div",f,[(0,t._)("button",{class:"button-azul",onClick:a=>r.deleteBanco(i._id)},z,8,x),(0,t._)("button",{class:"button-verde",onClick:a=>r.edit(i)},w,8,I),(0,t._)("button",{class:"button-azul",onClick:a=>r.imprimir(i)},P,8,D)])])])))),128))]),(0,t._)("tfoot",null,[(0,t._)("tr",null,[(0,t._)("td",A,[(0,t._)("div",$,[(0,t._)("button",{class:"adicionar",onClick:a[0]||(a[0]=i=>r.cadastroServico())}," +Nova ordem ")])])])])])])])])):(0,t.kq)("",!0)],64)}var U=e(5200),S=e(6146),Z={name:"ListagemDeUnidadeView",data:()=>({unidade:"",page:[],pages:[],limit:5,armazenaIndexProximo:0,armazenaIndexAnterior:0,anteriorDisponivel:!1,busca:"",loading:!0,buscaLoading:!1}),mixins:[U.Z],props:["id"],methods:{async dataRetorno(){await S.Z.get(`listagemunidade/${this.$route.params.id}`).then((({data:i})=>{this.unidade=i.unidade,this.pages=i.servicos,this.pagel()}))},pagel(){let i=0;for(i;i<this.limit;i++)this.page.push(this.pages[i])},disponivel(){return 0==this.armazenaIndexAnterior?(console.log("está desabilitado"),this.anteriorDisponivel=!1):(console.log("está habilitado"),this.anteriorDisponivel=!0)},async deleteBanco(i){await S.Z["delete"](`/listagemunidade/delete/${i}`),location.reload()},cadastroServico(){this.$store.commit("setServicoUnidade",this.unidade),this.$router.push({name:"servicodeunidade"})},edit(i){this.$store.commit("setEditServicoUnid",i),this.$router.push({name:"servicodeunidade"})},imprimir(i){this.$store.commit("setImprimirUnidade",i),this.$router.push({name:"impressaodaunidade"})}},created(){this.dataRetorno(),this.loading=!1,this.buscaLoading=!0},watch:{busca(i){let a=0;for(a;a<this.limit;a++)this.pageUnidade.pop();this.pageUnidade=this.unidade.filter((a=>a.unidade.match(i.toUpperCase())))}}},L=e(89);const q=(0,L.Z)(Z,[["render",y],["__scopeId","data-v-36f0f72b"]]);var j=q},6836:function(i,a,e){i.exports=e.p+"img/escrever.2675efea.svg"},4999:function(i,a,e){i.exports=e.p+"img/impressora.bbe28e4f.svg"},1295:function(i,a,e){i.exports=e.p+"img/pesquisa.1623ba07.svg"},8236:function(i,a,e){i.exports=e.p+"img/delete.a5acf64f.png"}}]);
//# sourceMappingURL=133.f570eced.js.map