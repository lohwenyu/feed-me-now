<template>
    <div>
        <NavigationBar/>
        <div>
            <PageHeader v-bind:header="'Leaderboard'" v-bind:icon="'trophy'"/>
        </div>
    </div>
</template>
<script>
import NavigationBar from './NavigationBar.vue';
import PageHeader from "./PageHeader.vue";

export default {
    name: "Leaderboard",
    components: {
        PageHeader,
        NavigationBar
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped>

</style>