<template>
    <div>
        <img id="logo" src='../assets/logo.png'/>
        <router-link to="/home" exact>
        <font-awesome-icon icon="home" size="sm"/>  Home
        </router-link>
        <router-link to="/contributions" exact><font-awesome-icon icon="heart" size="sm"/>  Your Contributions</router-link>
        <router-link to="/leaderboard" exact><font-awesome-icon icon="trophy" size="sm"/>  Leaderboard</router-link>
        <router-link to="/contactus" exact><font-awesome-icon icon="address-book" size="sm"/>  Contact Us</router-link>
        <router-link to="/homedashboard" exact><font-awesome-icon icon="chart-bar" size="sm"/>  Dashboard</router-link>
        <router-link v-on:click.native="logout()" to="/login" exact><font-awesome-icon icon="sign-out-alt" size="sm"/>  Logout</router-link>
        <UserCard/>
    </div>
  
</template>

<script>
import { auth } from "../firebase.js";
import UserCard from "./UserCard.vue";

export default {
    name: "NavigationBar",
    components: {
        UserCard
    },
    methods: {
        logout: async function() {
            return auth.signOut().then(() => {

                auth.onAuthStateChanged((user) => {
                    if (user === null) {
                        this.$router.push({ path: '/login' })
                    }
                })
        
            }).catch((error) => {
                var errorMessage = error.message;
                window.alert(errorMessage);
            });
        }
    }
}
</script>

<style scoped>
#logo {
    height: 65px
}
div {
    background:rgb(150, 176, 138);
    height: 80px;
    display: flex;
    align-items: center;
    padding-inline-start: 10px;
}
a {
    color: #ffffff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 5px;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
}
.router-link-active {
    color: #000000;
}
a:hover { 
    color: #000000;
    transition: ease-in-out 200ms;
}
</style>