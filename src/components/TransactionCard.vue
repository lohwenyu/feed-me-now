<template>
    <div id="mainContainer">
        <img v-bind:src="this.picture">
        <div id="contentContainer">
            <div id="cardContent">
                <span id="feedStatus">Donated {{this.transactionDetails.amount}} SGD to {{this.name}} on {{new Date(this.transactionDetails.time.seconds * 1000).toLocaleDateString("en-US")}}</span>
            </div>
        </div>
        <br>
        <br>
    </div>
</template>

<script>
import database from "../firebase.js";

export default {
    name: 'TransactionCard',
    props: {
        transactionId: {
            type: String
        }
    },
    data() {
        return {
            transactionDetails: null,
            picture: '',
            name: ''
        }
    },
    methods: {
        fetchDetails: function() {
            database.collection('transactions').doc(this.transactionId).get().then(doc => {
                this.transactionDetails = doc.data()
            }).then(() => {
                database.collection("animals").doc(this.transactionDetails.animalId).get().then(doc => {
                    this.name = doc.data().name
                    this.picture = doc.data().picture
                })
            })
        }
    },
    created() {
        this.fetchDetails()
    }
}
</script>

<style scoped>
#mainContainer {
    width: 450px;
    height: 500px;
    background-color: #FFFFFF;
    word-wrap: break-word;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
    box-shadow: 1px 1px rgb(136, 136, 136, 0.5);
}
img {
    width: 100%;
    height: 40%;
    object-fit: cover;
}
#contentContainer {
    margin: 5%;
}
#cardContent {
    margin-top: 5%;
    margin-bottom: 5%;
}
</style>