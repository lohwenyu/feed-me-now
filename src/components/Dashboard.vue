<template>
    <div>
        <div id="spinnerContainer" v-show="(countryCount!=0) || (barLoading!=0)">
            <span id="spinner"><PacmanLoader/></span>
            <span v-show="countryCount!=null && barLoading!=null">Estimated time left: {{ timeLeft }} seconds</span>
        </div>
        <div v-show="countryCount==0">
            <div>
                <div id="barContainer">
                    <p>Singapore's IUCN Species Count</p>
                    <BarGraph v-bind:dataCollection="barGraphData" v-bind:isLoading="barLoading" v-bind:loadingCount="countryCount" ></BarGraph>
                </div>
                <div id="bubbleContainer">
                    <p>Proportion of Endangered Species in the World</p>
                    <BubbleGraph v-bind:dataCollection="bubbleGraphData" v-bind:loadingCount="countryCount"></BubbleGraph>
                </div>
            </div>
            <div>
                <ThreatCard v-bind:count="threatCardData.singapore.array" v-bind:isLoading="barLoading"></ThreatCard>
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
                    minBarLength: 0.5,
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
        }
    },
    created() {
        this.fetchBubble(),
        this.fetchBar()
    }
}
</script>
<style scoped>
*{
    box-sizing: border-box;
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
#barContainer {
    height: 70vh;
    width: 70vw;
    background-color: white;
    margin: 20px;
    padding: 20px;
}
#bubbleContainer {
    height: 70vh;
    width: 70vw;
    background-color: white;
    margin: 20px;
    padding: 20px;
}
</style>