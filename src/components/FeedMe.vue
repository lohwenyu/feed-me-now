<template>
<div>
    <NavigationBar/>
  <div id="all">
    <div id="animalName">
        <h1>{{ animal.name }}</h1>
    </div>
    <div id="contentContainer">
        <div id="left">
            <img id="picture" v-bind:src="animal.picture">
        </div>
        <div id="right">
            <div id="informationContainer">
                <div class="nameContainer">
                    <span class="nameTitle">COMMON NAME</span>
                    <span class="nameText">{{animalInformation[0].commonName}}</span>
                </div>
                <div class="nameContainer">
                    <span class="nameTitle">SCIENTIFIC NAME</span>
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
                        <span class="buttonText">Treat a feast</span>
                        <span class="amountText">20 SGD</span>
                    </button>
                </div>
            </div>
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
#contentContainer {
    background-color: white;
    display: flex;
    margin-left: 5%;
    margin-right: 5%;
    padding-top: 3%;
    padding-bottom: 3%;
    box-shadow: 1px 1px rgb(136, 136, 136, 0.5);
    margin-bottom: 20px;
}
#left {
    padding-inline: 3%;
    float:left;
    width: 40%;
    height: 30vh;
}
#picture {
    width: 100%;
    height: 100%;
    object-fit: cover
}
#right {
    float:left;
    width:60%;
}
#informationContainer {
    margin-inline: 6%
}
.nameContainer {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.nameTitle {
    margin-right: 10px;
}
.nameText {
    background-color: #E5E5BA;
    width: fit-content;
    padding-inline: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 5px;
}
#scientific {
    font-style: italic;
}
#buttonContainer {
    display: flex;
}
button {
    background-color: rgba(64, 168, 213, 0.24);
    width: fit-content;
    height: fit-content;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    flex-direction: column;
    margin-inline: 10px;
    box-shadow: 1px 1px rgba(64, 168, 213, 0.5);
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
    padding-top: 5px;
    font-size: 15px;
}
</style>