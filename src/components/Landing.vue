<template>
    <div id="mainContainer">
        <div class="row">
            <div class="column">
                <div>
                    <span id="titleText">Help Them Today</span>
                    <p id="subtitleText">The Singapore Zoo is losing funds due to the pandemic and many animals are in need of your help. 
                        Make a change now by clicking on the buttons below!</p>
                    <div id="buttonContainer">
                        <button v-on:click="contribute()" type="button">Contribute Now</button>
                        <button v-on:click="dashboard()" type="button">View Dashboard</button>
                    </div>
                </div>
            </div>
            <div class="column"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Landing",
    methods: {
        contribute: function() {
            this.$router.push({ path: '/login' }).then(() => location.reload())
        },
        dashboard: function() {
            this.$router.push({ path: '/dashboard' }).then(() => location.reload())
        }
    }
}
</script>
<style scoped>
#mainContainer {
    background-image: url("https://www.wallpaperup.com/uploads/wallpapers/2014/03/08/291262/d8902fad8ee915a9b4fe13b23902fc18-700.jpg");
    background-size: cover;
    color: white;
}
.row {
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
}
.row:after {
    display: table;
    clear: both;
}
.column {
    width:40%;
    float:left;
    display: flex;
    flex-wrap: wrap;
    padding: 5%;
    margin-top: 80px

}
#titleText {
    font-size: 50px;
    font-weight: bold;
}
#subtitleText {
    font-size: 18px;
}
#buttonContainer {
    display: flex;
    flex-direction: column;
}
button {
    background: #055684;
    border: none;
    outline: none;
    font-size: 25px;
    padding: 0px;
    color: white;
    width: 420px;
    height: 70px;
    border-radius: 100px;
    font-weight: bold;
    margin-bottom: 20px;
    box-shadow: 2px 2px rgb(255, 255, 255, 0.5);
}
button:hover {
    color: rgb(5, 86, 132);
    background: white;
    transition: ease-in-out 200ms;
    cursor: pointer;
}
</style>