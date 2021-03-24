<template>
    <div>
        <h1> Your Contributions</h1>
        <ContributionCard/>
    </div>
</template>
<script>
import ContributionCard from './ContributionCard.vue';

export default {
    name: "Contributions",
    components: {
        ContributionCard
    },
    data() {
        
    }
}
</script>
<style scoped>

</style>