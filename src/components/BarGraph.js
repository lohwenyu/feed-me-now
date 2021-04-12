import { Bar } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Bar,
    data: function () {
        return {
            datacollection: {
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
            options: {
                legend: { 
                    display: false
                },
                title: {
                    display: true,
                    text: ''
                },
                responsive: true,
                maintainAspectRatio: false,
            }
        }
    },
    methods: {
        fetchItems: function () {
            axios.get(`https://apiv3.iucnredlist.org/api/v3/country/getspecies/SG?token=b5b6245df07b4070472855de9b6124dc3c984b6e93b8ef93530d729526654d71`)
            .then(response => {
                response.data.result.forEach(data => {
                    if (data.category == "DD") {
                        this.datacollection.datasets[0].data[0] += 1
                    } else if (data.category == "LC") {
                        this.datacollection.datasets[0].data[1] += 1
                    } else if (data.category == "NT") {
                        this.datacollection.datasets[0].data[2] += 1
                    } else if (data.category == "VU") {
                        this.datacollection.datasets[0].data[3] += 1
                    } else if (data.category == "EN") {
                        this.datacollection.datasets[0].data[4] += 1
                    } else if (data.category == "CR") {
                        this.datacollection.datasets[0].data[5] += 1
                    } else if (data.category == "EW") {
                        this.datacollection.datasets[0].data[6] += 1
                    } else if (data.category == "EX") {
                        this.datacollection.datasets[0].data[7] += 1
                    } 
                })
                this.renderChart(this.datacollection, this.options)
            })
        }
    },
    created () {
        this.fetchItems()
    }
}