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
      if (this.team_data == undefined){
        console.log("hi")
        return
      }
      let red_alliance = Object.keys(this.team_data).filter(
        (key) => this.team_data[key].alliance === 'red'
      )
      console.log(red_alliance)
      const labelSort = function (start, end, data) {
        let start_alliance = red_alliance.indexOf(start.text) != -1 ? 1 : 0
        let end_alliance = red_alliance.indexOf(end.text) != -1 ? 1 : 0
        return end_alliance - start_alliance
      }

      let datasets = []
      let red_colors = [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
      ]
      let blue_colors = [
        'rgb(75, 192, 192)',
        'rgb(52, 162, 235)',
        'rgb(153, 102, 255)',
      ]
      let red_index = 0
      let blue_index = 0

      for (const team in this.team_data) {
        let team_datum = this.team_data[team]
        let set = {
          label: team,
          data: Object.values(team_datum.auto) || [],
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
              text: 'auto Metrics',
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
