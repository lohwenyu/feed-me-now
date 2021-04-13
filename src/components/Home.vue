<template>
    <div>
        <NavigationBar/>
        <div class="homepage">
            <PageHeader v-bind:header="'Feed An Animal Today!'" v-bind:icon="'heart'" v-bind:description="description" v-bind:subDescription="subDescription"/>
            <div id="container">
                <ul>
                    <div v-for="(animal, index) in animals" :key="index" id="animal">
                        <img id="animalPic" v-bind:src="animal[1].picture">
                        <div id="animalDetails">
                            <span style="font-size:30px">{{ animal[1].name }}</span>
                            <br>
                                <span>ADD SPECIES NAME HERE</span>
                            <div id="description">
                                {{ animal[1].description }}
                                <br><br>
                                <button v-bind:id=index @click="route($event)" > Feed Me </button>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import database from '../firebase.js'
import NavigationBar from "./NavigationBar.vue";
import PageHeader from "./PageHeader.vue";

export default {
    name: "Home",
    components : {
        NavigationBar,
        PageHeader
    } , 
    data() {
        return {
            animals : [],
            selectedanimal: [],
            description: "Join us to fill the belly of an animal of your choice today. All money received will be used to provided the animals with a more nourishing meal.",
            subDescription: "Check out the Leader Board tab for more information on how to win a pair of zoo tickets with exclusive live feeding session with the animals!"
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
button {
    background-color: rgba(142, 218, 250, 0.24);
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
    cursor: pointer;
}

#animal {
    position : relative; 
    width: 450px;
    height: 580px;
    background-color: #FFF;
    float: left; 
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 60px;  
    box-shadow: 1px 1px rgb(136, 136, 136, 0.5);
}

#animalPic {
    width: 100%;
    height: 300px;
    object-fit: cover
}

#animalDetails{
    padding: 20px;
}

#description{
    margin-top: 5px;
}

p{
    margin-left: 50px;
    margin-top: 20px;
}
</style>