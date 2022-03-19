<template>
  <div>
    <p class="has-text-centered is-size-5">Auto Metrics</p>
    <div class="chart-container mb-2" style="position: relative; height: 40vh">
      <canvas id="auto-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'autoChart',
  props: ['team_data'],
  methods: {
    render: function () {
      const ctx = document.getElementById('auto-chart')
      this.chart = new Chart(ctx, this.chartConfig)
      this.getData()
    },
    getData: function () {
      let datasets = [
        {
          label: 'Auto',
          data: Object.values(this.team_data.auto),
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
          labels: ['Lower Hub', 'Upper Hub', 'Misses'],
          datasets: [],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: false,
              text: 'Auto Metrics',
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
