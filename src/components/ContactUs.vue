<template>
    <div>
        <v-app>
        <NavigationBar/>
        <PageHeader v-bind:header="'Contact Us'" v-bind:icon="'address-book'" v-bind:description="description" v-bind:subDescription="subDescription"/>
        <v-container>
            <v-row :justify="center">
                <v-col cols="12">
                    <v-card height="100%" flat>
                        <v-card-title> Leave your feedback here </v-card-title>
                            <v-textarea v-model.trim="feedback" :counter="200" :rules="feedbackRules" label="Feedback" required no-resize outlined>
                            </v-textarea>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="submitFeedBack()" color="#40A8D4"> Submit Feedback 
                                <v-icon right> arrow_right </v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                        <br>
                        <br>
                        <v-divider color="#000"></v-divider>
                        <br>
                        <br>
                        <v-card-title> Transaction Enquiry </v-card-title>
                        <v-text-field  label="Transaction Number" outlined :rules="transactionNumberRules" v-model="transactionId"> Transaction Number </v-text-field>
                        <br>
                        <v-textarea v-model.trim="transactionIssue" :rules="transactionEnquiryRules" label="What went wrong with your transaction?" required no-resize outlined>
                        </v-textarea>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="#40A8D4" @click="submitEnquiry()"> Submit Enquiry  
                                <v-icon right> arrow_right </v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        </v-app>
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
            transactionIssue: "",
            description: "Got a question or enquiry?",
            subDescription: "You can leave a message using the contact form below or email to customerservice@fmn.sg."
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
    .v-application {
        background-color: #e4ebdd;
    }
</style>