<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <router-view></router-view>
    <!-- <Login/> -->

  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
// import Login from "./components/Login.vue"

export default {
  name: "App",
  data(){
    return{
    }
  },
  components:{
    'navigation-bar': NavigationBar,
    // Login
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  background-color: #e4ebdd;
  font-family: "Roboto", sans-serif;
  margin: 0px;
  padding: 0px
}
</style>
