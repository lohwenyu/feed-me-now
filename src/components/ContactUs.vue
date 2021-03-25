<template>
    <div>
        <PageHeader v-bind:header="'Contact Us'" v-bind:icon="'address-book'"/>
        <div class="row">
            <div class="column" id="feedback">
                <p class="header">Leave a Feedback</p>
                <!-- add in word count -->
                <p>We welcome any feedback (200 char).</p>
                <textarea rows="10"/>
                <button class="submitButton" type="button">Submit</button>
            </div>
            <div id="breakLine"></div>
            <div class="column" id="transactionEnquiry">
                <p class="header">Transaction Enquiry</p>
                <p>Transaction Number:</p>
                <textarea rows="1"/>
                <p>Tell us what was wrong with your transaction.</p>
                <textarea rows="10"/>
                <button class="submitButton" type="button">Submit</button>
            </div>
        </div>
        <p class="alternative">Or</p>
        <p class="alternative">Simple write in to <a href="customer_service@feedmenow.com">Feed Me Now</a>.</p>
    </div>
</template>
<script>
import PageHeader from "./PageHeader.vue";

export default {
    name: "ContactUs",
    components: {
        PageHeader
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 30px;
}
.row:after {
    display: table;
    clear: both;
}
.column {
    float:left;
}
#feedback {
    width: 49%;
    padding-left: 40px;
    padding-right: 40px;
}
#breakLine {
    width: 1px;
    height: 440px;
    background-color: #000000;
}
#transactionEnquiry {
    width: 49%;
    padding-left: 40px;
    padding-right: 40px;
}
.header {
    font-size: 25px;
}
textarea {
    width: 100%;
    resize: none;
    font-size: 15px;
}
.alternative {
    text-align: center;
    font-size: 20px;
}
.submitButton {
    background-color: rgba(64, 168, 213, 0.24);
    width: 200px;
    height: 30px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    border: none;
    outline: none;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
}
.submitButton:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
}
</style>