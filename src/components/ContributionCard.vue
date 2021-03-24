<template>
    <div id="mainContainer">
        <img v-bind:src="animal.picture">
        <div id="contentContainer">
            <div id="cardContent">
                <span id="name">{{ animal.name }}</span>
                <div id="speciesContainer">
                    <span>{{ animal.species }}</span>
                </div>
                <span id="feedStatus">{{ animal.name + " " + animal.feedStatus + "!" }}</span>
            </div>
            <div class="row">
                <FeedCounter class="column"/>
                <FeedAgainButton class="column"/>
            </div>
        </div>
    </div>
</template>
<script>
import FeedAgainButton from './FeedAgainButton.vue';
import FeedCounter from "./FeedCounter.vue";

export default {
    name: "ContributionCard",
    components: {
        FeedCounter,
        FeedAgainButton
    },
    data() {
        return {
            animal: {
                picture: "https://cdn.shopify.com/s/files/1/2123/8425/products/38178921-LRG_2da4e487-aa82-4a2f-ad1e-6e3bf7e069df_530x.jpg?v=1579024968" ,
                name: "Rango",
                feedStatus: "full and hopping around",
                birthday: "",
                species: "Eastern Grey Kangaroo"
            }
        }
    }
}
</script>
<style>
#mainContainer {
    width: 25%;
    height: 450px;
    background-color: #FFFFFF;
    word-wrap: break-word;
}
img {
    width: 100%;
    height: 30%;
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
    margin-top: 5px;
    margin-bottom: 20px;
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
    justify-content:space-between;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
.column {
    float:left
}
</style>