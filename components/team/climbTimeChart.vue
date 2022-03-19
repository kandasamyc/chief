<template>
  <div>
    <p class="has-text-centered is-size-5">Climb Time Metrics</p>
    <div class="chart-container mb-2" style="position: relative; width: 100%">
      <canvas id="climb-time-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'climbTimeChart',
  props: ['team_data'],
  methods: {
    render: function () {
      const ctx = document.getElementById('climb-time-chart')
      this.chart = new Chart(ctx, this.chartConfig)
      this.getData()
    },
    getData: function () {
      let datasets = [
        {
          label: 'Climb Time',
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
          ],
          data: Object.values(this.team_data.climb_time),
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
        type: 'pie',
        data: {
          labels: ['High', 'Low', 'Mid', 'Traversal'],
          datasets: [],
        },
        options: {
          responsive: true,
        },
      },
    }
  },
  mounted() {
    this.render()
  },
}
</script>
