<template>
    <div id="container">
        <div id="spinnerContainer" v-show="(countryCount!=0) || (barLoading!=0)">
            <span id="spinner"><PacmanLoader v-bind:color="`rgb(150, 176, 138)`"/></span>
            <div id="timeLeftContainer">
                <span v-show="countryCount!=null && barLoading!=null">Estimated time left: {{ timeLeft }} seconds</span>
            </div>
        </div>
        <div v-show="countryCount==0">
            <div id="headerContainer">
                <button id="logoButton" v-on:click="redirectLogin()"><img id="logo" src="../assets/logo.png"></button>
                <span id="header">Dashboard</span>
                <button id="contributeButton" v-on:click="redirectLogin()">Contribute Now</button>
            </div>
            <div>
                <div id="barContainer">
                    <p class="graphTitle">Singapore's IUCN Species Count</p>
                    <BarGraph v-bind:dataCollection="barGraphData" v-bind:isLoading="barLoading" v-bind:loadingCount="countryCount" ></BarGraph>
                </div>
                <div id="threatContainer">
                    <ThreatCard v-bind:count="threatCardData.singapore.array" v-bind:isLoading="barLoading"></ThreatCard>
                </div>
                <div id="bubbleContainer">
                    <p class="graphTitle">Proportion of Endangered Species in the World</p>
                    <BubbleGraph v-bind:dataCollection="bubbleGraphData" v-bind:loadingCount="countryCount"></BubbleGraph>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import axios from "axios";
import ThreatCard from './ThreatCard.vue';
import BarGraph from "./BarGraph.vue";
import BubbleGraph from "./BubbleGraph.vue";
export default {
    name: "Dashboard",
    components: {
        ThreatCard,
        BarGraph,
        BubbleGraph,
        PacmanLoader
    },
    data() {
        return {
            countryCount: null,
            bubbleGraphData: {
                datasets: [
                    {
                        label: "≤5% endangered",
                        backgroundColor: '#5B84C4',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: '#000000',
                        data: []
                    },
                    {
                        label: "5%-10% endangered",
                        backgroundColor: '#fca26e',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: '#000000',
                        data: []
                    },
                    {
                        label: ">10% endangered",
                        backgroundColor: '#f98125',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: '#000000',
                        data: []
                    },
                    {
                        label: "NaN",
                        backgroundColor: 'grey',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: '#000000',
                        data: []
                    }
                ]
            },
            barLoading: null,
            barGraphData: {
                labels: ["Data Deficient", "Least Concern", "Near Threatened", 
                    "Vulnerable", "Endangered", "Critically Endangered", 
                    "Extinct in the Wild", "Extinct"],
                datasets: [{ 
                    label: "Species Count",
                    data: [0,0,0,0,0,0,0,0],
                    backgroundColor: [
                        "rgb(44, 89, 157, 0.7)",
                        "rgb(91, 132, 196, 0.7)",
                        "rgb(252, 162, 110, 0.7)",
                        "rgb(251, 152, 80, 0.7)",
                        "rgb(251, 152, 80, 0.7)",
                        "rgb(251, 152, 80, 0.7)",
                        "rgb(249, 129, 37, 0.7)",
                        "rgb(249, 129, 37, 0.7)"
                    ],
                    borderColor: [
                        "rgb(44, 89, 157)",
                        "rgb(91, 132, 196)",
                        "rgb(252, 162, 110)",
                        "rgb(251, 152, 80)",
                        "rgb(251, 152, 80)",
                        "rgb(251, 152, 80)",
                        "rgb(249, 129, 37)",
                        "rgb(249, 129, 37)"
                    ],
                    minBarLength: 1,
                }]
            },
            threatCardData: {
                singapore: {
                    array: [0, 0, 0, 0, 0],
                }, 
                other: {
                    filled: false,
                    array: [0, 0, 0, 0, 0],
                    isLoading: null
                }
            },
            total: 0,
        }
    },
    computed: {
        timeLeft: function() {
            return Math.round(this.countryCount/this.total * 30)
        }
    },
    methods: {
        fetchBubble: function () {
            axios.get(`https://apiv3.iucnredlist.org/api/v3/country/list?token=b5b6245df07b4070472855de9b6124dc3c984b6e93b8ef93530d729526654d71`)
            .then(response => {
                this.countryCount = response.data.results.length;
                this.total = response.data.results.length;
                response.data.results.forEach(data => {
                    const isoCode = data.isocode
                    const link = `https://apiv3.iucnredlist.org/api/v3/country/getspecies/` + isoCode + `?token=b5b6245df07b4070472855de9b6124dc3c984b6e93b8ef93530d729526654d71`
                    axios.get(link).then(countryResponse => {
                        var currData = {
                            x: 0,
                            y: 0,
                            r: countryResponse.data.count/500,
                            country: data.country
                        }
                        countryResponse.data.result.forEach(data => {
                            if (data.category == "VU" || data.category == "EN" || data.category == "CR") {
                                currData.x += 1
                            } else if (data.category == "LC") {
                                currData.y += 1
                            }
                        })
                        if (currData.x/countryResponse.data.count <= 0.05) {
                            this.bubbleGraphData.datasets[0].data.push(currData)
                            this.countryCount -= 1
                        } else if (currData.x/countryResponse.data.count <= 0.10) {
                            this.bubbleGraphData.datasets[1].data.push(currData)
                            this.countryCount -= 1
                        } else if (currData.x/countryResponse.data.count > 0.10) {
                            this.bubbleGraphData.datasets[2].data.push(currData)
                            this.countryCount -= 1
                        } else {
                            this.bubbleGraphData.datasets[2].data.push(currData)
                            this.countryCount -= 1
                        }
                    })
                })
            })
        },
        fetchBar: function() {
            axios.get(`https://apiv3.iucnredlist.org/api/v3/country/getspecies/SG?token=b5b6245df07b4070472855de9b6124dc3c984b6e93b8ef93530d729526654d71`)
            .then(response => {
                this.barLoading = response.data.result.length
                response.data.result.forEach(data => {
                    if (data.category == "DD") {
                        this.barGraphData.datasets[0].data[0] += 1
                        this.barLoading -= 1
                        this.threatCardData.singapore.array[0] +=1
                    } else if (data.category == "LC" || data.category == "LR/lc") {
                        this.barGraphData.datasets[0].data[1] += 1
                        this.barLoading -= 1
                        this.threatCardData.singapore.array[1] +=1
                    } else if (data.category == "NT" || data.category == "LR/nt" || data.category == "LR/cd") {
                        this.barGraphData.datasets[0].data[2] += 1
                        this.barLoading -= 1
                        this.threatCardData.singapore.array[2] +=1
                    } else if (data.category == "VU") {
                        this.barGraphData.datasets[0].data[3] += 1
                        this.barLoading -= 1
                        this.threatCardData.singapore.array[3] +=1
                    } else if (data.category == "EN") {
                        this.barGraphData.datasets[0].data[4] += 1
                        this.barLoading -= 1
                        this.threatCardData.singapore.array[3] +=1
                    } else if (data.category == "CR") {
                        this.barGraphData.datasets[0].data[5] += 1
                        this.barLoading -= 1
                        this.threatCardData.singapore.array[3] +=1
                    } else if (data.category == "EW") {
                        this.barGraphData.datasets[0].data[6] += 1
                        this.barLoading -= 1
                        this.threatCardData.singapore.array[4] +=1
                    } else if (data.category == "EX") {
                        this.barGraphData.datasets[0].data[7] += 1
                        this.barLoading -= 1
                        this.threatCardData.singapore.array[4] +=1
                    }
                })
            })
        },
        redirectLogin: function() {
            this.$router.push({ path: '/login' }) 
        }
    },
    created() {
        this.fetchBubble(),
        this.fetchBar()
    }
}
</script>
<style scoped>
#container {
    background-image: url("https://i.pinimg.com/originals/2c/59/55/2c5955633852d7f0ce71e42d8e4d5684.jpg");
    background-size: cover;
    background-attachment: fixed;
    padding-bottom: 20px;
    padding-top: 20px;
}
#spinnerContainer {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
#spinner {
    margin: 10px;
}
#timeLeftContainer {
    padding-left: 15px;
    padding-right: 15px;
    width: auto;
    height: 30px;
    background-color: rgb(150, 176, 138);
    border-radius: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
#headerContainer {
    display: flex;
    align-items: center;
    height: 120px;
    width: auto;
    padding: 20px;
    /* background-color: white; */
}
#header {
    font-size: 25px;
    font-weight: bold;
    padding: 30px;
}
#logoButton {
    background: none;
    outline: none;
    border: none;
}
#logoButton:hover {
    cursor: pointer;
}
#logo {
    height: 100px;
}
#contributeButton {
    color: black;
    background: white;
    width: 180px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    border: none;
    outline: none;
    margin-right: 0;
    margin-left: auto;
    font-weight: bold;
    border-radius: 100px;
}
#contributeButton:hover {
    color: white;
    background: black;
    transition: ease-in-out 0.2s;
    cursor: pointer;
}
#barContainer {
    background-color: white;
    margin: 20px;
    padding: 20px;
}
#bubbleContainer {
    background-color: white;
    margin: 20px;
    padding: 20px;
}
.graphTitle {
    font-weight: bold;
}
</style>