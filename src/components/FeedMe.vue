<template>
    <v-app>
        <div>
            <NavigationBar/>
            <div id="all">
                <div id="left">
                    <h1>{{animal.name}}</h1>
                    <img id="picture" v-bind:src="animal.picture">
                </div>
                <div id="right">
                    <h2>{{commonName}}</h2>
                    <p>COMMON NAME: {{commonName}}</p>
                    <p>SCIENTIFIC NAME: {{scientificName}}</p>
                    <p v-for="(information, index) in informations" :key="index">
                            {{ information }}
                    </p>
                    <button @click="mealPayment()">
                        <h2>Treat a meal</h2>
                        <p>10 SGD</p>
                    </button>
                    <button @click="feastPayment()">
                        <h2>Treat a feast</h2>
                            <p>20 SGD</p>
                    </button>
                </div>
            </div>
        </div>
    </v-app>
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
            animalDetails: [],
            temp:[],
            filler: [],
            commonName:'',
            scientificName:'',
            informations:[]
        }
    },
    props: ['selectedanimal'],
    methods: {
        initialiseData: function() {
            console.log(this.selectedanimal)
            this.animal = this.selectedanimal[1]
            database.collection('animalInformation').doc(this.selectedanimal[1].animalInformation)
            .get().then(doc => {
                this.animalDetails.push(doc.data())            
            }).then(() => {
                var helper = JSON.parse(JSON.stringify(this.animalDetails))
                this.commonName=helper[0].commonName
                this.scientificName=helper[0].scientificName
                this.informations=helper[0].information

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
        },
        debug: function() {
        }
    },
    created: function() {
        this.initialiseData();
    }
}
</script>
<style scoped>
.v-application {
    background-color: #e4ebdd;
}
h1 {
    font-size: 50px;
}
#left {
    padding-inline: 3%;
    float:left;
    width: 30%;
}
#right {
    float:left;
    width:30%
}
#all {
    padding-left: 30%;
}
#picture {
    width: 100%;
    height: auto;
    object-fit: cover
}
#buttons {
    padding-left: 40%;
    padding-right: 30%
}
button {
  border-radius:12px;
  background-color: rgb(168, 212, 208);
  padding-inline: 10px;
  margin-inline: 12px;
  width: 30%
}
</style>