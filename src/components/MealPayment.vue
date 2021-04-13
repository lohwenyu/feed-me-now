<template>
    <div id="mainContainer">
        <div id="innerContainer">
            <div id="paymentDetailsContainer">
                <span>You are buying a<div id="mealContainer">Meal for {{temp[1].name}}</div></span>
                <span>Payment Amount: <b>10.00 SGD</b></span>
            </div>
            
            <form id="cardDetailsContainer">
                <div class="formDiv">
                    <label for="name">Cardholder's Name</label>
                    <input id="name" type="text" v-model.lazy="name">
                </div>
                <div class="formDiv">
                    <label for="ccn">Credit Card/Debit Card Number</label>
                    <input id="ccn" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="XXXX XXXX XXXX XXXX" v-model.lazy="ccn">
                </div>
                <div id="expiryCvvContainer">
                    <div class="formDiv" id="expiryContainer">
                        <label for="expiry">Expiry Date</label>
                        <input id="expiry" type="date" v-model.lazy="expiry">
                    </div>
                    <div class="formDiv" id="cvvContainer">
                        <label for="cvv">CVV</label>
                        <input id="cvv" type="tel" maxlength="3" placeholder="XXX" v-model.lazy="cvv">
                    </div>
                </div>
                <div id="formDivSave">
                    <input id="save" type="checkbox" v-model.lazy="save"><label id="saveText" for="save">I would like to save my card details.</label>
                </div>
            </form>
            <div id="buttonContainer">
                <button @click="back()">Back</button>
                <button @click="proceed()">Continue</button>
            </div>
        </div>
    </div>
</template>

<script>
import database, { auth } from "../firebase.js"

export default {
    name: "MealPayment",
    data() {
        return {
            currUser: auth.currentUser,
            selectedanimal: [],
            name: null,
            ccn: null,
            expiry: null,
            cvv: null,
            save: false, 
            // existing: null,
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
            if (! this.name) {
                window.alert("Please fill in Cardholder's Name!")
            } else if (! this.ccn) {
                window.alert("Please fill in Credit Card Number!")
            } else if (! this.expiry) {
                window.alert("Please fill in Expiry Date!")
            } else if (! this.cvv) {
                window.alert("Please fill in CVV!")
            } else {
                console.log("hi")
                if (this.save) {
                    console.log("here")
                    database.collection("users").doc(this.currUser).update({
                        "creditCardDetails": {
                            "name": this.name,
                            "ccn": this.ccn,
                            "expiry": this.expiry,
                            "cvv": this.cvv
                        }
                    }).then(() => {
                        console.log("hello")
                    })
                } 
                this.$router.push({
                    path: '/successfulmeal',
                    name: 'successfulmeal',
                    params: {selectedanimal: this.temp},
                    props: true 
                }) 
            }
        },
        checkSavedDetails: function() {
            database.collection("users").doc(this.currUser).get().then(doc => {
                if (doc.data().creditCardDetails) {
                    // this.existing = true
                    var card = doc.data().creditCardDetails
                    this.name = card.name
                    this.ccn - card.ccn
                    this.expiry = card.expiry
                    this.cvv = card.cvv
                }
            })
        }
    },
    created() {
        this.checkSavedDetails()
    }
}
</script>

<style scoped>
#mainContainer {
    display: flex;
    justify-content: center;
    padding: 3%;
}
#innerContainer {
    padding: 3%;
    display: flex;
    flex-direction: column;
    width: 50%;
    background-color: white;
    box-shadow: 1px 1px rgb(136, 136, 136, 0.5);
}
#paymentDetailsContainer {
    display: flex;
    font-size: 20px;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin: 20px
}
#mealContainer {
    background-color: #E5E5BA;
    width: fit-content;
    padding-inline: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
}
#cardDetailsContainer {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
}
.formDiv {
    display: flex;
    flex-direction: column;
    padding: 10px;
}
input {
    margin-top: 10px;
    font-size: 15px;
    height: 25px;
    outline-color: #E5E5BA;
}
#expiryCvvContainer {
    display: block;
}
#expiryContainer {
    width: 70%;
    float: left;
}
#cvvContainer {
    width: 30%;
}
#formDivSave {
    display: flex;
    padding: 10px;
    align-items: center;
}
#saveText {
    margin-top: 10px;
    font-size: 15px;
}
#buttonContainer {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
    margin-bottom: 20px;
}
button {
    background-color: rgba(64, 168, 213, 0.24);
    width: 150px;
    height: 50px;
    font-size: 17px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
}
button:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
    cursor: pointer;
}
</style>