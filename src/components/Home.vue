<template>
    <div class="homepage">
        <NavigationBar/>
        <PageHeader v-bind:header="'Home'"/>
        <v-container fill-height fluid>
            <v-row dense align="center">
                <v-col v-for="(animal, index) in animals" :key="index" :cols="6" >
                    <br>
                    <v-card max-width="650" max-height="650">
                        <v-img :src="animal[1].picture" max-height="450"></v-img>
                        <v-card-title> {{ animal[1].name }} </v-card-title>
                        <v-card-subtitle> {{ animal[1].description }} </v-card-subtitle>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-button v-bind:id=index @click="route($event)" align='right'>
                                Feed Me 
                                <v-icon> mdi-food </v-icon>
                            </v-button>
                        </v-card-actions>
                    </v-card>                    
                </v-col>
            </v-row>
        </v-container>

    </div>
    
</template>


<script>
import database from '../firebase.js'
import NavigationBar from "./NavigationBar.vue";
import PageHeader from "./PageHeader.vue"

export default {
    name: "Home",
    components : {
        NavigationBar ,
        PageHeader
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
