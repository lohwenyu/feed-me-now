<template>
   <div>
    <header>
        <router-link to="/" exact>Home </router-link>
        <router-link to="/contributions" exact>Your Contributions</router-link>
        <router-link to="/leaderboard" exact>Leader Board</router-link>
        <router-link to="/contactus" exact>Contact Us </router-link>
    </header>
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
header{
    background:rgb(150, 176, 138);
    border-style: solid;
    border-color: white;
    border-width: 2px;
    height: 95px;
    text-align: top;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

a{
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
.router-link-active{
    background: #eee;
    color: #444;
}
</style>