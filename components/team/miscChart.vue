<template>
  <div>
    <p class="has-text-centered is-size-5">Misc Metrics</p>
    <div class="chart-container mb-2" style="position: relative; height: 40vh">
      <canvas id="misc-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'miscChart',
  props: ['team_data'],
  methods: {
    render: function () {
      const ctx = document.getElementById('misc-chart')
      this.chart = new Chart(ctx, this.chartConfig)
      this.getData()
    },
    getData: function () {
      let datasets = [
        {
          label: 'Auto',
          data: Object.values(this.team_data.misc),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
          ],
        },
      ]
      this.chartConfig.datasets = datasets
      this.chart.data.datasets = datasets
      this.chart.update()
    },
  },
  data() {
    return {
      chart: null,
      chartConfig: {
        type: 'bar',
        data: {
          labels: ['Fouls', 'Climb Time'],
          datasets: [],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: false,
              text: 'misc Metrics',
            },
            legend: {
              labels: {
                sort: null,
              },
            },
          },
          responsive: true,
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      },
    }
  },
  mounted() {
    this.render()
  },
}
</script>
