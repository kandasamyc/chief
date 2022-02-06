<template>
  <div>
    <p class="has-text-centered is-size-5">Accuracy Metrics</p>
    <div class="chart-container mb-2" style="position: relative; width: 100%">
      <canvas id="accuracy-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'accuracyChart',
  props: ['team_data'],
  methods: {
    render: function () {
      const ctx = document.getElementById('accuracy-chart')
      this.chart = new Chart(ctx, this.chartConfig)
      this.getData()
    },
    getData: function () {
      let datasets = [
        {
          label: 'Accuracy',
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
          ],
          data: Object.values(this.team_data.accuracy),
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
          labels: ['High', 'Low', 'Miss'],
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
