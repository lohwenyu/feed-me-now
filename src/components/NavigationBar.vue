<template>
    <div>
        <router-link to="/home" exact>Home</router-link>
        <router-link to="/contributions" exact>Your Contributions</router-link>
        <router-link to="/leaderboard" exact>Leader Board</router-link>
        <router-link to="/contactus" exact>Contact Us</router-link>
        <router-link v-on:click.native="logout()" to="/login" exact>Logout</router-link>
    </div>
  
</template>

<script>
import { auth } from "../firebase.js";

export default {
    name: "NavigationBar",
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
    /* can change the style of this if needed */
    color: #000000;
    transition: ease-in-out 200ms;
}
</style>