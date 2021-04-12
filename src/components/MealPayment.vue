<template>
    <div>
        <v-card>
            <v-card-title> Payment Amount of S$10 for {{temp[1].name}}'s Meal </v-card-title>
            <v-card-subtitle> Credit Card Information </v-card-subtitle>
            <v-text-field label="Name On Card" prepend-icon="person" v-model="creditCardHolder"></v-text-field>
            <br>
            <v-text-field label="Credit Card Number" prepend-icon="payment" v-model="creditCardNumber"></v-text-field>
            <br>
            <v-text-field label="CVV" prepend-icon="payment" v-model="cvvNumber"></v-text-field>
            <br>
            <v-text-field label="Expiry Date" prepend-icon="today" v-model="expiryDate"></v-text-field>
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

export default {
    name: "MealPayment",
    data() {
        return {
            selectedanimal: [],
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
                window.alert("Please Enter A Name!")
            } else if (this.creditCardNumber.length != 16){
                window.alert("invalid Credit Card Number!")
            } else if (this.cvvNumber.length != 3){
                window.alert("Invalid CVV!")
            } else if (this.expiryDate.length == 0){
                window.alert("Please Enter An Expiry Date!")
            } else {
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
