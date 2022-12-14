<template>    
        <section class="sencao">
             <div>
                <img class="img-login" title="logo do nti" src="../assets/img/paulo.png">
            </div>
            <login/>
        </section>

</template>
<script>
import Login from "@/components/login/Login.vue";
export default{
    name: 'loginView',
    data:()=>({
    }),
    components:{
        Login
    }
}
</script>
<style scoped>
@import '~@/assets/css/styleLogin.css';
</style>
