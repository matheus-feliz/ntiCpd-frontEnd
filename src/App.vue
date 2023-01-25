<template>
    <router-view/>
</template>
<script>
 import axios from "@/service/axios";
export default{
   created: async()=>{
           await axios.get('/');
    }
}
</script>

<style>
body{
    background-color: #dbe3ee;
    margin: 0px;
    box-sizing: border-box;
    scroll-behavior: smooth;
}
</style>

