<script>
import { Bar } from "vue-chartjs"
export default {
    name: "BarGraph",
    extends: Bar,
    props: {
        dataCollection: {
            type: Object,
            default: null
        },
        isLoading: {
            type: Number,
        },
        loadingCount: {
            type: Number
        }
    },
    data() {
        return {
            options: {
                scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero: true,
						},
						gridLines: {
							display: false
						}
					}],
				},
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
    computed: {
        combined: function() {
            return this.isLoading == 0 && this.loadingCount == 0
        }
    },
    watch: {
        combined: function() {
            if (this.combined) {
                this.renderChart(this.dataCollection, this.options)
            }
        }
    },
}
</script>