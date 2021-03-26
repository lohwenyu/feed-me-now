<template>
    <div>
        <img id="picture" v-bind:src="selectedanimal[1].picture">
        THANK YOU FOR YOUR DONATION
        <button @click="homepage()">Help more animals</button>
    </div>
</template>
<script>
export default {
    name: "SuccessfulTreat",
    data() {
        
    },
    props: ['selectedanimal'],
    methods: {
        homepage: function() {
            this.$router.push('/').then(() => location.reload())
        }
    }

}
</script>
<style scoped>

</style>