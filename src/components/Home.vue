<template>
    <div class="homepage">
        <div id="title">
            Feed an Animal Today 
            <img id="logo" src='../assets/logo.png'/>
        </div>
        <div id="container">
            <ul>
                <li id="animal" v-for="animal in animals" :key="animal.id">
                        <img id="animalPic" v-bind:src="animal.picture">
                        <br>
                        {{ animal.name }}
                        <br>
                        {{ animal.description }}
                        <br>
                        <br>
                        <br>
                        <button id="FeedMeButton"> Feed Me </button>
                </li>
            </ul>
            
        </div>
    </div>
</template>


<script>
import database from '../firebase.js'

export default {
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

#container {
    position: relative;
    width : 1900px ;
    height: 800px;
    margin: 240px auto;
    background-color: #CCD2A8;
    bottom : 200px ; 
    
}

#animal {
        position : relative; 
        width: calc(600px - 10px);
        height: calc(800px - 100px);
        background-color: #FFF;
        float: left; 
        margin : 15px ; 
        
}

#animalPic {
    width: calc(600px - 10px);
    height: calc(800px - 300px);
    

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

#title {
    height : 100px ;
    width : 100% ; 
}


</style>