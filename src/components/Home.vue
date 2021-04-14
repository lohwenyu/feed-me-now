<template>
    <div class="homepage">
        <NavigationBar/>
        <div class="homepage">
            <PageHeader v-bind:header="'Feed An Animal Today!'" v-bind:icon="'heart'" v-bind:description="description" v-bind:subDescription="subDescription"/>
            <div id="container">
                <div v-for="(animal, index) in animals" :key="index" id="animal">
                    <img id="animalPic" v-bind:src="animal[1].picture">
                    <div id="animalDetails">
                        <span style="font-size:30px">{{ animal[1].name }}</span>
                        <div id="speciesContainer">
                            <span>{{ information[index].commonName }}</span>
                        </div>
                        <span id="description">{{ animal[1].description }}</span>
                        <button v-bind:id=index @click="route($event)">Feed Me!</button>
                    </div>
                </div>
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
            information: [],
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

                    database.collection('animalInformation').doc(item.animalInformation).get().then(animalDoc => {
                        this.information.push(animalDoc.data());
                        console.log(animalDoc.data())
                    })
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
    flex-direction: column;
}

#animalPic {
    width: 100%;
    height: 300px;
    object-fit: cover
}

#animalDetails{
    padding: 20px;
    display: flex;
    flex-direction: column;
}

#speciesContainer {
    width: 100%;
    height: auto;
    background-color: #E5E5BA;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
}
#speciesContainer span {
    margin-inline-start: 8px;
    font-size: 15px;
    text-transform: uppercase;
}

#description{
    margin-top: 5px;
}

button {
    background-color: rgba(142, 218, 250, 0.24);
    width: 100px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    border: none;
    outline: none;
    position: absolute;
    right: 20px;
    bottom: 20px;
    box-shadow: 1px 1px rgba(64, 168, 213, 0.5);
}

button:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
    cursor: pointer;
}
</style>
