<template>
    <div>
        <NavigationBar/>
        <div>
            <PageHeader v-bind:header="'Contact Us'" v-bind:icon="'address-book'" v-bind:description="description" v-bind:subDescription="subDescription"/>
            <div class="row">
                <div class="column" id="feedback">
                    <p class="header">Leave a Feedback</p>
                    <p>We welcome any feedback (200 char).</p>
                    <textarea rows="5" v-model.trim="feedback"/>
                    <span>{{ feedback.length }}/200</span>
                    <button class="submitButton" type="submit" v-on:click="submitFeedBack()">Submit</button>
                </div>
                <div id="breakLine"></div>
                <div class="column" id="transactionEnquiry">
                    <p class="header">Transaction Enquiry</p>
                    <p>Transaction Number:</p>
                    <textarea rows="1" v-model="transactionId"/>
                    <p>Tell us what was wrong with your transaction.</p>
                    <textarea rows="10" v-model="transactionIssue"/>
                    <button class="submitButton" type="button" v-on:click="submitEnquiry()">Submit</button>
                </div>
            </div>
            <p class="alternative">Or</p>
            <p class="alternative">Simple write in to <a href="customer_service@feedmenow.com">Feed Me Now</a>.</p>
        </div>
    </div>
</template>
<script>
import PageHeader from "./PageHeader.vue";
import database, { firestore, auth } from "../firebase";
import NavigationBar from './NavigationBar.vue';

export default {
    name: "ContactUs",
    components: {
        PageHeader,
        NavigationBar
    },
    data() {
        return {
            currUser: auth.currentUser.uid,
            feedback: "",
            transactionId: "",
            transactionIssue: "",
            description: "Got a question or enquiry?",
            subDescription: "You can leave a message using the contact form below or email to customer_service@feedmenow.com."
        }
    },
    methods: {
        submitFeedBack: function() {
            if (this.feedback.length > 200) {
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
                    transactionId: this.transactionId, 
                    timestamp: new Date()
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
    width: 1px;
    height: 440px;
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
    box-shadow: 1px 1px rgba(64, 168, 213, 0.5);
}
.submitButton:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
}

#subtitle{
    margin-left: 50px;
    margin-top: 20px;
    font-size: 18px;
}
</style>