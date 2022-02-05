<template>
  <div>
    <Navigator :options="matches" message="Pick Match" />
    <div v-if="this.$route.params.key" class="box">
      <p class="is-size-3 has-text-weight-medium has-text-centered">
        {{ this.$route.params.key.toUpperCase() }}
      </p>
      <p class="is-size-4 has-text-centered mb-4">{{ timeLabel }}</p>
      <p class="has-text-centered is-size-5 mb-2">Alliances</p>
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <td class="has-text-centered">1</td>
            <td class="has-text-centered">2</td>
            <td class="has-text-centered">3</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="alliance in currMatch.alliances" :key="alliance.color">
            <td
              class="has-text-centered"
              v-for="team in alliance.teams"
              :key="team"
            >
              <NuxtLink
                :class="{
                  'has-text-danger': 'red' === alliance.color,
                  'has-text-info': 'blue' === alliance.color,
                }"
                :to="'/team/' + team"
                >{{ team }}</NuxtLink
              >
            </td>
          </tr>
        </tbody>
      </table>
      <b-button class="is-fullwidth mb-4" type="is-info" v-on:click="refresh"
        >Refresh</b-button
      >
      <a
        class="button is-link is-fullwidth"
        v-bind:href="
          'https://www.thebluealliance.com/match/2020vahay_' +
          this.$route.params.key
        "
        type="is-link"
        >More at The Blue Alliance</a
      >
    </div>
    <div
      v-if="
        this.$route.params.key && Object.entries(this.currMatchData).length > 0
      "
      class="box"
    >
      <p class="is-size-5 has-text-centered mb-5">
        Winner:
        <span
          class="is-capitalized"
          v-bind:style="{ color: currMatchData.winner }"
        >
          {{ currMatchData.winner }} Alliance</span
        >
      </p>
      <table class="table is-fullwidth">
        <colgroup>
          <col class="has-text-dark" />
          <col class="has-background-danger-light" />
          <col class="has-background-info-light" />
        </colgroup>
        <thead>
          <tr>
            <td class="has-text-centered">Metric</td>
            <td class="has-text-centered">Red</td>
            <td class="has-text-centered">Blue</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, name) in currMatchData.metrics" :key="name">
            <td class="has-text-centered">{{ name }}</td>
            <td class="has-text-centered">{{ data.red }}</td>
            <td class="has-text-centered">{{ data.blue }}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <p class="has-text-centered has-size-5 mb-2">Predictions</p>
        <OddsChart ref="oddsChart" />
      </div>
    </div>
    <div v-else class="box">
      <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
        <template #trigger="props">
          <div
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">Teleop</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>

        <div class="card-content">
          <div class="content">
            <teleop-chart :teams="currMatch.alliances" ref="teleopChart"/>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import Navigator from '../../components/Navigator.vue'
import OddsChart from '../../components/oddsChart.vue'
import TeleopChart from '../../components/teleopChart.vue'
export default {
  components: { Navigator, OddsChart, TeleopChart },
  computed: {
    timeLabel: function () {
      if (Object.entries(this.currMatch).length == 0) {
        return 'Not Valid'
      }
      var options = { timeStyle: 'short' }
      if (Object.entries(this.currMatchData).length == 0) {
        var predictedTime = new Date(this.currMatch.predictedTime)
        return (
          'Expected at ' +
          predictedTime.toLocaleString(undefined, options) +
          (predictedTime.getDate() == new Date().getDate()
            ? ''
            : ', ' +
              new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(
                predictedTime
              ))
        )
      } else {
        var postResultTime = new Date(this.currMatchData.postResultTime)

        return (
          'Happened at ' +
          postResultTime.toLocaleString(undefined, options) +
          (postResultTime.getDate() == new Date().getDate()
            ? ''
            : ', ' +
              new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                postResultTime
              ))
        )
      }
    }
  },
  methods: {
    refresh: function (e) {
      if (this.$route.params.key == undefined) {
        return
      }
      if (e != undefined) {
        e.target.classList.remove('is-success')
        e.target.classList.add('is-loading')
      }
      // Do the fetching
      // For now we'll look up the data
      var allData = {
        qm1: {
          currMatch: {
            predictedTime: '2022-01-20T15:00:00-05:00',
            alliances: {
              red: [4099, 612, 614],
              blue: [449, 613, 2363],
            },
          },
          currMatchData: {
            postResultTime: '2022-01-20T15:15:00-05:00',
            winner: 'red',
            metrics: {
              'Auto Low Goal': {
                red: 5,
                blue: 6,
              },
              'Auto Outer': {
                red: 4,
                blue: 2,
              },
              'Auto Inner': {
                red: 20,
                blue: 5,
              },
              'Teleop Low Goal': {
                red: 5,
                blue: 7,
              },
              'Teleop Outer': {
                red: 5,
                blue: 7,
              },
              'Teleop Inner': {
                red: 5,
                blue: 7,
              },
              'Endgame Points': {
                red: 5,
                blue: 7,
              },
              'Number Hanging': {
                red: 5,
                blue: 7,
              },
              'Foul Points': {
                red: 5,
                blue: 7,
              },
              'Total Points': {
                red: 5,
                blue: 7,
              },
            },
          },
        },
        qm2: {
          currMatch: {
            predictedTime: '2022-01-22T15:00:00-05:00',
            alliances: {
              red: [2418, 674, 512],
              blue: [614, 4488, 692],
            },
          },
        },
      }

      var currMatch = allData[this.$route.params.key]['currMatch']
      currMatch['alliances'] = [
        { color: 'red', teams: currMatch['alliances']['red'] },
        { color: 'blue', teams: currMatch['alliances']['blue'] },
      ]
      var currMatchData = allData[this.$route.params.key]['currMatchData']
      this.currMatch = currMatch
      this.currMatchData = currMatchData != undefined ? currMatchData : {}
      if (e != undefined) {
        if (this.$refs.oddsChart != undefined)
          this.$refs.oddsChart.getOdds()
        if (this.$refs.teleopChart != undefined)
          this.$refs.teleopChart.render()

        e.target.classList.remove('is-loading')
        e.target.classList.add('is-success')
      }
    },
  },
  data() {
    return {
      matches: ['qm1', 'qm2'],
      currMatch: {},
      currMatchData: {},
    }
  },
  beforeMount() {
    this.refresh(undefined)
  },
}
</script>
