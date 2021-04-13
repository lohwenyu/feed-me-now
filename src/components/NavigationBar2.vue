<template>
    <nav>
        <v-toolbar flat app color="#96B08A">
            <v-btn icon @click="drawer = !drawer">
                <v-icon> view_headline </v-icon>
            </v-btn>
            <v-img src='../assets/logo.png' max-height="50px" max-width="50px"></v-img>
            <v-toolbar-title> Feed Me Now </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text>
                <span>
                    <router-link @click.native="logout()" to="/login" exact> Logout </router-link>
                </span>
                <v-icon right> exit_to_app </v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer v-model="drawer" app temporary width="20%" color="#96B08A">
            <template v-slot:prepend>
                <div id="container">
                    <div id="name">
                        <span>{{ name }}</span>
                    </div>
                    <div id="status">
                        <span>
                            <font-awesome-icon icon="paw" size="sm"/>
                            {{ status }}
                        </span>
                    </div>
                </div>
            </template>
            <v-list>
                <v-list-item> 
                    <v-icon> home </v-icon>
                    <router-link to='/home' exact> Home </router-link>    
                </v-list-item>
                <v-list-item>
                    <v-icon> poll </v-icon>
                    <router-link to='/contributions' exact> Your Contributions </router-link>
                </v-list-item>
                <v-list-item>
                    <v-icon> star_outline </v-icon>
                    <router-link to='/leaderboard' exact> LeaderBoard </router-link>
                </v-list-item>
                <v-list-item>
                    <v-icon> phone </v-icon>
                    <router-link to='/contactus' exact> Contact Us </router-link>
                </v-list-item>
            </v-list>
        </v-navigation-drawer> 
    </nav>
</template>

<script>
import database, { auth } from "../firebase.js";
export default {
    data(){
        return {
            drawer : false ,
            name : null , 
            status : null
        }
    } , 
    methods: {
        getUser: function() {
            var userId = auth.currentUser.uid;
            database.collection("users").doc(userId).get().then(doc => {
                this.name = doc.data().name;
                this.status = doc.data().status
            })
        }
    },
    created() {
        this.getUser()
    }

}
</script>

<style scoped>
    #container {
    height: 60px;
    width: "20%";
    background-color: #CCD2A8;
    }
    #name {
        font-size: 18px;
        font-weight: bold;
        margin-top: 3px;
        margin-bottom: 3px;
    }
    #status {
        font-size: 14px;
        margin-top: 3px;
        margin-bottom: 3px;
    }
    a {
        text-decoration: none;
    }
    a:hover { 
    color: #000000;
    transition: ease-in-out 200ms;
    }
</style>