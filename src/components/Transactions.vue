<template>
    <div>
        <NavigationBar/>
        <div v-show="transactionList.length!=0">
            <PageHeader v-bind:header="'Transactions'" v-bind:icon="'receipt'" v-bind:description="description" v-bind:subDescription="subDescription"/>
            <div class="row">
                <div class="column" v-for="(transactionId, index) in Object.entries(transactionList)" :key="index">
                    <TransactionCard v-bind:transactionId="transactionId[1]"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from "./PageHeader.vue"
import TransactionCard from './TransactionCard.vue';
import database, { auth } from "../firebase.js";
import NavigationBar from './NavigationBar.vue';

export default {
    name: 'Transactions',
    components: {
        TransactionCard,
        PageHeader,
        NavigationBar
    },
    data() {
        return {
            currUser: auth.currentUser.uid,
            transactionList: [],
            description: "Thank you for your contributions thus far!",
            subDescription: "Check out the Leader Board tab to see how you fare against the other contributors!",
        }
    },
    methods: {
        fetchTransactions: function() {
            database.collection("users").doc(this.currUser).get().then(doc => {
                if (doc.data().transactions !== undefined) {
                    this.transactionList = doc.data().transactions
                }
            })
        }
    },
    created() {
        this.fetchTransactions();
    }
}
</script>
