<template>
    <div id="mainContainer">
        <div>
            <span id="name">{{ animal.name }}</span>
            <div id="speciesContainer">
                <span>{{ information[0].commonName }}</span>
            </div>
        </div>
        <div id="animalContainer">
            <img v-bind:src="animal.picture">
            <div class="counterContainer">
                <FeedCounter v-bind:mealQuantity="array[0]" v-bind:feastQuantity="array[1]" v-bind:page="'leaderboard'"/>
                <FeedAgainButton v-bind:animalId="animalId" v-bind:animal="animal"/>
            </div>
            <div id="ranking">
                <span><strong>You are the </strong></span><br>
                <span style="font-size:40px"><strong>#{{this.finalRanking}} </strong></span><br>
                <span><strong> contributor </strong></span>
                <p>with {{array[2]}} contribution(s).</p>
            </div>
            <ContributorBoard v-bind:rankedContributors="rankedContributors" v-bind:animalId="animalId"/>
        </div>
    </div>
</template>

<script>
import FeedAgainButton from './FeedAgainButton.vue';
import FeedCounter from "./FeedCounter.vue";
import database, {auth} from "../firebase.js";
import ContributorBoard from "./ContributorBoard";

export default {
    name: "ContributionCard",
    components: {
        FeedCounter,
        FeedAgainButton,
        ContributorBoard
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
            information: [],
            currUser: auth.currentUser.uid,
            finalRanking: 0,
            rankedContributors: []
        }
    },
    methods: {
        fetchAnimal: function() {
            database.collection('animals').doc(this.animalId).get().then(doc => {
                this.animal = doc.data();
            }).then(() => {
                this.fetchInformation()
            });
        },
        fetchInformation: function() {
            database.collection('animalInformation').doc(this.animal.animalInformation).get().then(doc => {
                this.information.push(doc.data());
            })
        },
        sorted: function() {
            database.collection('animals').doc(this.animalId).get().then((querySnapShot) => {
                this.contributors = querySnapShot.data().contributors
            }).then(() => {
                for (const contributorId in this.contributors) {
                    this.rankedContributors.push({"ID": contributorId, "points": this.contributors[contributorId][2]})
                }
                this.rankedContributors.sort(this.compare_points)
                var ranking = this.rankedContributors.findIndex(x => x.ID === this.currUser) + 1
                this.finalRanking = ranking
            })
            this.rankedContributors.sort(this.compare_points)
 
        },
        compare_points: function(a,b) {
            if (a.points<b.points) {
                return 1;
            } else if (a.points>b.points){
                return -1;
            } else {
                return 0;
            }
        },

    },
    created() {
        this.fetchAnimal()
        this.sorted()
    }
}
</script>
<style scoped>
#mainContainer {
    width: 90%;
    flex-wrap: wrap;
    background-color: #FFFFFF;
    word-wrap: break-word;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-right: 3%;
    padding-left: 3%;
    box-shadow: 1px 1px rgb(136, 136, 136, 0.5);
    display: flex;
    flex-direction: column;
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
#animalContainer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
img {
    width: 25%;
    height: 200px;
    object-fit: cover;
}

#ranking{
    width: 20%;
    text-align: center;
}
#ranking span{
    font-size: 30px;
}
#counterContainer {
    display: flex;
    flex-direction: column;
    width: 15%;
    align-items: center;
    justify-content: center;
}
</style>