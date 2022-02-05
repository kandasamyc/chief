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
      <AutoChart :team_data="currMatch.team_metrics" ref="autoChart" />
      <TeleopChart :team_data="currMatch.team_metrics" ref="teleopChart" />
      <MiscChart :team_data="currMatch.team_metrics" ref="miscChart" />
      <ZonesChart :team_data="currMatch.team_metrics" ref="zonesChart" />
      <AccuracyChart :team_data="currMatch.team_metrics" ref="accuracyChart" />
    </div>
  </div>
</template>

<script>
import Navigator from '../../components/Navigator.vue'
import OddsChart from '../../components/oddsChart.vue'
import TeleopChart from '../../components/teleopChart.vue'
import AutoChart from '../../components/autoChart.vue'
import MiscChart from '../../components/miscChart.vue'
import ZonesChart from '../../components/zonesChart.vue'

export default {
  components: {
    Navigator,
    OddsChart,
    TeleopChart,
    AutoChart,
    MiscChart,
    ZonesChart,
  },
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
    },
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
            team_metrics: {
              512: {
                accuracy: { high: 0.454, low: 0.364, miss: 0.182 },
                alliance: "red",
                auto: { high_goal: 6.9, low_goal: 5.0, misses: 0.6 },
                misc: { climb_time: 5.8, fouls: 5.6 },
                teleop: { high_goal: 3.2, low_goal: 4.9, misses: 1.9 },
                zones: {
                  far_trench: 0.618,
                  initiation_line: 0.426,
                  near_trench: 0.646,
                  rendezvous_point: 0.086,
                  target_zone: 0.144,
                },
              },
              614: {
                accuracy: { high: 0.357, low: 0.484, miss: 0.159 },
                alliance: "blue",
                auto: { high_goal: 6.4, low_goal: 2.7, misses: 0.4 },
                misc: { climb_time: 0.1, fouls: 2.3 },
                teleop: { high_goal: 6.6, low_goal: 4.0, misses: 0.2 },
                zones: {
                  far_trench: 0.877,
                  initiation_line: 0.88,
                  near_trench: 0.464,
                  rendezvous_point: 0.864,
                  target_zone: 0.433,
                },
              },
              674: {
                accuracy: { high: 0.435, low: 0.115, miss: 0.449 },
                alliance: "red",
                auto: { high_goal: 2.6, low_goal: 4.4, misses: 1.8 },
                misc: { climb_time: 1.5, fouls: 6.8 },
                teleop: { high_goal: 4.4, low_goal: 2.8, misses: 1.2 },
                zones: {
                  far_trench: 0.435,
                  initiation_line: 0.344,
                  near_trench: 0.972,
                  rendezvous_point: 0.526,
                  target_zone: 0.773,
                },
              },
              692: {
                accuracy: { high: 0.053, low: 0.542, miss: 0.405 },
                alliance: "blue",
                auto: { high_goal: 6.3, low_goal: 2.0, misses: 1.8 },
                misc: { climb_time: 4.1, fouls: 2.7 },
                teleop: { high_goal: 6.0, low_goal: 6.3, misses: 1.9 },
                zones: {
                  far_trench: 0.494,
                  initiation_line: 0.182,
                  near_trench: 0.126,
                  rendezvous_point: 0.722,
                  target_zone: 0.398,
                },
              },
              2418: {
                accuracy: { high: 0.215, low: 0.136, miss: 0.648 },
                alliance: "red",
                auto: { high_goal: 6.0, low_goal: 3.9, misses: 1.4 },
                misc: { climb_time: 2.4, fouls: 6.3 },
                teleop: { high_goal: 6.4, low_goal: 6.1, misses: 0.3 },
                zones: {
                  far_trench: 0.159,
                  initiation_line: 0.502,
                  near_trench: 0.391,
                  rendezvous_point: 0.922,
                  target_zone: 0.446,
                },
              },
              4488: {
                accuracy: { high: 0.305, low: 0.543, miss: 0.152 },
                alliance: "blue",
                auto: { high_goal: 4.3, low_goal: 3.1, misses: 0.8 },
                misc: { climb_time: 2.6, fouls: 5.2 },
                teleop: { high_goal: 3.0, low_goal: 4.1, misses: 1.4 },
                zones: {
                  far_trench: 0.046,
                  initiation_line: 0.834,
                  near_trench: 0.573,
                  rendezvous_point: 0.121,
                  target_zone: 0.23,
                },
              },
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
        if (this.$refs.oddsChart != undefined) this.$refs.oddsChart.getOdds()
        if (this.$refs.teleopChart != undefined) {
          this.$refs.teleopChart.getData()
        }

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
