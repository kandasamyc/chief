<template>
  <div>
    <canvas id="odds-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'OddsChart',
  props: ['predictions'],
  methods: {
    getOdds: function () {
      this.oddsChartData.data.datasets[0].data = this.predictions
      this.chart.update()
    },
  },
  data() {
    return {
      chart: null,
      oddsChartData: {
        type: 'doughnut',
        data: {
          labels: ['Red', 'Blue'],
          datasets: [
            {
              label: 'Votes',
              data: [0, 0],
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
              ],
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  let tooltip = context.label + ": "
                  tooltip += (context.dataset.data[context.dataIndex] * 100).toFixed(1)
                  tooltip += '%'
                  return tooltip
                },
              },
            },
          },
        },
      },
    }
  },
  mounted() {
    const ctx = document.getElementById('odds-chart')
    this.chart = new Chart(ctx, this.oddsChartData)
    this.getOdds()
  },
}
</script>
