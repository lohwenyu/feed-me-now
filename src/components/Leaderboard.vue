<template>
    <div>
        <PageHeader v-bind:header="'Leaderboard'" v-bind:icon="'trophy'"/>
        <p>Top 3 contributors of every animal per month will receive a pair 
            of zoo tickets inclusive of a live feeding session!</p>
        <div class="row">
            <div class="column" v-for="([animalId, array], index) in Object.entries(user_contri)" :key="index">
                <LeaderBoardCard v-bind:animalId="animalId" v-bind:array="array"/>
            </div>
        </div>
    </div>
</template>
<script>
import PageHeader from "./PageHeader.vue";
import database from '../firebase.js'
import LeaderBoardCard from './LeaderBoardCard.vue';

export default {
    name: "Leaderboard",
    components: {
        PageHeader,
        LeaderBoardCard,
    },
    data() {
       return{
            user_contri: Object,
            doc_id: "QNqhGFZ0EVtmArEaV3vt",
            animal_info: []
        }
    },
    methods:{
        fetchContri:function(){
            database.collection("users").doc(this.doc_id).get().then((querySnapShot)=>{
                this.user_contri = querySnapShot.data().contributions
            }).then(() =>{
                console.log(this.user_contri)
            })
        },
    },
    created(){
        this.fetchContri();
    }
}
</script>
<style scoped>
p{
    margin-left: 50px;
}
</style>