<template>
    <div>
        <form>
            Payment Amount: $10.00 for {{temp[1].name}}<br>
            <label for="ccn">Credit Card/Debit Card Number: </label>
            <input id="ccn" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="XXXX XXXX XXXX XXXX">
            <br>
            <label for="name">Name on card: </label>
            <input id="name" type="text">
            <br>
            <label for="expriy">Expiry Date: </label>
            <input id="expiry" type="date">
            <br>
            <label for="ccv">CCV: </label>
            <input id="ccv" type="tel" maxlength="3" placeholder="X X X">
            <button @click="back()">Back</button>
            <button @click="proceed()">Continue</button>
        </form>
    </div>
</template>
<script>
export default {
    name: "PaymentTreat",
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
                path: '/succesfultreat',
                name: 'successfultreat',
                params: {selectedanimal: this.temp},
                props: true 
                })
        }
    },
}
</script>
<style scoped>

</style>