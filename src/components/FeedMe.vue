<template>
 <div>
     <NavigationBar/>
     <v-container>
         <v-row dense align="center">
             <v-col :cols="12">
                 <v-card>
                     <v-img :src="animal.picture" max-height="500"></v-img>
                     <v-card-title> 
                        Common Name : {{ animalInformation[0].commonName}} 
                        <br>
                        Scientific Name : {{ animalInformation[0].scientificName }}     
                    </v-card-title>
                     <v-card-subtitle> 
                        - {{ animalInformation[0].information[0] }}
                        <br>
                        - {{ animalInformation[0].information[1] }}
                     </v-card-subtitle>
                     <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn color="#BBDEFB" @click="mealPayment()"> 
                             <span> Treat A Meal (S$10) </span>
                             <v-icon> mdi-hamburger </v-icon>
                         </v-btn>
                         <v-spacer></v-spacer>
                         <v-btn color="#BBDEFB" @click="feastPayment()">
                             <span> Treat A Feast (S$20) </span>
                             <v-icon> mdi-food </v-icon>
                         </v-btn> 
                         <v-spacer></v-spacer>
                     </v-card-actions>
                 </v-card>
             </v-col>
         </v-row>
     </v-container>
 </div>  
</template>

<script>
import database from "../firebase.js"
import NavigationBar from "./NavigationBar";

export default {
    name: "FeedMe",
    components: {
        NavigationBar
    },
    data() {
        return {
            animal: [],
            animalInformation: [],
            temp:[]
        }
    },
    props: ['selectedanimal'],
    methods: {
        initialiseData: function() {
            console.log(this.selectedanimal)
            this.animal = this.selectedanimal[1]
            database.collection('animalInformation').doc(this.selectedanimal[1].animalInformation)
            .get().then(doc => {
                this.animalInformation.push(doc.data())
            })
        },
        mealPayment: function() {
            this.$router.push(
                {
                path: '/mealpayment',
                name: 'mealpayment',
                params: {temp:this.selectedanimal},
                props:true   
                })
        },
        feastPayment: function() {
            this.$router.push(
                {
                path: '/feastpayment',
                name: 'feastpayment',
                params: {temp:this.selectedanimal},
                props:true   
                })
        }
    },
    created: function() {
        this.initialiseData();
    }
}
</script>
