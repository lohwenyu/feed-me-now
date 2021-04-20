<template>
    <button v-on:click="feedMe()" type="button">Feed Me!</button>
</template>
<script>
export default {
    name: "FeedMeButton",
    props: {
        animalId: {
            type: String
        },
        animal: {
            type: Object
        }
    },
    methods: {
        feedMe: function() {
            console.log(this.animal)
            this.$router.push({
                path: '/feedme',
                name: 'feedme',
                params: {selectedanimal: [this.animalId, this.animal]},
                props: true 
            })  
        }
    }
}
</script>
<style scoped>
button {
    background-color: rgba(64, 168, 213, 0.24);
    width: fit-content;
    height: fit-content;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    border: none;
    outline: none;
    box-shadow: 1px 1px rgba(64, 168, 213, 0.5);
}

button:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
    cursor: pointer;
}
</style>