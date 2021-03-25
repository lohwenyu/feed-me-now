<template>
    <div id="mainContainer">
        <img v-bind:src="animal.picture">
        <div id="contentContainer">
            <div id="cardContent">
                <span id="name">{{ animal.name }}</span>
                <div id="speciesContainer">
                    <span>{{ information[0].commonName }}</span>
                </div>
                <span id="feedStatus">{{ animal.name + " " + animal.feedStatus + "!" }}</span>
            </div>
            <div class="row">
                <FeedCounter class="column" v-bind:mealQuantity="array[0]" v-bind:feastQuantity="array[1]"/>
                <FeedAgainButton class="column"/>
            </div>
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
    width: 370px;
    height: 510px;
    background-color: #FFFFFF;
    word-wrap: break-word;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
}
img {
    width: 100%;
    height: 40%;
    object-fit: cover;
}
#contentContainer {
    margin: 5%;
}
#cardContent {
    margin-top: 5%;
    margin-bottom: 5%;
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
#feedStatus {
    font-size: 15px;
}
.row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content:space-evenly;
}
.row:after {
    display: table;
    clear: both;
}
.column {
    float:left
}
</style>