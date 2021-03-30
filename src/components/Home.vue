<template>
    <div class="homepage">
        <div id="title">
            <h1>Feed an Animal Today</h1>
            <img id="logo" src='../assets/logo.png'/>
        </div>
        <div id="container">
            <ul>
                <li id="animal" v-for="animal in animals" :key="animal.id">
                        <img id="animalPic" v-bind:src="animal.picture">
                        <div id="info">
                            <span id="name">{{ animal.name }}</span>
                            <br><br>
                            <span>{{ animal.description }}</span>
                            <br><br><br>
                            <button type="button">FEED ME</button>
                        </div>
                </li>
            </ul>
            
        </div>
    </div>
</template>


<script>
import database from '../firebase.js'

export default {
    name: "Home",
    data() {
        return {
            animals : []
        }
    } ,
    methods : {
        fetchDetails : function(){
            database.collection("animals").get().then((querySnapShot) => {
                let item = {}
                querySnapShot.forEach(doc => {
                    item = doc.data()
                    item.show = false 
                    this.animals.push(item)
                })
            })
        }
    } , 
    created() {
        this.fetchDetails()
        }
   
    
}
</script>

<style scoped>
* {
  margin : 0 ; 
  padding : 0 ; 
  box-sizing: border-box ;
  height: 100%;
}

header{
  width : 100% ;
}

h1{
    float:left;
}

#container {
    position: relative;
    width : 100% ;
    height: auto;
    margin: 240px auto;
    bottom : 200px ; 
}

#animal {
        position : relative; 
        width: 400px;
        height: 600px;
        background-color: #FFF;
        float: left; 
        margin : 15px ; 
}

#animalPic {
    width: 400px;
    height: 300px;
}

#FeedMeButton {
    width : 100px ;
    height: 60px ;
    float: right ; 
    bottom : 300px ;
}

#logo {
    float: right ;
    top : 0px ; 
}

#info{
    padding: 10px;
}

#title {
    height : 100px ;
    width : 100% ; 
}

#name {
    font-size: 30px;
}
button {
    background-color: rgba(64, 168, 213, 0.24);
    width: 140px;
    height: 70px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    border: none;
    outline: none;
}
button:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
}
</style>