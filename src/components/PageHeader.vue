<template>
    <div id="headerContainer">
        <div id= "title" style="font-size:30px"><font-awesome-icon id="icon" v-bind:icon="icon" size="lg"/>{{ header }}</div>
        <img id="logo" src='../assets/logo.png'/>
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
    margin-top: 40px;
    width: 100%;
    height: 50px;
}
#icon {
    margin-right: 10px;
}
#title{
    float: left;
}
#logo{
    float: right;
    margin-right: 40px;
    margin-top: -10px;
    width: 7%
}
</style>