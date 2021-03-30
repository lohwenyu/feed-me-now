<template>
    <div id="mainContainer">
        <span id="name">{{ animal.name }}</span>
        <div id="speciesContainer">
            <span>{{ information[0].commonName }}</span>
        </div>
        <div id="AnimalContainer">
            <img v-bind:src="animal.picture">
            <div class="row">
                <FeedCounter v-bind:mealQuantity="array[0]" v-bind:feastQuantity="array[1]"/>
                <FeedAgainButton class="column"/>
            </div>
        </div>
        <div id="ranking">
             <span><strong>You are the </strong></span><br>
             <span style="font-size:40px"><strong>#{{array[2]}} </strong></span><br>
             <span><strong> contributor </strong></span>
             <p>with {{array[0]+2*array[1]}} contributions</p>
         </div>
    </div>
</template>
<script>
import FeedAgainButton from './FeedAgainButton.vue';
import FeedCounter from "./FeedCounter.vue";
import database from "../firebase.js";

export default {
    name: "ContributionCard",
    components: {
        FeedCounter,
        FeedAgainButton
    },
    props: {
        animalId: {
            type: String
        },
        array: {
            type: Array
        }
    },
    data() {
        return {
            animal: null,
            information: []
        }
    },
    methods: {
        fetchAnimal: function() {
            database.collection('animals').doc(this.animalId).get().then(doc => {
                this.animal = doc.data();
            }).then(() => {
                console.log(this.animal);
                this.fetchInformation()
            });
        },
        fetchInformation: function() {
            database.collection('animalInformation').doc(this.animal.animalInformation).get().then(doc => {
                this.information.push(doc.data());
            })
        }
    },
    created() {
        this.fetchAnimal()
    }
}
</script>
<style scoped>
#mainContainer {
    width: 1200px;
    height: 380px;
    background-color: #FFFFFF;
    word-wrap: break-word;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
}
img {
    width: 300px;
    height: 200px;
    object-fit: cover;
    float: left;
}
#AnimalContainer {
    margin: 3%;
}
#name {
    font-size: 30px;
}
#speciesContainer {
    width: 100%;
    height: auto;
    background-color: #E5E5BA;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
}
#speciesContainer span {
    margin-inline-start: 8px;
    font-size: 15px;
    text-transform: uppercase;
}
#ranking{
     width: 15%;
     float: left;
     text-align: center;
     margin-top: 20px;
     margin-left: 50px;
 }
 #ranking span{
     font-size: 30px;
 }
.row {
    align-items: center;
    flex-wrap: wrap;
    justify-content:space-evenly;
    margin-left: 50px;
    float:left;
}
.row:after {
    display: table;
    clear: both;
}
.column {
    float:left;
}
</style>