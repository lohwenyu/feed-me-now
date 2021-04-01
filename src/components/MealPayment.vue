<template>
    <div>
        <NavigationBar/>
        <div id="payment">
            <br>
            <form>
                Payment Amount: <p>10.00 SGD</p> feast for {{temp[1].name}}<br><br>
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
    </div>
</template>
<script>
import NavigationBar from "./NavigationBar.vue";

export default {
    name: "MealPayment",
    components: {
        NavigationBar,
    },
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
            this.$router.push({
                path: '/successfulmeal',
                name: 'successfulmeal',
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