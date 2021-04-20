<template>
    <div id="navbar">
        <div id="navContainer">
            <img id="logo" src='../assets/logo.png'/>
            <router-link to="/home" exact><font-awesome-icon icon="home" size="sm"/><span class="pageTitle">Home</span></router-link>
            <router-link to="/contributions" exact><font-awesome-icon icon="heart" size="sm"/><span class="pageTitle">Your Contributions</span></router-link>
            <router-link to="/leaderboard" exact><font-awesome-icon icon="trophy" size="sm"/><span class="pageTitle">Leaderboard</span></router-link>
            <router-link to="/contactus" exact><font-awesome-icon icon="address-book" size="sm"/><span class="pageTitle">Contact Us</span></router-link>
            <router-link to="/homedashboard" exact><font-awesome-icon icon="chart-bar" size="sm"/><span class="pageTitle">Dashboard</span></router-link>
            <router-link v-on:click.native="logout()" to="/login" exact><font-awesome-icon icon="sign-out-alt" size="sm"/><span class="pageTitle">Logout</span></router-link>
            <UserCard/>
        </div>
        <div id="responsiveContainer">
            <img id="logo" src='../assets/logo.png'/>
            <button v-on:click="switchDrawer()" id="barIcon"><font-awesome-icon icon="bars" size="lg"/></button>
            <div id="drawer">
                <UserCard/>
                <router-link to="/home" exact><font-awesome-icon icon="home" size="sm"/><span class="pageTitle">Home</span></router-link>
                <router-link to="/contributions" exact><font-awesome-icon icon="heart" size="sm"/><span class="pageTitle">Your Contributions</span></router-link>
                <router-link to="/leaderboard" exact><font-awesome-icon icon="trophy" size="sm"/><span class="pageTitle">Leaderboard</span></router-link>
                <router-link to="/contactus" exact><font-awesome-icon icon="address-book" size="sm"/><span class="pageTitle">Contact Us</span></router-link>
                <router-link to="/homedashboard" exact><font-awesome-icon icon="chart-bar" size="sm"/><span class="pageTitle">Dashboard</span></router-link>
                <router-link v-on:click.native="logout()" to="/login" exact><font-awesome-icon icon="sign-out-alt" size="sm"/><span class="pageTitle">Logout</span></router-link>
                
            </div>
        </div>
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
        },
        switchDrawer: function() {
            var element = document.getElementById("drawer")
            if (element.className == "") {
                element.className = "responsive"
            } else if (element.className == "responsive") {
                element.className = ""
            }
        }
    }
}
</script>

<style scoped>
#navbar {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 2;
}
#logo {
    height: 65px;
    margin-right:15px;
}
#navContainer {
    width: 100%;
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
    margin: 10px;
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

#responsiveContainer {
    display: none;
}
#barIcon {
    position: absolute;
    right: 20px;
    outline: none;
    border: none;
    background: none;
    color: #ffffff;
}
#barIcon:hover {
    color: #000000;
    transition: ease-in-out 200ms;
    cursor: pointer;
}
@media screen and (max-width: 1150px) {
    #navContainer {
        display: none;
    }
    #responsiveContainer {
        position: relative;
        display: flex;
        height: 80px;
        align-items: center;
        padding-inline-start: 10px;
        background-color: rgb(150, 176, 138);
        width: 100%;
        /* height: 100%; */
    }
    #drawer {
        display: none;
    }
    #responsiveContainer .responsive {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        top: 80px;
        background-color: rgb(150, 176, 138);
        z-index: 1;
    }
}
</style>