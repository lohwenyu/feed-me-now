<template>
    <div class="homepage">
        <div id="title">
            Feed an Animal Today 
            <img id="logo" src='../assets/logo.png'/>
        </div>
        <div id="container">
            <ul>
                <li v-for="(animal, index) in animals" :key="index" id="animal">
                        <img id="animalPic" v-bind:src="animal[1].picture">
                        <br>
                        {{ animal[1].name }}
                        <br>
                        {{ animal[1].description }}
                        <br>
                        <br>
                        <br>
                        <!-- <button id="FeedMeButton"  > Feed Me </button> -->
                        <button v-bind:id=index @click="route($event)" > Feed Me </button>
                </li>
            </ul>
        </div>
    </div>
    
</template>


<script>
import database from '../firebase.js'

export default {
    components : {
    } , 
    data() {
        return {
            animals : [],
            selectedanimal: []
        }
    } ,
    methods : {
        fetchDetails : function(){
            database.collection("animals").get().then((querySnapShot) => {
                let item = {}
                querySnapShot.forEach(doc => {
                    item = doc.data()
                    item.show = false 
                    this.animals.push([doc.id,item])

                })
            })
        },
        route: function(event) {
           let id = event.target.getAttribute('id');
            this.$router.push({
                path: '/feedme',
                name: 'feedme',
                params: {selectedanimal: this.animals[id]},
                props: true 
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
button {
    border-radius:12px;
    background-color: rgb(168, 212, 208);
    padding-inline: 10px;
    margin-inline: 12px;
    width : 100px ;
    height: 60px ;
    float: right ; 
    bottom : 300px ;
}
header{
  width : 100% ;
}

#container {
    position: relative;
    width : 1900px ;
    height: 800px;
    margin: 240px auto;

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
    object-fit: cover
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