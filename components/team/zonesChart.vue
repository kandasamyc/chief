<template>
  <div>
    <p class="has-text-centered is-size-5">Zone Metrics</p>
    <div class="chart-container mb-2" style="position: relative; width: 100%">
      <canvas id="zones-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'zonesChart',
  props: ['team_data'],
  methods: {
    render: function () {
      const ctx = document.getElementById('zones-chart')
      this.chart = new Chart(ctx, this.chartConfig)
      this.getData()
    },
    getData: function () {
      let datasets = [
        {
          label: 'Usage',
          backgroundColor: ['rgb(255, 159, 64,0.4)'],
          data: Object.values(this.team_data.zones),
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
        type: 'radar',
        data: {
          labels: [
            'Far Trench',
            'Initiation Line',
            'Near Trench',
            'Rendezvous Point',
            'Target Zone',
          ],
          datasets: [],
        },
        options: {
          responsive: true,
          scales: {
            r: {
              max: 1.0
            }
          },
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
