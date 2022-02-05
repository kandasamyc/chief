<template>
<div class="chart-container mb-2" style="position: relative; height:30vh;">    <canvas id="teleop-chart" ></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'teleopChart',
  props: ['teams'],
  methods: {
    render: function () {
      const ctx = document.getElementById('teleop-chart')
      this.chart = new Chart(ctx, this.chartConfig)
      this.getData()

    },
    getData: function () {
      let data = {}
      let fake_data = {
        2418: {
          teleop_low_goal: 2.3,
          teleop_high_goal: 4.5,
          teleop_misses: 1.2,
        },
        674: {
          teleop_low_goal: 0.7,
          teleop_high_goal: 4,
          teleop_misses: 1,
        },
        512: {
          teleop_low_goal: 2,
          teleop_high_goal: 3.7,
          teleop_misses: 0.9,
        },
        614: {
          teleop_low_goal: 2.3,
          teleop_high_goal: 4.5,
          teleop_misses: 1.2,
        },
        4488: {
          teleop_low_goal: 2.3,
          teleop_high_goal: 4.5,
          teleop_misses: 1.2,
        },
        692: {
          teleop_low_goal: 2.3,
          teleop_high_goal: 4.5,
          teleop_misses: 1.2,
        },
      }
      for ( const team of this.teams[0].teams) {
        //fetch data
        let team_data = fake_data[team]
        data[team] = {
          alliance: 'red',
          metrics: team_data,
        }
      }
      for (const team of this.teams[1].teams) {
        //fetch data
        let team_data = fake_data[team]
        data[team] = {
          alliance: 'blue',
          metrics: team_data,
        }
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

      for (const team in data) {
        let team_datum = data[team]
        let set = {
          label: team,
          data: Object.values(team_datum.metrics) || [],
          backgroundColor:
            team_datum.alliance === "red"
              ? red_colors[red_index++]
              : blue_colors[blue_index++],
          stack: team_datum.alliance,
        }


        datasets.push(set)
      }
      this.chartConfig.datasets = datasets
      this.chart.data.datasets = datasets
      this.chart.update()
      console.log(this.chartConfig)
    },
  },
  data() {
    return {
      chart: null,
      chartConfig: {
        type: 'bar',
        data: {
          labels: ['Low Goal', 'High Goal', 'Misses'],
          datasets: [],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Teleop Metrics',
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
  mounted() {},
}
</script>
