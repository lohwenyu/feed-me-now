<template>
    <div>
        <NavigationBar/>
        <div>
            <div id="center">
                <div id="one">
                    <img id="meal" src="../assets/feast.jpg"/>
                </div>
                <div id="onetext">
                    x 1
                </div>
                <div id="two">
                    <img id="meal" src="../assets/feast.jpg"/>
                </div>
                <div id="twotext">
                    x 1
                </div>
                <div id="three">
                    <img id="meal" src="../assets/feast.jpg"/>
                </div>
                <div id="threetext">
                    x 1
                </div>            
                <img id="animal" v-bind:src="selectedanimal[1].picture">
                <div id="four">
                    <img id="meal" src="../assets/feast.jpg"/>
                </div>
                <div id="fourtext">
                    x 1
                </div>                         
                <div id="five">
                    <img id="meal" src="../assets/feast.jpg"/>
                </div>
                <div id="fivetext">
                    x 1
                </div>
                <div id="six">
                    <img id="meal" src="../assets/feast.jpg"/>
                </div>   
                <div id="sixtext">
                    x 1
                </div>                 
                </div>
            <p>THANK YOU FOR YOUR DONATION</p>
            <p id="order">Your order is #{{this.orderNumber}}</p>
            <button @click="homepage()">Help more animals</button>
            <div id="heartone">
                <img id="heart" src="../assets/heart.png"/>
            </div>          
            <div id="hearttwo">
                <img id="heart" src="../assets/heart.png"/>
            </div>
            <div id="heartthree">
                <img id="heart" src="../assets/heart.png"/>
            </div>
            <div id="heartfour">
                <img id="heart" src="../assets/heart.png"/>
            </div>

        </div>
    </div>
</template>
<script>
import NavigationBar from "./NavigationBar.vue";

export default {
    name: "SuccessfulTreat",
    components: {
        NavigationBar,
    },
    data() {
        return {
            orderNumber: 0
        }
    },
    props: ['selectedanimal'],
    methods: {
        homepage: function() {
            this.$router.push('/').then(() => location.reload())
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    font-size: 30px;
}
#animal {
    width: calc(600px - 10px);
    height: calc(800px - 300px);
    object-fit: cover;
    border-radius: 150px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    padding-top: 35px;
    padding-bottom: 35px;
}
#meal {
    height: 50%;
    width: 50%
}
#heart {
    width: 40%;
}
#heartone {
    position: absolute; 
    left: 350px;
    top: 280px;
}
#hearttwo {
    position: absolute; 
    left: 150px;
    top: 510px; 
}
#heartthree {
    position: absolute; 
    left: 1150px;
    top: 124px;
}
#heartfour {
    position: absolute; 
    left: 1500px;
    top: 280px;
}
#one {
    position: absolute; 
    left: 213px;
    top: 124px;
}
#two {
    position: absolute;
    left: 26px;
    top: 332px;
}
#three {
    position: absolute;
    left: 375px;
    top: 435px;
}
#four {
    position: absolute;
    left: 1334px;
    top: 177px;
}
#five {
    position: absolute;
    left: 1160px;
    top: 363px;
}
#six {
    position: absolute;
    left: 1479px;
    top: 459px;
}
#onetext {
    position: absolute;
    left: 320px;
    top: 164px;
}
#twotext {
    position: absolute;
    left: 133px;
    top: 372px;
}
#threetext {
    position: absolute;
    left: 482px;
    top: 475px;
}
#fourtext {
    position: absolute;
    left: 1441px;
    top: 217px;
}
#fivetext {
    position: absolute;
    left: 1267px;
    top: 403px;
}
#sixtext {
    position: absolute;
    left: 1586px;
    top: 499px;
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