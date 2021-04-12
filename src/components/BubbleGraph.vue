<script>
import { Bubble } from 'vue-chartjs'
export default {
    name: "BubbleGraph",
    extends: Bubble,
    props: {
        dataCollection: {
            type: Object,
            default: null
        },
        loadingCount: {
            type: Number,
        }
    },
    data() {
        return {
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
					}],
				},
				legend: {
					display: true,
				},
				tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
                        label: function(tooltipItems, data) {
                            var countryLabel = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index].country
                            return countryLabel
						},
                        afterLabel: function(tooltipItems, data) {
                            var rLabel = "Total: " + data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index].r * 500
                            var xLabel = "Endangered: " + tooltipItems.xLabel
                            var yLabel = "Least Concerned: " + tooltipItems.yLabel
                            return [rLabel, xLabel, yLabel]
						},
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				height: 200
            },
        }
    },
    watch: {
        loadingCount: function() {
            if (this.loadingCount == 0) {
                this.renderChart(this.dataCollection, this.options)
            }
        }
    },
}
</script>