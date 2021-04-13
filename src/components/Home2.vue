<template>
    <v-app>
        <NavigationBar2/>
        <div>
            <v-container class="my-5">
                <v-layout row wrap>
                    <v-flex xs12 md6 lg4 v-for="(animal, index) in animals" :key="index">
                        <v-card flat class="text-center ma-3" height="400px" width="400px" id="card-outter">
                            <v-responsive>
                                <v-img :src="animal[1].picture" height="200px" width="400px"></v-img>
                            </v-responsive>
                            <v-card-text>
                                <div> 
                                    <p style="font-size:40px"> {{ animal[1].name }} </p>
                                </div>
                                <div> {{ animal[1].description }}</div>
                            </v-card-text>
                            <v-card-actions id="card-actions">
                                <v-btn color="#40A8D4" v-bind:id="index" @click="route($event)">
                                    <v-icon small left> mdi-food </v-icon>
                                    <span> Feed Me </span>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </v-app>
</template>

<script>
import database from '../firebase.js'
import NavigationBar2 from './NavigationBar2.vue'
export default {
    name: "Home",
    components : {
        NavigationBar2
    } , 
    data() {
        return {
            animals : [],
            selectedanimal: []
        }
    } ,
    methods : {
        fetchDetails : function(){
            database.collection("animals").get().then((querySnapShot) => {
                let item = {}
                querySnapShot.forEach(doc => {
                    item = doc.data()
                    item.show = false 
                    this.animals.push([doc.id,item])

                })
            })
        },
        route: function(event) {
            let id = event.target.getAttribute('id');
            this.$router.push({
                path: '/feedme',
                name: 'feedme',
                params: {selectedanimal: this.animals[id]},
                props: true 
            }) 
        }
    } , 
    created() {
        this.fetchDetails()
        }
   
    
}
</script>

<style scoped>
    .v-application {
        background-color: #e4ebdd;
    }
    #card-outter {
        position : relative ;
        padding-bottom: 50px ; ;
    }
    #card-actions {
        position : absolute ; 
        bottom : 0 ; 
        margin-left: 270px;
    }
</style>