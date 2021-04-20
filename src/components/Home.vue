<template>
    <div>
        <NavigationBar/>
        <div>
            <PageHeader v-bind:header="'Feed An Animal Today!'" v-bind:icon="'home'" v-bind:description="description" v-bind:subDescription="subDescription"/>
            <div id="container">
                <div v-for="(animal, index) in animals" :key="index" id="animal">
                    <img id="animalPic" v-bind:src="animal.details.picture">
                    <div id="animalDetails">
                        <span style="font-size:30px">{{ animal.details.name }}</span>
                        <div id="speciesContainer">
                            <span>{{animal.common}}</span>
                        </div>
                        <span id="description">{{ animal.details.description }}</span>
                        <FeedMeButton id="feedMeButton" v-bind:animalId="animal.id" v-bind:animal="animal.details"/>
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
import FeedMeButton from './FeedMeButton.vue';

export default {
    name: "Home",
    components : {
        NavigationBar,
        PageHeader,
        FeedMeButton
    } , 
    data() {
        return {
            animals : [],
            selectedanimal: [],
            information: [],
            description: "Join us to fill the belly of an animal of your choice today. All money received will be used to provided the animals with a more nourishing meal.",
            subDescription: "Check out the Leader Board tab for more information on how to win a pair of zoo tickets with exclusive live feeding session with the animals!",
        }
    } ,
    methods : {
        fetchDetails : function(){
            database.collection("animals").get().then((querySnapShot) => {
                let item = {}
                querySnapShot.forEach(doc => {
                    item = doc.data()
                    item.show = false 
                    this.animals.push({
                        "id":doc.id,
                        "details":item,
                        "common":""})
                })
            }).then(() => {
                for (const x in this.animals) {
                    database.collection('animalInformation').doc(this.animals[x].details.animalInformation).get().then((querySnapShot) => {
                        this.name = querySnapShot.data().commonName
                    }).then(() => {
                        this.animals[x].common = this.name
                    })
                }
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
    position: relative; 
    width: 450px;
    height: 580px;
    background-color: #FFF;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;  
    margin-right: 30px;
    box-shadow: 1px 1px rgb(136, 136, 136, 0.5);
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

#feedMeButton {
    position: absolute;
    right: 20px;
    bottom: 20px;
}

#container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

</style>