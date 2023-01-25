
export default {
    methods: {
        pagev() {
            let i = 0;
            for (i; i < this.limit; i++) {
                this.page.push(this.pages[i]);
            }
        },
        proxima() {
            if (this.armazenaIndexProximo === 0) {
                this.armazenaIndexProximo = this.page.length;
            }
            if (this.armazenaIndexProximo <= this.pages.length){
                this.limpaPage();
                for(let i=0; i<this.limit; i++){
                  this.page.push(this.pages[this.armazenaIndexProximo]);
                  this.armazenaIndexProximo++;
              }
            }
        },
        anterior() {
            this.armazenaIndexAnterior = this.armazenaIndexProximo;
           if(this.armazenaIndexAnterior>0){
            this.limpaPage();
            let auxiliar = this.limit + this.limit;
            this.armazenaIndexAnterior = this.armazenaIndexAnterior - auxiliar;
            for (let i = 0; i < this.limit; i++) {
                this.page.push(this.pages[this.armazenaIndexAnterior]);
                this.armazenaIndexAnterior++;
            }
            this.armazenaIndexProximo = this.armazenaIndexAnterior;
           }
        },
        limpaPage() {
            this.page = []
        },
        disponivel() {
            if (this.armazenaIndexAnterior === 0) {
                console.log('está desabilitado')
                this.anteriorDisponivel = false;
            } else {
                console.log('está habilitado')
                this.anteriorDisponivel = true
            }
        }
    }
}
