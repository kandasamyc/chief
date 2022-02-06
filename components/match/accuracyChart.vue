<template>
  <div>
    <p class="has-text-centered is-size-5">Accuracy Metrics</p>
    <div class="chart-container mb-2" style="position: relative; width: 100%;">
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
      let red_alliance = Object.keys(this.team_data).filter(
        (key) => this.team_data[key].alliance === 'red'
      )
      let red_objs = Object.fromEntries(
        Object.entries(this.team_data).filter(
          ([key, val]) => val.alliance === 'red'
        )
      )
      let blue_objs = Object.fromEntries(
        Object.entries(this.team_data).filter(
          ([key, val]) => val.alliance === 'blue'
        )
      )

      const labelSort = function (start, end, data) {
        let start_alliance = red_alliance.indexOf(start.text) != -1 ? 1 : 0
        let end_alliance = red_alliance.indexOf(end.text) != -1 ? 1 : 0
        return end_alliance - start_alliance
      }

      let red_data = Object.values(red_objs)
        .map((a) => a.accuracy)
        .reduce(function (previousValue, currentValue) {
          return {
            high: previousValue.high + currentValue.high,
            low: previousValue.low + currentValue.low,
            miss: previousValue.miss + currentValue.miss,
          }
        })

      let blue_data = Object.values(blue_objs)
        .map((a) => a.accuracy)
        .reduce(function (previousValue, currentValue) {
          return {
            high: previousValue.high + currentValue.high,
            low: previousValue.low + currentValue.low,
            miss: previousValue.miss + currentValue.miss,
          }
        })

      let datasets = [
        {
          label: 'Red',
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
          ],
          data: [red_data.high / 3, red_data.low / 3, red_data.miss / 3],
        },
        {
          label: 'Blue',

          backgroundColor: [
            'rgb(75, 192, 192)',
            'rgb(52, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          data: [blue_data.high / 3, blue_data.low / 3, blue_data.miss / 3],
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
          labels: [
            'Red High',
            'Red Low',
            'Red Miss',
            'Blue High',
            'Blue Low',
            'Blue Miss',
          ],
          datasets: [],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                generateLabels: function (chart) {
                  // Get the default label list
                  const original =
                    Chart.overrides.pie.plugins.legend.labels.generateLabels
                  const labelsOriginal = original.call(this, chart)

                  // Build an array of colors used in the datasets of the chart
                  let datasetColors = chart.data.datasets.map(function (e) {
                    return e.backgroundColor
                  })
                  datasetColors = datasetColors.flat()

                  // Modify the color and hide state of each label
                  labelsOriginal.forEach((label) => {
                    // There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
                    label.datasetIndex = (label.index - (label.index % 3)) / 3

                    // The hidden state must match the dataset's hidden state
                    label.hidden = !chart.isDatasetVisible(label.datasetIndex)

                    // Chighe the color to match the dataset
                    label.fillStyle = datasetColors[label.index]
                  })

                  return labelsOriginal
                },
                sort: function (first, second, data) {
                  let fspl = first.text.split(' ')
                  let sspl = second.text.split(' ')
                  if (fspl[1].charAt(0) === sspl[1].charAt(0)) {
                    return fspl[0].charAt(0) - sspl[0].charAt(0)
                  } else {
                    let order = {
                      H: 1,
                      L: 2,
                      M: 3,
                    }
                    return order[fspl[1].charAt(0)] - order[sspl[1].charAt(0)]
                  }
                },
              },
              onClick: function (mouseEvent, legendItem, legend) {
                // toggle the visibility of the dataset from what it currently is
                legend.chart.getDatasetMeta(legendItem.datasetIndex).hidden =
                  legend.chart.isDatasetVisible(legendItem.datasetIndex)
                legend.chart.update()
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const labelIndex =
                    context.datasetIndex * 3 + context.dataIndex

                  let tooltip = context.chart.data.labels[labelIndex] + ': '
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
