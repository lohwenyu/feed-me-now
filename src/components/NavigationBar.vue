<template>
   <div>
        <router-link to="/" exact>Home </router-link>
        <router-link to="/contributions" exact>Your Contributions</router-link>
        <router-link to="/leaderboard" exact>Leader Board</router-link>
        <router-link to="/contactus" exact>Contact Us </router-link>
    </div>
  
</template>

<script>
export default {
  
  data(){
    return{
        msg: 'Feed Me Now'
        }
  }
}
</script>

<style scoped>
div {
    background:rgb(150, 176, 138);
    height: 95px;
    vertical-align: middle;
}
a {
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
.router-link-active {
    background: #eee;
    color: #444;
}
</style>