<template>
    <nav>
        <v-toolbar color='#96B08A' >
            <v-toolbar-side-icon @click="drawer = !drawer">
                <v-icon> list </v-icon>
            </v-toolbar-side-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title align="center"> Feed Me Now </v-toolbar-title> 
            <v-spacer></v-spacer>
            <v-btn text>
                <v-icon> logout </v-icon>
                <router-link v-on:click.native="logout()" to="/login" exact>Logout</router-link>
            </v-btn>     
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" app color='#96B08A'>
            <v-img src='../assets/logo.png'></v-img>
            <UserCard/>
            <v-list>
                <v-list-tile >
                    <v-list-tile-action>
                        <v-icon> home </v-icon>
                    </v-list-tile-action>
                    <router-link to='/home'>
                        <v-btn text> Home </v-btn>
                    </router-link>
                    <br>

                    <v-list-tile-action>
                        <v-icon> dashboard </v-icon>
                    </v-list-tile-action>
                    <router-link to='/contributions'>
                        <v-btn text> Your Contributions </v-btn>
                    </router-link>
                    <br>

                    <v-list-tile-action>
                        <v-icon> insights </v-icon>
                    </v-list-tile-action>
                    <router-link to='/leaderboard'>
                        <v-btn text> Leaderboard </v-btn>
                    </router-link>
                    <br>

                    <v-list-tile-action>
                        <v-icon> phone </v-icon>
                    </v-list-tile-action>
                    <router-link to='/contactus'>
                        <v-btn text> Contact Us </v-btn>
                    </router-link>
                    
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>


        
    </nav>
</template>

<script>
import { auth } from "../firebase.js";
import UserCard from "./UserCard.vue"

export default {
    name: "NavigationBar",
    data() {
        return {
            drawer : false ,
            links : [
                { icon : 'home' , name : 'Home' , route : '/home'} , 
                { icon : 'dashboard' , name : 'Your Contributions' , route : '/contributions'} ,
                { icon : 'insights' , name : 'Leaderboard' , route : '/leaderboard'} , 
                { icon : 'phone' , name : 'Contact Us' , route : '/contactus'}
            ]
        }
    } , 
    components : {
        UserCard
    } , 
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
a {
    text-decoration: none;
}
.router-link-active {
    background: #eee;
}

</style>