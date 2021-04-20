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
            <FeedCounter v-bind:mealQuantity="array[0]" v-bind:feastQuantity="array[1]" v-bind:page="'contributions'"/>
            <FeedAgainButton id="feedAgainButton" v-bind:animalId="animalId" v-bind:animal="animal"/>
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
    position: relative;
    width: 450px;
    height: 500px;
    background-color: #FFFFFF;
    word-wrap: break-word;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
    box-shadow: 1px 1px rgb(136, 136, 136, 0.5);
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
#feedAgainButton {
    position: absolute;
    right: 20px;
    bottom: 20px;
}
</style>