<template>
<div>
    <NavigationBar/>
  <div id="all">
    <div id="left">
    <h1>{{animal.name}}</h1>
    <img id="picture" v-bind:src="animal.picture">
    </div>
    <div id="right">
        <h2>{{animalInformation[0].commonName}}</h2>
        <p>COMMON NAME: {{animalInformation[0].commonName}}</p>
        <p>SCIENTIFIC NAME: {{animalInformation[0].scientificName}}</p>
        <p>{{animalInformation[0].information[0]}}
          <br><br>
          {{animalInformation[0].information[1]}}
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
<style scoped>
h1 {
    font-size: 50px;
}
#left {
    padding-inline: 3%;
    float:left;
    width: 35%;
}
#right {
    float:left;
    width:65%
}
#picture {
    width: 100%;
    height: auto;
    object-fit: cover
}
button {
  border-radius:12px;
  background-color: rgb(168, 212, 208);
  padding-inline: 10px;
  margin-inline: 12px;
}
</style>