<template>
    <div>
        <h1> Your Contributions</h1>
        <div class="row">
            <div class="column" v-for="(animal, index) in animalList" :key="index">
                <ContributionCard v-bind:animal="animal"/>
            </div>
        </div>
    </div>
</template>
<script>
import ContributionCard from './ContributionCard.vue';
import database from "../firebase.js";

export default {
    name: "Contributions",
    components: {
        ContributionCard
    },
    data() {
        return {
            animalList: []
        }
    },
    methods: {
        fetchItems: function () {
            database.collection('animals').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.animalList.push(doc.data());
                });
            });
        }
    },
    created() {
        this.fetchItems()
    }
}
</script>
<style scoped>
.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
/* kiv alignment */
/* .row>* {
    flex: 0 0 33.3333%;
} */
.row:after {
    display: table;
    clear: both;
}
.column {
    float:left;
}
</style>