<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: "App",
  data(){
    return{
    }
  },
  components:{
    'navigation-bar': NavigationBar
  }
}
</script>

<style>
body {
    /* background-color: #E4EBDD; */
    background-color: rgb(228, 235, 221); 
    font-family: "Roboto", sans-serif;
}
</style>
