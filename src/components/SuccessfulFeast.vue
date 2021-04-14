<template>
    <div>
        <NavigationBar/>
        <div id="center">
            <div id="background">
                <img id="meal" src="../assets/feastBackground.jpg"/>  
            </div>
            <div id="foreground">
                <img id="animal" v-bind:src="selectedanimal[1].picture">
            </div>
        </div>
        <p>THANK YOU FOR YOUR DONATION</p>
        <p id="email">A verification email has been sent!</p>
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
            currUser: auth.currentUser.uid,   
        }
    },
    props: ['selectedanimal'],
    methods: {
        homepage: function() {
            this.$router.push('/home').then(() => location.reload())
        }
    },
    created: function() {
            var currUser = this.currUser
            var animalId = this.selectedanimal[0]
            database.collection('users').doc(this.currUser).get().then((querySnapShot) => {
                this.name = querySnapShot.data().contributions
            }).then(() => {
                if (typeof this.name === 'undefined') {
                    database.collection('users').doc(this.currUser).update({
                        contributions: {[animalId]:[0,1,2]}
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
                            ['contributions.'+animalId]: [0,1,2]
                        })
                    }       
                }
            })


            database.collection('animals').doc(animalId).get().then((querySnapShot) => {
                this.contributor = querySnapShot.data().contributors
            }).then(() => {
                if (typeof this.contributor === 'undefined') {
                    database.collection('animals').doc(animalId).update({
                        contributors: {[currUser]:[0,1,2]}
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
                            ['contributors.'+currUser]:[0,1,2]
                        })
                    } 
                }
            }) 
        

            database.collection('transactions').add({
                amount: 20,
                animalId: this.selectedanimal[0],
                foodType: 'feast',
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
                for (const x in this.contributions) {
                    if (x == animalId) {
                        var mealCount = this.contributions[x][0]
                        var feastCount = this.contributions[x][1]
                        var points = this.contributions[x][2]

                        database.collection('users').doc(currUser).update({
                             ['contributions.'+animalId]: [],
                             ['contributions.'+animalId]: [mealCount, feastCount+1, points+2]
                        })                       
                        database.collection('animals').doc(animalId).update({
                            ['contributors.'+ currUser]: [],
                            ['contributors.'+ currUser]: [mealCount, feastCount+1, points+2],                            
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
#email{
    font-size: 20px;
    font-weight: 100;
}
#order {
    font-size: 25x;
    font-weight: 100;
}
button {
    background-color: rgba(142, 218, 250, 0.24);
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
    box-shadow: 1px 1px rgba(64, 168, 213, 0.5);
}

button:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
    cursor: pointer;
}
</style>