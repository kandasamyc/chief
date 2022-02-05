<template>
  <div class="mb-2">
    <canvas id="odds-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'OddsChart',
  methods: {
    getOdds: function () {
      this.oddsChartData.data.datasets[0].data = [0.7, 0.3]
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
          tooltips: {
            enabled: true,
            callbacks: {
              label: function (context) {
                let tooltip = ''
                if (context.index === 0) {
                  tooltip += 'Red: '
                } else {
                  tooltip += 'Blue:'
                }

                tooltip += this._data.datasets[0].data[context.index] * 100
                tooltip += '%'
                return tooltip
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
