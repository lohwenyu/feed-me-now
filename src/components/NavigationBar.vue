<template>
    <div>
        <img id="logo" src='../assets/logo.png'/>
        <router-link to="/home" exact><font-awesome-icon icon="home" size="sm"/><span class="pageTitle">Home</span></router-link>
        <router-link to="/contributions" exact><font-awesome-icon icon="heart" size="sm"/><span class="pageTitle">Your Contributions</span></router-link>
        <router-link to="/leaderboard" exact><font-awesome-icon icon="trophy" size="sm"/><span class="pageTitle">Leaderboard</span></router-link>
        <router-link to="/contactus" exact><font-awesome-icon icon="address-book" size="sm"/><span class="pageTitle">Contact Us</span></router-link>
        <router-link v-on:click.native="logout()" to="/login" exact><font-awesome-icon icon="sign-out-alt" size="sm"/><span class="pageTitle">Logout</span></router-link>
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
    height: 65px;
    margin-right:10px
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
.pageTitle {
    margin-left: 5px;
}
</style>