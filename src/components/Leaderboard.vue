<template>
    <div>
        <PageHeader v-bind:header="'Leaderboard'" v-bind:icon="'trophy'"/>
    </div>
</template>
<script>
import PageHeader from "./PageHeader.vue";

export default {
    name: "Leaderboard",
    components: {
        PageHeader
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped>

</style>