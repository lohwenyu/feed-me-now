<template>
    <div>
        <NavigationBar/>
        <PageHeader v-bind:header="'Contact Us'" v-bond:icon="'address-book'"/>
        <v-card> 
                <v-card-title> Tell us how we can serve you better </v-card-title>
                <v-form class="px-3">
                    <v-textarea counter outlined no-resize rows='4' label="Feedback (Max 200 characters)" v-model="feedback" prepend-icon="edit"></v-textarea>
                </v-form>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed rounded @click="submitFeedBack()" color="#CFF1FF"> 
                        Submit Feedback 
                        <v-icon> east </v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
             </v-card-actions>
        </v-card>
        <br>
        <br>
        <br>
        <v-card>
            <v-card-title> Transaction Enquiry </v-card-title>
                <v-form>
                    <v-text-field outlined label="Transaction Number" v-model="transactionId" prepend-icon="search"></v-text-field>
                    <v-textarea outlined no-resize rows='4' label="Tell us what was wrong with your transaction" v-model="transactionIssue" prepend-icon="edit"></v-textarea>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed rounded @click="submitEnquiry()" color="#CFF1FF" > 
                            Submit Enquiry 
                            <v-icon> east </v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-form>
        </v-card>
    </div>
</template>
<script>
import PageHeader from "./PageHeader.vue";
import database, { firestore } from "../firebase";
import NavigationBar from './NavigationBar.vue';

export default {
    name: "ContactUs",
    components: {
        PageHeader,
        NavigationBar
    },
    data() {
        return {
            currUser: "QNqhGFZ0EVtmArEaV3vt", //replace with firebase getter
            feedback: "",
            transactionId: "",
            transactionIssue: "" 
        }
    },
    methods: {
        submitFeedBack: function() {
            if(this.feedback.length == 0){
                window.alert("Feedback cannot be empty!")
            }
            else if (this.feedback.length > 200) {
                window.alert("Feedback has to be less than 200 characters long. Do consider contacting us through email for detailed feedback. Thank you!")
            } else {
                var feedbackRef = database.collection("feedback").doc();
                feedbackRef.set({
                    entry: this.feedback,
                    userId: this.currUser
                }).then(() => {
                    window.alert("Feedback succesfully submitted. Thank you for your feedback!");
                    location.reload();
                })
                database.collection("users").doc(this.currUser).update({
                    feedback: firestore.FieldValue.arrayUnion(feedbackRef.id)
                })
            }
        },
        submitEnquiry: function() {
            if (this.transactionId.length > 0 && this.transactionIssue.length > 0) {
                var enquiryRef = database.collection("transactionEnquiry").doc();
                enquiryRef.set({
                    entry: this.transactionIssue,
                    userId: this.currUser,
                    transactionId: this.transactionId
                }).then(() => {
                    window.alert("Transaction enquiry succesfully submitted. Please give us up to 2 working days to contact you. Thank you for your patience!");
                    location.reload();
                })
                database.collection("users").doc(this.currUser).update({
                    transactionEnquiry: firestore.FieldValue.arrayUnion(enquiryRef.id)
                })
            } else {
                window.alert("Do ensure that both the transaction number and transaction issue fields have been filled up. Thank you!")
            }
        }
    }
}
</script>
<style scoped>
.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 30px;
}
.row:after {
    display: table;
    clear: both;
}
.column {
    float:left;
}
#feedback {
    width: 49%;
    padding-left: 40px;
    padding-right: 40px;
}
#breakLine {
    width: 440pxpx;
    height: 1px;
    background-color: #000000;
}
#transactionEnquiry {
    width: 49%;
    padding-left: 40px;
    padding-right: 40px;
}
.header {
    font-size: 25px;
}
textarea {
    width: 100%;
    resize: none;
    font-size: 15px;
}
.alternative {
    text-align: center;
    font-size: 20px;
}
.submitButton {
    background-color: rgba(64, 168, 213, 0.24);
    width: 200px;
    height: 30px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    border: none;
    outline: none;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
}
.submitButton:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
}
</style>