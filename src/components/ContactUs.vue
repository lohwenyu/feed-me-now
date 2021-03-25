<template>
    <div>
        <h1>Contact Us</h1>
        <div class="row">
            <div class="column" id="feedback">
                <p class="header">Leave a Feedback</p>
                <!-- add in word count -->
                <p>We welcome any feedback (200 char).</p>
                <textarea rows="10"/>
            </div>
            <div id="breakLine"></div>
            <div class="column" id="transactionEnquiry">
                <p class="header">Transaction Enquiry</p>
                <p>Transaction Number:</p>
                <textarea rows="1"/>
                <p>Tell us what was wrong with your transaction.</p>
                <textarea rows="10"/>
            </div>
        </div>
        <p class="alternative">Or</p>
        <p class="alternative">Simple write in to <a href="customer_service@feedmenow.com">Feed Me Now</a>.</p>
    </div>
</template>
<script>
export default {
    name: "ContactUs",
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
    height: 400px;
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
</style>