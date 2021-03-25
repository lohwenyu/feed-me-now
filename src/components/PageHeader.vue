<template>
    <div id="headerContainer">
        <h1><font-awesome-icon id="icon" v-bind:icon="icon" size="lg"/>{{ header }}</h1>
    </div>
</template>
<script>
export default {
    name: "PageHeader",
    props: {
        header: {
            type: String
        },
        icon: {
            type: String
        }
    }
}
</script>
<style scoped>
#headerContainer {
    margin-left: 40px;
    margin-top: 40px
}
#icon {
    margin-right: 10px;
}
</style>