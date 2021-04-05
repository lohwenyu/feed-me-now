import { Bubble } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Bubble,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                data: [],
                fill: false
            }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: ''
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://elephant-api.herokuapp.com/elephants`)
        .then(response => {
            response.data.forEach(data => { 
                this.datacollection.labels.push(data[0])
                this.datacollection.datasets[0].data.push(data[1])
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}