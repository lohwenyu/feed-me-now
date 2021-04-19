<template>
    <div id="mainContainer">
        <div id="nameContainer">
            <span id="name">{{ name }}</span>
            <span id="commonName">{{ this.commonName }}</span>
        </div>
        <div id="amountContainer">
            <img class="icon" src="../assets/meal.jpg" v-if="transactionDetails.amount==10"/>
            <img class="icon" src="../assets/feast.jpg" v-if="transactionDetails.amount==20"/>
            <span class="amount">${{ transactionDetails.amount }}</span>
        </div>
        <span id="dateContainer">Donated on {{ new Date(this.transactionDetails.time.seconds * 1000).toLocaleDateString("en-US") }}</span>
        <div id="idContainer">
            <span>Transaction ID</span>
            <span id="transactionId">{{ transactionId }}</span>
        </div>
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
            name: '',
            animalInformation: '',
            commonName: ''
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
                    this.animalInformation = doc.data().animalInformation
                    console.log(this.animalInformation)
                }).then(() => {
                    database.collection("animalInformation").doc(this.animalInformation).get().then(doc => {
                        this.commonName = doc.data().commonName
                    })
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
    width: 90%;
    height: fit-content;
    background-color: #FFFFFF;
    word-wrap: break-word;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 1px 1px rgb(136, 136, 136, 0.5);
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
#nameContainer {
    width: 30%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-right: 10px;
}
#name {
    font-weight: bold;
    padding-bottom: 5px;
}
#commonName {
    background-color: #E5E5BA;
    width: fit-content;
    padding-inline: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 5px;
}
#amountContainer {
    display: flex;
    align-items: center;
    width: 5%;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
}
.icon {
    color: #96B08A;
    margin-right: 5px;
    width: 50px;
    height: 50px;
}
.amount {
    font-size: 18px;
    font-weight: bold;
}
#dateContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%; 
    flex-wrap: wrap;
}
#idContainer {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
}
#transactionId {
    background-color: rgba(64, 168, 213, 0.24);
    width: fit-content;
    padding-inline: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 5px;
    font-weight: bold;
}
</style>