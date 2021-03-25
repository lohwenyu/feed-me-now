<template>
    <div>
        <h1> Your Contributions</h1>
        <div class="row">
            <ContributionCard v-for="(animal, index) in animalList" :key="index" class="col" v-bind:animal="animal"/>
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
    align-items: center;
    flex-wrap: wrap;
    justify-content:space-between;
    justify-content: space-evenly;
}
.row:after {
    display: table;
    clear: both;
}
.column {
    float:left;
}
</style>