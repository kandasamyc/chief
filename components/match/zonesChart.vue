<template>
  <div>
    <p class="has-text-centered is-size-5">Zones Metrics</p>
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
            if (this.team_data == undefined){
        return
      }
      let red_alliance = Object.keys(this.team_data).filter(
        (key) => this.team_data[key].alliance === 'red'
      )
      const labelSort = function (start, end, data) {
        let start_alliance = red_alliance.indexOf(start.text) != -1 ? 1 : 0
        let end_alliance = red_alliance.indexOf(end.text) != -1 ? 1 : 0
        return end_alliance - start_alliance
      }

      let datasets = []
      let red_colors = [
        'rgb(255, 99, 132, 0.4)',
        'rgb(255, 159, 64, 0.4)',
        'rgb(255, 205, 86, 0.4)',
      ]
      let blue_colors = [
        'rgb(75, 192, 192,0.4)',
        'rgb(52, 162, 235, 0.4)',
        'rgb(153, 102, 255, 0.4)',
      ]
      let red_index = 0
      let blue_index = 0

      for (const team in this.team_data) {
        let team_datum = this.team_data[team]
        let set = {
          label: team,
          data: Object.values(team_datum.zones) || [],
          backgroundColor:
            team_datum.alliance === 'red'
              ? red_colors[red_index++]
              : blue_colors[blue_index++],
          stack: team_datum.alliance,
        }

        datasets.push(set)
      }
      this.chartConfig.datasets = datasets
      this.chart.data.datasets = datasets
      this.chart.options.plugins.legend.labels.sort = labelSort
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
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: false,
              text: 'zones Metrics',
            },
            legend: {
              labels: {
                sort: null,
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let tooltip =
                    context.dataset.label + ' ' + context.label + ': '
                  tooltip += (
                    context.dataset.data[context.dataIndex] * 100
                  ).toFixed(1)
                  tooltip += '%'

                  return tooltip
                },
              },
            },
          },
          responsive: true,
          interaction: {
            intersect: false,
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
