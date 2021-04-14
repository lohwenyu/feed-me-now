<template>
    <v-app>
        <div>
            <NavigationBar/>
            <div id="mainContainer">
                <PageHeader v-bind:header="'Your Contributions'" v-bind:icon="'heart'" v-bind:description="description" v-bind:subDescription="subDescription"/>
                <div class="row">
                    <div class="column" v-for="([animalId, array], index) in Object.entries(contributionList)" :key="index">
                        <ContributionCard v-bind:animalId="animalId" v-bind:array="array"/>
                    </div>
                </div>
            </div>
        </div>
    </v-app>
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
            subDescription: "Check out the Leader Board tab to see how you fare against the other contributors!"
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
    },
    created() {
        this.fetchContributions();
    }
}
</script>
<style scoped>
.v-application {
    background-color: #e4ebdd;
}

#mainContainer {
    align-items: center;
}
.row {
    display: flex;
    flex-wrap: wrap;
}
.row>* {
    flex: 0 0 33.3333%;
    min-width: 410px;
    max-width: none;
    max-height: 550px;
}
.row:after {
    display: table;
    clear: both;
}
.column {
    float:left;
}

p{
    margin-left: 50px;
    margin-top: 20px;
}
</style>