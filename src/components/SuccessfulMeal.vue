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
          <button @click="homepage()">Help More Animals</button>

    </div>
</template>

<script>
import NavigationBar from "./NavigationBar.vue";
import database, { firestore, auth } from '../firebase.js'

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
            this.$router.push('/home')
        },
    },
    created: function() {
        var animalId = this.selectedanimal[0]
        database.collection('users').doc(this.currUser).get().then((querySnapShot) => {
            this.name = querySnapShot.data().contributions
            }).then(() => {
                if (typeof this.name === 'undefined') {
                    database.collection('users').doc(this.currUser).update({
                        contributions: {[animalId]:[1,0,1]}
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
                database.collection('animals').doc(animalId).update({
                    contributors: {[this.currUser]:[1,0,1]}
                })
            } else {
                for (var y in this.contributor) {
                    if (y==this.currUser) {
                        var repeatedUser = true
                        break
                    } else {
                        continue
                    }
                }
                if (typeof repeatedUser === 'undefined') {
                    database.collection('animals').doc(animalId).update({
                        ['contributors.'+this.currUser]:[1,0,1]
                    })
                } 
            }
        }) 
    
        var transactionDocRef = database.collection('transactions').doc()
        this.orderNumber = transactionDocRef.id
        transactionDocRef.set({
            amount: 10,
            animalId: animalId,
            foodType: 'meal',
            time: new Date(),  
            userId: this.currUser            
        })
        
        database.collection('users').doc(this.currUser).update({
            transactions: firestore.FieldValue.arrayUnion(this.orderNumber)
        })

        database.collection("users").doc(this.currUser).get().then((querySnapShot) => {
            this.contributions = querySnapShot.data().contributions
        }).then(() => {
            console.log(this.contributions)
            for (const x in this.contributions) {
                if (x == animalId) {
                    var mealCount = this.contributions[x][0]
                    var feastCount = this.contributions[x][1]
                    var points = this.contributions[x][2]

                    database.collection('users').doc(this.currUser).update({
                            ['contributions.'+animalId]: [],
                            ['contributions.'+animalId]: [mealCount+1, feastCount, points+1]
                    })                       
                    database.collection('animals').doc(animalId).update({
                        ['contributors.'+ this.currUser]: [],
                        ['contributors.'+ this.currUser]: [mealCount+1, feastCount, points+1],                            
                    })             
                }
            }
        })

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
    background-color: rgba(142, 218, 250, 0.24);
    box-shadow: 1px 1px rgba(64, 168, 213, 0.5);
    width : 300px;
    height: 60px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    border: none;
    outline: none;
    margin-right: auto;
    margin-left: auto;
}

button:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
    cursor: pointer;
}
</style>