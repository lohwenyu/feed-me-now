<template>
    <div>
        <NavigationBar/>
        <div v-show="contributionList.length!=0">
            <div id="topContainer">
                <PageHeader v-bind:header="'Your Contributions'" v-bind:icon="'heart'" v-bind:description="description" v-bind:subDescription="subDescription"/>
                <button id="transactionsButton" type="button" v-on:click="transactions()"><font-awesome-icon id="icon" icon="receipt" size="sm"/>View Past Transactions</button>
            </div>
            <div class="row">
                <div class="column" v-for="([animalId, array], index) in Object.entries(contributionList)" :key="index">
                    <ContributionCard v-bind:animalId="animalId" v-bind:array="array"/>
                </div>
            </div>
            <div id="counterDetails">
                <div class="legendContainer"><img class="icon" src="../assets/meal.jpg"/>represents number of meals</div>
                <div class="legendContainer"><img class="icon" src="../assets/feast.jpg"/>represents number of feasts</div> 
            </div>
        </div>
        <div id="noContributions" v-show="contributionList.length==0">
            <PageHeader v-bind:header="'Your Contributions'" v-bind:icon="'heart'"/>
            <div id="nullDescriptionContainer">
                <span id="nullDescription">{{ nullDescription }}</span>
                <span id="nullSubDescription">{{ nullSubDescription }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import PageHeader from "./PageHeader.vue"
import ContributionCard from './ContributionCard.vue';
import database, { auth } from "../firebase.js";
import NavigationBar from './NavigationBar.vue';

export default {
    name: "Contributions",
    components: {
        ContributionCard,
        PageHeader,
        NavigationBar
    },
    data() {
        return {
            currUser: auth.currentUser.uid,
            contributionList: [],
            description: "Thank you for your contributions thus far!",
            subDescription: "Check out the Leader Board tab to see how you fare against the other contributors!",
            nullDescription: "You do not have any contributions yet!",
            nullSubDescription: "Check out the Home tab to start contributing!"
        }
    },
    methods: {
        fetchContributions: function() {
            database.collection('users').doc(this.currUser).get().then(doc => {
                if (doc.data().contributions !== undefined) {
                    this.contributionList = doc.data().contributions
                }
            }).then(() =>{
                console.log(this.contributionList)
            })
        },
        transactions: function() {
            this.$router.push({
                path: '/transactions',
                // name: 'transactions'
            }) 
        }
    },
    created() {
        this.fetchContributions();
    }
}
</script>
<style scoped>
#topContainer {
    display: flex;
    align-items: center;
}
#transactionsButton {
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
    margin-left: auto;
    margin-right: 5%;
    margin-top: 10px;
    box-shadow: 1px 1px rgba(64, 168, 213, 0.5);
    padding:10px
}
#transactionsButton:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
}
#icon {
    margin-right: 5px;
}
.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
</style>

            