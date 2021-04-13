<template>
    <v-app>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
</template>

<script>
export default {
  name: "App",
  data(){
    return{
    }
  },
  components:{
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
body {
  background-color: #e4ebdd;
  margin: 0px;
  padding: 0px
}
</style>

