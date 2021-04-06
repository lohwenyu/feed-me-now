<template>
    <div>
        <v-card>
            <v-card-title> Payment Amount of S$20 for {{temp[1].name}}'s Feast </v-card-title>
            <v-card-subtitle> Credit Card Information </v-card-subtitle>
            <v-text-field label="Name On Card" prepend-icon="person"></v-text-field>
            <br>
            <v-text-field label="Credit Card Number" prepend-icon="payment" v-model="creditCardNumber"></v-text-field>
            <br>
            <v-text-field label="CVV" prepend-icon="payment" v-model="cvvNumber"></v-text-field>
            <br>
            <v-text-field label="Expiry Date" prepend-icon="today"></v-text-field>
            <br>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#A8D4D0" @click="back()"> 
                    <v-icon> arrow_back </v-icon>
                    Back </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="#A8D4D0" @click="proceed()"> Continue 
                    <v-icon> arrow_forward </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import database from '../firebase.js'
import firebase from 'firebase'

export default {
    name: "FeastPayment",
    data() {
        return {
            selectedanimal: [],
            creditCardHolder: "" , 
            creditCardNumber: "" , 
            cvvNumber: "" , 
            expiryDate: ""
        }
    },
    props: ['temp'],
    methods: {
        back: function() {
            this.$router.push({
                path: '/feedme',
                name: 'feedme',
                params: {selectedanimal: this.temp},
                props: true 
                })
        },
        proceed: function() {
            if(this.creditCardHolder.length == 0){
                window.alert("Please enter a name!")
            } else if(this.creditCardNumber.length != 19){
                window.alert("invalid Credit Card Number!")
            } else if (this.cvvNumber.length != 3){
                window.alert("Invalid CVV!")
            } else if (this.expiryDate.length == 0){
                window.alert("Please enter an Expiry Date!")
            } else {
                var animalId = this.temp[0]
                database.collection('transactions').add({
                    amount: 10,
                    animalId: animalId,
                    foodType: 'meal',
                    time: new Date(),  
                    userId: 'QNqhGFZ0EVtmArEaV3vt'            
                }).then(function(docRef) {
                    database.collection('users').doc('QNqhGFZ0EVtmArEaV3vt').update({
                        transactions: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                });
                })

                database.collection("users").doc('QNqhGFZ0EVtmArEaV3vt').get().then((querySnapShot) => {
                    this.contributions = querySnapShot.data().contributions
                }).then(() => {
                    for (const x in this.yeet) {
                        if (x == animalId) {
                            var mealCount = this.contributions[x][0]
                            var feastCount = this.contributions[x][1]
                            var ranking = this.contributions[x][2]

                            database.collection('users').doc('QNqhGFZ0EVtmArEaV3vt').update({
                                ['contributions.'+animalId]: firebase.firestore.FieldValue.arrayRemove(mealCount)
                            })
                            database.collection('users').doc('QNqhGFZ0EVtmArEaV3vt').update({
                                ['contributions.'+animalId]: firebase.firestore.FieldValue.arrayRemove(feastCount)
                            })   
                            database.collection('users').doc('QNqhGFZ0EVtmArEaV3vt').update({
                                ['contributions.'+animalId]: firebase.firestore.FieldValue.arrayRemove(ranking)
                            })                           
                            database.collection('users').doc('QNqhGFZ0EVtmArEaV3vt').update({
                                ['contributions.'+animalId]: firebase.firestore.FieldValue.arrayUnion(mealCount+1)
                            })    
                            database.collection('users').doc('QNqhGFZ0EVtmArEaV3vt').update({
                                ['contributions.'+animalId]: firebase.firestore.FieldValue.arrayUnion(feastCount)
                            })   
                            database.collection('users').doc('QNqhGFZ0EVtmArEaV3vt').update({
                                ['contributions.'+animalId]: firebase.firestore.FieldValue.arrayUnion(ranking)
                            })        
                            
                            database.collection('animals').doc(animalId).update({
                                'contributors.QNqhGFZ0EVtmArEaV3vt': firebase.firestore.FieldValue.arrayRemove(mealCount)
                            })
                            database.collection('animals').doc(animalId).update({
                                'contributors.QNqhGFZ0EVtmArEaV3vt': firebase.firestore.FieldValue.arrayRemove(feastCount)
                            })
                            database.collection('animals').doc(animalId).update({
                                'contributors.QNqhGFZ0EVtmArEaV3vt': firebase.firestore.FieldValue.arrayRemove(ranking)
                            })
                            database.collection('animals').doc(animalId).update({
                                'contributors.QNqhGFZ0EVtmArEaV3vt': firebase.firestore.FieldValue.arrayUnion(mealCount+1)
                            })
                            database.collection('animals').doc(animalId).update({
                                'contributors.QNqhGFZ0EVtmArEaV3vt': firebase.firestore.FieldValue.arrayUnion(feastCount)
                            })
                            database.collection('animals').doc(animalId).update({
                                'contributors.QNqhGFZ0EVtmArEaV3vt': firebase.firestore.FieldValue.arrayUnion(ranking)
                            })

                        
                        }
                    }
                })
                this.$router.push({
                    path: '/successfulmeal',
                    name: 'successfulmeal',
                    params: {selectedanimal: this.temp},
                    props: true 
                    }) 
                }
        }
    },
}
</script>
