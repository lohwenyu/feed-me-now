<script>
import { Bar } from "vue-chartjs"

export default {
    name: "BubbleGraph",
    extends: Bar,
    props: {
        dataCollection: {
            type: Object,
            default: null
        },
        isLoading: {
            type: Number,
        }
    },
    data() {
        return {
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
    watch: {
        isLoading: function() {
            if (this.isLoading == 0) {
                this.renderChart(this.dataCollection, this.options)
            }
        }
    }
}
</script>