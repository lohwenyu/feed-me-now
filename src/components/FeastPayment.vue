<template>
    <div id="payment">
        <br>
        <form>
            Payment Amount: <p>20.00 SGD</p> Feast for {{temp[1].name}}<br><br>
            <label for="ccn">Credit Card/Debit Card Number: </label>
            <input id="ccn" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="XXXX XXXX XXXX XXXX"><br>
            <br>
            <label for="name">Name on card: </label>
            <input id="name" type="text">
            <br><br>
            <label for="expriy">Expiry Date: </label>
            <input id="expiry" type="date">
            <br><br>
            <label for="ccv">CCV: </label>
            <input id="ccv" type="tel" maxlength="3" placeholder="X X X"><br><br>   
            <button @click="back()">Back</button>
            <button @click="proceed()">Continue</button>
        </form>
    </div>
</template>
<script>
import database from '../firebase.js'
import firebase from 'firebase'

export default {
    name: "FeastPayment",
    data() {
        return {
            selectedanimal: []
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
            var animalId = this.temp[0]
            database.collection('transactions').add({
                amount: 20,
                animalId: this.temp[0],
                foodType: 'feast',
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
                for (const x in this.contributions) {
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
                             ['contributions.'+animalId]: firebase.firestore.FieldValue.arrayUnion(mealCount)
                        })    
                        database.collection('users').doc('QNqhGFZ0EVtmArEaV3vt').update({
                             ['contributions.'+animalId]: firebase.firestore.FieldValue.arrayUnion(feastCount+1)
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
                            'contributors.QNqhGFZ0EVtmArEaV3vt': firebase.firestore.FieldValue.arrayUnion(mealCount)
                        })
                        database.collection('animals').doc(animalId).update({
                            'contributors.QNqhGFZ0EVtmArEaV3vt': firebase.firestore.FieldValue.arrayUnion(feastCount+1)
                        })
                        database.collection('animals').doc(animalId).update({
                            'contributors.QNqhGFZ0EVtmArEaV3vt': firebase.firestore.FieldValue.arrayUnion(ranking)
                        })

                       
                    }
                }
            })

            this.$router.push({
                path: '/sfeast',
                name: 'sfeast',
                params: {selectedanimal: this.temp},
                props: true 
                })
        }
    },
}
</script>
<style scoped>
#payment {
    text-align: center;
    display: block;
}
form {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
}
p {
    text-align: center;
    font-weight: bold;
    font-size: 35px;
}
button {
    border-radius:12px;
    background-color: rgb(168, 212, 208);
    margin-inline: 50px;
    width: 150px;
    height: 50px;
    font-size: 17px;
}
</style>