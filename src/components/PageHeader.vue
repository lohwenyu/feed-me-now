<template>
    <div id="headerContainer">
        <div id= "title" style="font-size:30px"><font-awesome-icon id="icon" v-bind:icon="icon" size="lg"/>{{ header }}</div>
        <span id="description">{{ description }}</span>
        <span id="subDescription">{{ subDescription }}</span>
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
        },
        description: {
            type: String
        },
        subDescription: {
            type: String
        }
    }
}
</script>
<style scoped>
#headerContainer {
    margin-top: 40px;
    margin-bottom: 20px;
    padding-inline: 5%;
    display: flex;
    flex-direction: column;
}
#icon {
    margin-right: 10px;
}
#title{
    margin-bottom: 20px;
}
#description {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
#subDescription {
    font-size: 18px;
}
</style>