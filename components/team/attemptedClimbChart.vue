<template>
  <div>
    <p class="has-text-centered is-size-5">Attempted Climb Metrics</p>
    <div class="chart-container mb-2" style="position: relative; width: 100%">
      <canvas id="attempted-climb-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'attemptedClimbChart',
  props: ['team_data'],
  methods: {
    render: function () {
      const ctx = document.getElementById('attempted-climb-chart')
      this.chart = new Chart(ctx, this.chartConfig)
      this.getData()
    },
    getData: function () {
      let datasets = [
        {
          label: 'Attempted Climb',
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
          ],
          data: Object.values(this.team_data.attempted_climbs),
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
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  let tooltip = context.label + ': '
                  tooltip += (
                    context.dataset.data[context.dataIndex] * 100
                  ).toFixed(1)
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
    this.render()
  },
}
</script>
