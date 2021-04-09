<template>
    <div>
        <NavigationBar/>
        <div id="center">
            <div id="background">
                <img id="meal" src="../assets/mealBackground.jpg"/>  
            </div>
            <div id="foreground">
                <img id="animal" v-bind:src="selectedanimal[1].picture">
            </div>
        </div>
        <p>THANK YOU FOR YOUR DONATION</p>
        <p id="order">Your order is #{{this.orderNumber}}</p>
          <button @click="homepage()">Help more animals</button>

    </div>
</template>

<script>
import NavigationBar from "./NavigationBar.vue";
import database, {auth} from '../firebase.js'
import firebase from 'firebase'

export default {
    name: "SuccessfulTreat",
    components: {
        NavigationBar
    },
    data() {
        return {
            orderNumber: 0,
            number: [],
            currUser: auth.currentUser.uid,   
        }
    },
    props: ['selectedanimal'],
    methods: {
        homepage: function() {
            this.$router.push('/home').then(() => location.reload())
        },
    },
    created: function() {
        var animalId = this.selectedanimal[0]
        var currUser = this.currUser
        database.collection('users').doc(this.currUser).get().then((querySnapShot) => {
            this.name = querySnapShot.data().contributions
            }).then(() => {
                if (typeof this.name === 'undefined') {
                    database.collection('users').doc(this.currUser).set({
                        contributions: {animalId:[1,0,1]}
                    })
                } else {
                    for (var y in this.name) {
                        if (y==animalId) {
                            var repeated = true
                            break
                        } else {
                            continue;
                        }
                    }
                    if (typeof repeated === 'undefined') {
                        database.collection('users').doc(this.currUser).update({
                            ['contributions.'+animalId]: [1,0,1]
                        })
                    }       
                }
            })


            database.collection('animals').doc(animalId).get().then((querySnapShot) => {
                this.contributor = querySnapShot.data().contributors
            }).then(() => {
                if (typeof this.contributor === 'undefined') {
                    database.collection('animals').doc(animalId).set({
                        contributors: {currUser:[1,0,1]}
                    })
                } else {
                    for (var y in this.contributor) {
                        if (y==currUser) {
                            var repeatedUser = true
                            break
                        } else {
                            continue
                        }
                    }
                    if (typeof repeatedUser === 'undefined') {
                        database.collection('animals').doc(animalId).update({
                            ['contributors.'+currUser]:[1,0,1]
                        })
                    } 
                }
            }) 
        
            database.collection('transactions').add({
                amount: 10,
                animalId: animalId,
                foodType: 'meal',
                time: new Date(),  
                userId: currUser            
            }).then(function(docRef) {
                database.collection('users').doc(currUser).update({
                    transactions: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            });
            })

            database.collection("users").doc(currUser).get().then((querySnapShot) => {
                this.contributions = querySnapShot.data().contributions
            }).then(() => {
                console.log(this.contributions)
                for (const x in this.contributions) {
                    if (x == animalId) {
                        var mealCount = this.contributions[x][0]
                        var feastCount = this.contributions[x][1]
                        var points = this.contributions[x][2]

                        database.collection('users').doc(currUser).update({
                             ['contributions.'+animalId]: [],
                             ['contributions.'+animalId]: [mealCount+1, feastCount, points+1]
                        })                       
                        database.collection('animals').doc(animalId).update({
                            ['contributors.'+ currUser]: [],
                            ['contributors.'+ currUser]: [mealCount+1, feastCount, points+1],                            
                        })             
                    }
                }
            })


        this.orderNumber = Math.round(Math.random() * 100000000)
    }

}

</script>
<style scoped>
#center {
    background-color: #E9DADA;
    display: grid;
    position: relative; 
    grid-template-columns: repeat(12, 1fr);
    height: 30%
}
#animal {
    width: 400%;
    height: auto;
    object-fit: cover;
    border-radius: 150px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    padding-top: 35px;
    padding-bottom: 35px;
}
#foreground {
    z-index: 1;
    grid-row:1;
    grid-column: 5;
}
#background {
    grid-column: 1 / -1;
    grid-row:1;
        height:auto;
    width:auto
}
#meal {
    height:auto;
    width:100%
}
p {
    font-weight: bold;
    font-size: 30px;
    text-align: center;
}
#order {
    font-size: 25x;
    font-weight: 100;
}
button {
    border-radius:12px;
    background-color: rgb(168, 212, 208);
    padding-inline: 10px;
    margin-inline: 12px;
    width : 300px ;
    height: 60px ;
    bottom : 300px ;
    font-size: 20px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: block;
}
</style>