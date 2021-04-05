<template>
    <div>
        <!-- <div>{{ info }}</div> -->
        <h1>Call Third Party API's</h1>
        <Chart></Chart>
    </div>
</template>
<script>
import Chart from "./Graph.js";

export default {
    name: "Dashboard",
    components: {
        Chart
    }
//     data() {
//         return {
//             info: null
//         }
//     },
//     methods: {
//         fetchInfo: function() {
//             axios.get("https://elephant-api.herokuapp.com/elephants")
//             .then(response => {
//                this.info = response.data
//             })
//             .catch(error => {
//             console.log(error)
//             })
//         }
//     },
//     created() {
//         this.fetchInfo()
//     }
}
</script>
<style scoped>

</style>