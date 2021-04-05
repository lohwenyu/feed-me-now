<template>
    <div id=mainboard>
        <p><strong>Top 3 Contributors</strong></p>
            <div class="column" v-for="(contributor, key, index) in this.animal.contributors" :key="index">
                <span v-if= "contributor[2]==1">
                    {{key}}
                    {{contributor}}
                </span>
            </div>
            <div class="column" v-for="(contributor, key, index) in this.animal.contributors" :key="index">
                <span v-if= "contributor[2]==2">
                    {{key}}
                    {{contributor}}
                </span>
                
            </div>
            <div class="column" v-for="(contributor, key, index) in this.animal.contributors" :key="index">
                <span v-if= "contributor[2]==3">                    
                    {{key}}
                    {{contributor}}
                </span>
            </div>
    </div>
</template>

<script>
import database from "../firebase.js";

export default {
    name: "ContributorBoard",
    props: {
        animalId: {
            type: String
        }
    },
    data() {
        return {
            animal: Object,
            user_info: Object,
        }
    },
    methods: {
        fetchAnimal: function() {
            database.collection('animals').doc(this.animalId).get().then(doc => {
                this.animal = doc.data();
            }).then(() => {
                console.log(this.animal);
                this.fetchInformation()
            });
        },
        fetchInformation: function(){
            database.collection('users').get().then((querySnapShot)=>{
                let item={}
                querySnapShot.forEach(doc=>{
                    item=doc.data()
                    this.user_info.push(item) 
                })  
            }).then( ()=> {
                console.log(this.user_info);
            });
        },   
    },
    created() {
        this.fetchAnimal()
    }
}
</script>

<style scoped>
#mainboard{
    background-color: #F5F8E3;
    width: 30%;
    float: left;
    margin-left: 40px;
    padding: 20px;
    text-align: center;
    border-radius: 25px;
}
</style>