import { Bubble } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Bubble,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [
                    {
                    label: [],
                    backgroundColor: '#f87979',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: '#249EBF',
                    data: []
                    }
                ]
            },
            options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: false
						}
					}]
				},
				legend: {
					display: false
				},
				tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
						// label: function(tooltipItems) {
                        //     var datasetLabel = this.datacollection.datasets[0].label[tooltipItems.datasetIndex]
                        //     var rLabel = this.datacollection.datasets[0].data[tooltipItems.datasetIndex]
						// 	return datasetLabel + "" + tooltipItems.title + "\n" + tooltipItems.yLabel + "\n" + tooltipItems.xLabel + "\n" + rLabel ;
						// },
                        label: function(tooltipItems) {
							return tooltipItems.title + "\n" + tooltipItems.yLabel + "\n" + tooltipItems.xLabel + "\n" ;
						}
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				height: 200
            },
            isoCodes: [],
            loading: true
        }
    },
    methods: {
        fetchItems: function () {
            
            axios.get(`https://apiv3.iucnredlist.org/api/v3/country/list?token=b5b6245df07b4070472855de9b6124dc3c984b6e93b8ef93530d729526654d71`)
            .then(response => {
                response.data.results.forEach(data => {
                    this.isoCodes.push(data.isocode);
                    this.datacollection.datasets[0].label.push(data.country)
                })
            }).then(() => {
                var i
                for (i=0; i<this.isoCodes.length; i++) {
                    const isoCode = this.isoCodes[i]
                    const link = `https://apiv3.iucnredlist.org/api/v3/country/getspecies/` + isoCode + `?token=b5b6245df07b4070472855de9b6124dc3c984b6e93b8ef93530d729526654d71`
                    axios.get(link)
                    .then(response => {
                        var currData = {
                            x: 0,
                            y: 0,
                            r: response.data.count/500
                        }
                        response.data.result.forEach(data => {
                            if (data.category == "VU" || data.category == "EN" || data.category == "CR") {
                                currData.x += 1
                            } else if (data.category == "LC") {
                                currData.y += 1
                            }
                        })
                        // console.log(currData)
                        this.datacollection.datasets[0].data.push(currData)
                    }).then(() => {
                        console.log(this.datacollection.datasets[0].data.length)
                        if (this.datacollection.datasets[0].data.length==this.isoCodes.length-1) {
                            this.renderChart(this.datacollection, this.options)
                        }

                    })
                }
            })
        }
    },
    created () {
        this.fetchItems()
        // this.renderChart(this.datacollection, this.options)
    }
}