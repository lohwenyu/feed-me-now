<template>
    <div id=mainboard>
        <p><strong>Top {{this.length}} Contributors</strong></p>
        <ul v-for="object in this.sortedNmaes.sort(this.compare_points).slice(0,3)" v-bind:key="object.ID">
            <div class="column"><span>
            <font-awesome-icon icon="paw" size="sm"/>
                {{object.name}} ({{object.points}})
                </span>
                </div>
        </ul>

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
            sortedNmaes: []
        }
    },
    methods: {
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
        //this.names.sort(this.compare_points)
        if (this.rankedContributors.length < 3) {
            this.length = this.rankedContributors.length
        }
        this.sortedNmaes = this.names
    }
}
</script>

<style scoped>
#mainboard{
    background-color: #F5F8E3;
    width: 30%;
    float: left;
    margin-left: 40px;
    padding: 20px;
    text-align: center;
    border-radius: 25px;
    padding-right: 3.5%;
}
#column{
    text-align: center;
}
p{
    padding-left: 10%;
}
</style>