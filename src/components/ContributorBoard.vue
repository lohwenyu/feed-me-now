<template>
    <div id=mainboard>
        <span id="topText">Top {{this.length}} Contributors</span>
        <!-- <ul v-for="object in this.sortedNmaes.sort(this.compare_points).slice(0,3)" v-bind:key="object.ID"> -->
        <div class="column" v-for="object in this.names.slice().sort(this.compare_points).slice(0,3)" v-bind:key="object.ID">
            <span><font-awesome-icon id="icon" icon="paw" size="sm"/>{{object.name}} ({{object.points}})</span>
        </div>
        <!-- </ul> -->

    </div>
</template>

<script>
import database from "../firebase.js";

export default {
    name: "ContributorBoard",
    props: {
        rankedContributors: {
            type: Array
        },
        animalId: {
            type: String
        }
    },
    data() {
        return {
            length: 3,
            names: [],
        }
    },
    methods: {
        compare_points: function(a,b) {
            if (a.points<b.points) {
                console.log("if error")
                return 1;
            } else if (a.points>b.points){
                console.log("else  if error")
                return -1;
            } else {
                console.log("else")
                return 0;
            }
        },
    },
    created: function() {
        var animalId = this.animalId
        console.log(this.rankedContributors)
        for (var x in this.rankedContributors) {
            console.log(this.rankedContributors[x].ID)
            database.collection("users").doc(this.rankedContributors[x].ID).get().then((querySnapShot) => {
                this.contributions = querySnapShot.data().contributions
                this.name = querySnapShot.data().name
            }).then(() => {
                console.log(this.contributions)
                console.log(this.name)
                for (const x in this.contributions) {
                    if (x == animalId) {
                        var points = this.contributions[x][2]
                        this.names.push({"name":this.name,"points":points})
                    }
                    
                }
            })
        }
        if (this.rankedContributors.length < 3) {
            this.length = this.rankedContributors.length
        }
    }
}
</script>

<style scoped>
#mainboard{
    display: flex;
    flex-direction: column;
    background-color: #F5F8E3;
    width: 30%;
    text-align: center;
    border-radius: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 10px;
    padding-right: 10px;
}
#topText {
    font-size: 18px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 10px;
}
.column{
    margin-top: 5px;
    margin-bottom: 5px;
}
#icon {
    margin-right: 5px
}
</style>