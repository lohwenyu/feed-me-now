<template>
    <div id="container" v-show="isLoading==0">
        <div id="container1">
            <div class="threatLevel"><p>Data Deficient</p></div>
            <div class="count"><p>{{ count[0] }}</p></div>
        </div>
        <div id="container2">
            <div class="threatLevel"><p>Least Concern</p></div>
            <div class="count"><p>{{ count[1] }}</p></div>
        </div>
        <div id="container3">
            <div class="threatLevel"><p>Near Threatened</p></div>
            <div class="count"><p>{{ count[2] }}</p></div>
        </div>
        <div id="container4">
            <div class="threatLevel"><p>Endangered</p></div>
            <div class="count"><p>{{ count[3] }}</p></div>
        </div>
        <div id="container5">
            <div class="threatLevel"><p>Extinct</p></div>
            <div class="count"><p>{{ count[4] }}</p></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ThreatCard",
    props: {
        count: {
            type: Array,
            default: null
        },
        isLoading: {
            type: Number,
        }
    },
}
</script>
<style scoped>
#container {
    height: 120px;
    width: 500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background-color: white;
    align-items: center;
}
#container1 {
    background-color: rgb(44, 89, 157);
    height: 100px;
    width: 90px;
}
#container2 {
    background-color: rgb(91, 132, 196);
    height: 100px;
    width: 90px;
}
#container3 {
    background-color: rgb(252, 162, 110);
    height: 100px;
    width: 90px;
}
#container4 {
    background-color: rgb(251, 152, 80);
    height: 100px;
    width: 90px;
}
#container5 {
    background-color: rgb(249, 129, 37);
    height: 100px;
    width: 90px;
}
.threatLevel {
    height: 70px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.count {
    height: 30px;
    font-size: 18px;
    font-weight: 900;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
</style>