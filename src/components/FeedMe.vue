<template>
<div>
    <NavigationBar/>
  <div id="all">
    <div id="animalName">
        <h1>{{ animal.name }}</h1>
    </div>
    <div id="left">
        <img id="picture" v-bind:src="animal.picture">
    </div>
    <div id="right">
        <div class="nameContainer">
            <span>COMMON NAME</span>
            <span class="nameText">{{animalInformation[0].commonName}}</span>
        </div>
        <div class="nameContainer">
            <span>SCIENTIFIC NAME</span>
            <span id="scientific" class="nameText">{{animalInformation[0].scientificName}}</span>
        </div>
        <p v-for="(information, index) in animalInformation[0].information" :key="index">
            {{ information }}
        </p>
        <div id="buttonContainer">
            <button @click="mealPayment()">
                <span class="buttonText">Treat a meal</span>
                <span class="amountText">10 SGD</span>
            </button>
            <button @click="feastPayment()">
                <span class="buttonText">Treat a meal</span>
                <span class="amountText">20 SGD</span>
            </button>
        </div>
    
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
<style scoped>
#animalName {
    width: auto;
    padding-inline: 5%;
    margin-top: 40px;
}
h1 {
    font-size: 40px;
}
#left {
    padding-inline: 5%;
    float:left;
    width: 35%;
    height: 180px;
}
#picture {
    width: 100%;
    height: 100%;
    object-fit: cover
}
#right {
    float:left;
    width:50%;
    /* display: flex;
    flex-direction: column; */
}
.nameContainer {
    /* margin-top: 5px; */
    margin-bottom: 15px;
}
.nameText {
    background-color: #E5E5BA;
    width: fit-content;
    /* font-size: 15px; */
    padding-inline: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 5px;
    margin-inline-start: 10px;
}
#scientific {
    font-style: italic;
}
#buttonContainer {
    display: flex;
}
button {
    background-color: rgba(64, 168, 213, 0.24);
    width: 140px;
    height: 70px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    flex-direction: column;
    margin: 10px;
}
button:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
    cursor: pointer;
}
.buttonText {
    font-weight: 600;
    font-size: 18px;
}
.amountText {
    font-size: 15px;
}
</style>