<template>
    <div>
        <NavigationBar/>
        <div v-show="transactionList.length!=0">
            <PageHeader v-bind:header="'Transactions'" v-bind:icon="'receipt'" v-bind:description="description" v-bind:subDescription="subDescription"/>
            <div class="row">
                <div class="column" v-for="(transactionId, index) in transactionList" :key="index">
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
            description: "Here are the details of your past transations.",
            subDescription: "If there are any issues, do copy the Transaction ID and let us know via the Contact Us tab.",
        }
    },
    methods: {
        fetchTransactions: function() {
            database.collection("users").doc(this.currUser).get().then(doc => {
                if (doc.data().transactions !== undefined) {
                    var temp = Object.entries(doc.data().transactions)
                    for (var i=temp.length-1; i>=0; i--) {

                        this.transactionList.push(temp[i])

                    }
                    // this.transactionList = doc.data().transactions
                }
            })
        }
    },
    created() {
        this.fetchTransactions();
    }
}
</script>
