<template>
    <div>
        <NavigationBar/>
        <div v-show="Object.keys(userContribution).length!=0">
            <PageHeader v-bind:header="'Leaderboard'" v-bind:icon="'trophy'" v-bind:description="description" v-bind:subDescription="subDescription"/>
            <div class="row">
                <div class="column" v-for="([animalId, array], index) in Object.entries(userContribution)" :key="index">
                    <LeaderBoardCard v-bind:animalId="animalId" v-bind:array="array"/>
                </div>
            </div>
            <div id="counterDetails">
                <div class="legendContainer"><img class="icon" src="../assets/meal.jpg"/>represents number of meals</div>
                <div class="legendContainer"><img class="icon" src="../assets/feast.jpg"/>represents number of feasts</div> 
            </div>
        </div>
        <div id="noContributions" v-show="Object.keys(userContribution).length==0">
            <PageHeader v-bind:header="'Leaderboard'" v-bind:icon="'trophy'"/>
            <div id="nullDescriptionContainer">
                <span id="nullDescription">{{ nullDescription }}</span>
                <span id="nullSubDescription">{{ nullSubDescription }}</span>
                <button id="homeButton" type="button" v-on:click="redirectHome()">Start Feeding!</button>
            </div>
        </div>
    </div>
</template>
<script>
import NavigationBar from './NavigationBar.vue';
import PageHeader from "./PageHeader.vue";
import database, { auth } from "../firebase.js";
import LeaderBoardCard from './LeaderBoardCard.vue';

export default {
    name: "Leaderboard",
    components: {
        PageHeader,
        NavigationBar,
        LeaderBoardCard,
    },
    data() {
       return {
            userContribution: Object,
            currUser: auth.currentUser.uid,
            description: "Top 3 contributors of each animal per month will receive a pair of zoo tickets inclusive of a live feeding session!",
            subDescription: "Every meal bought will be considered as 1 contribution and every feast will be considered as 2 contributions.",
            nullDescription: "You do not have any contributions yet.",
            nullSubDescription: "Start feeding to appear on the Leaderboard!"
        }
    },
    methods:{
        fetchContributions:function() {
            database.collection("users").doc(this.currUser).get().then((querySnapShot)=>{
                this.userContribution = querySnapShot.data().contributions
            }).then(() => {
                console.log(this.userContribution)
            })
        },
        redirectHome() {
            this.$router.push({
                path: '/home',
            }) 
        }
    },
    created() {
        this.fetchContributions();
    }
}
</script>
<style scoped>
.row{
    padding: 10px;
}
img{
    width: 30px;
    margin-right: 5px;
    margin-left: 5px;
}
#counterDetails{
    margin-bottom: 40px;
    margin-top: 20px;
    margin-left: 5%;
}
.legendContainer {
    display: flex;
    align-items: center;
    margin-top: 3px;
    margin-bottom: 3px;
}
#noContributions {
    display: flex;
    flex-direction: column;
}
#nullDescriptionContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
#nullDescription {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
#nullSubDescription {
    font-size: 18px;
}
#homeButton {
    background-color: rgba(64, 168, 213, 0.24);
    width: fit-content;
    height: fit-content;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    border: none;
    outline: none;
    display: flex;
    margin-top: 10px;
    box-shadow: 1px 1px rgba(64, 168, 213, 0.5);
    padding:10px
}
#homeButton:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
}
</style>