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
        <p id="order">Your order is #{{this.orderNumber}}</p>
          <button @click="homepage()">Help more animals</button>

    </div>
</template>

<script>
import NavigationBar from "./NavigationBar.vue";

export default {
    name: "SuccessfulTreat",
    components: {
        NavigationBar
    },
    data() {
        return {
            orderNumber: 0
        }
    },
    props: ['selectedanimal'],
    methods: {
        homepage: function() {
            this.$router.push('/home').then(() => location.reload())
        }
    },
    created: function() {
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