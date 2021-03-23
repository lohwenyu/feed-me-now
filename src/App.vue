<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';

export default {
 data(){
    return{
    }
  },
  components:{
    'navigation-bar': NavigationBar
  }
}
</script>

<style scoped>
div{
  background-color: rgb(228, 235, 221);
  
}
</style>
