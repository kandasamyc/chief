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
        <OddsChart :predictions="currMatchData.predictions" ref="oddsChart" />
      </div>
    </div>
    <template v-else-if="this.$route.params.key">
      <div class="box">
        <AutoChart
          class="mt-2"
          :team_data="currMatch.team_metrics"
          ref="autoChart"
        />
        <TeleopChart
          class="mt-5"
          :team_data="currMatch.team_metrics"
          ref="teleopChart"
        />
        <MiscChart
          class="mt-5"
          :team_data="currMatch.team_metrics"
          ref="miscChart"
        />
        <ZonesChart
          class="mt-5"
          :team_data="currMatch.team_metrics"
          ref="zonesChart"
        />
        <ClimbChart
          class="mt-5"
          :team_data="currMatch.team_metrics"
          ref="climbChart"
        />
        <AccuracyChart
          class="mt-5"
          :team_data="currMatch.team_metrics"
          ref="accuracyChart"
        />
      </div>
      <div class="box">
        <p class="has-text-centered mb-3 is-size-4">Make Prediction</p>
        <b-field>
          <b-radio-button
            required
            expanded
            v-model="prediction"
            native-value="Red"
            type="is-danger is-light is-outlined"
          >
            <span>Red</span>
          </b-radio-button>

          <b-radio-button
            required
            expanded
            v-model="prediction"
            native-value="Blue"
            type="is-info is-light is-outlined"
          >
            <span>Blue</span>
          </b-radio-button>
        </b-field>
        <b-field :message="validityMessage">
          <b-button
            v-bind:disabled="!this.$store.state.login.validity"
            @click="submitPrediction"
            class="is-success is-light is-outlined"
            expanded
            >Submit</b-button
          >
        </b-field>
      </div>
    </template>
  </div>
</template>

<script>
import Navigator from '../../components/Navigator.vue'
import OddsChart from '../../components/match/oddsChart.vue'
import TeleopChart from '../../components/match/teleopChart.vue'
import AutoChart from '../../components/match/autoChart.vue'
import MiscChart from '../../components/match/miscChart.vue'
import ZonesChart from '../../components/match/zonesChart.vue'
import ClimbChart from '../../components/match/climbChart.vue'
import AccuracyChart from '../../components/match/accuracyChart.vue'

export default {
  components: {
    Navigator,
    OddsChart,
    TeleopChart,
    AutoChart,
    MiscChart,
    ZonesChart,
    ClimbChart,
    AccuracyChart,
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
    validityMessage() {
      return this.$store.state.login.validity ? '' : 'No Scout ID given.'
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
            predictions: [0.7, 0.3],
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
                accuracy: { high: 0.097, low: 0.751, miss: 0.153 },
                alliance: 'red',
                auto: { high_goal: 2.1, low_goal: 5.3, misses: 2.0 },
                climb: { hang: 0.905, no_climb: 0.087, park: 0.008 },
                misc: { climb_time: 1.1, fouls: 5.0 },
                teleop: { high_goal: 2.9, low_goal: 5.4, misses: 0.2 },
                zones: {
                  far_trench: 0.638,
                  initiation_line: 0.142,
                  near_trench: 0.472,
                  rendezvous_point: 0.024,
                  target_zone: 0.174,
                },
              },
              614: {
                accuracy: { high: 0.65, low: 0.093, miss: 0.256 },
                alliance: 'blue',
                auto: { high_goal: 6.6, low_goal: 3.3, misses: 0.7 },
                climb: { hang: 0.717, no_climb: 0.263, park: 0.02 },
                misc: { climb_time: 1.7, fouls: 5.4 },
                teleop: { high_goal: 2.2, low_goal: 4.1, misses: 1.4 },
                zones: {
                  far_trench: 0.565,
                  initiation_line: 0.117,
                  near_trench: 0.343,
                  rendezvous_point: 0.574,
                  target_zone: 0.807,
                },
              },
              674: {
                accuracy: { high: 0.093, low: 0.48, miss: 0.426 },
                alliance: 'red',
                auto: { high_goal: 5.4, low_goal: 5.4, misses: 1.4 },
                climb: { hang: 0.764, no_climb: 0.229, park: 0.008 },
                misc: { climb_time: 3.5, fouls: 4.4 },
                teleop: { high_goal: 3.9, low_goal: 5.7, misses: 0.8 },
                zones: {
                  far_trench: 0.591,
                  initiation_line: 0.791,
                  near_trench: 0.034,
                  rendezvous_point: 0.614,
                  target_zone: 0.726,
                },
              },
              692: {
                accuracy: { high: 0.525, low: 0.027, miss: 0.449 },
                alliance: 'blue',
                auto: { high_goal: 5.5, low_goal: 4.3, misses: 1.3 },
                climb: { hang: 0.293, no_climb: 0.55, park: 0.157 },
                misc: { climb_time: 3.1, fouls: 6.3 },
                teleop: { high_goal: 2.9, low_goal: 6.9, misses: 0.5 },
                zones: {
                  far_trench: 0.771,
                  initiation_line: 0.939,
                  near_trench: 0.75,
                  rendezvous_point: 0.183,
                  target_zone: 0.148,
                },
              },
              2418: {
                accuracy: { high: 0.056, low: 0.436, miss: 0.508 },
                alliance: 'red',
                auto: { high_goal: 6.6, low_goal: 6.3, misses: 0.4 },
                climb: { hang: 0.651, no_climb: 0.03, park: 0.319 },
                misc: { climb_time: 0.7, fouls: 3.3 },
                teleop: { high_goal: 6.4, low_goal: 6.4, misses: 1.7 },
                zones: {
                  far_trench: 0.145,
                  initiation_line: 0.834,
                  near_trench: 0.077,
                  rendezvous_point: 0.492,
                  target_zone: 0.884,
                },
              },
              4488: {
                accuracy: { high: 0.413, low: 0.009, miss: 0.578 },
                alliance: 'blue',
                auto: { high_goal: 3.8, low_goal: 5.3, misses: 0.4 },
                climb: { hang: 0.202, no_climb: 0.261, park: 0.538 },
                misc: { climb_time: 0.2, fouls: 4.7 },
                teleop: { high_goal: 4.5, low_goal: 4.3, misses: 0.3 },
                zones: {
                  far_trench: 0.38,
                  initiation_line: 0.362,
                  near_trench: 0.988,
                  rendezvous_point: 0.397,
                  target_zone: 0.386,
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
          this.$refs.autoChart.getData()
          this.$refs.teleopChart.getData()
          this.$refs.miscChart.getData()
          this.$refs.zonesChart.getData()
          this.$refs.accuracyChart.getData()
        }

        e.target.classList.remove('is-loading')
        e.target.classList.add('is-success')
      }
    },
    submitPrediction: function (e) {
      if (e != undefined) {
        e.target.classList.remove('is-success')
        e.target.classList.add('is-loading')
      }

      console.log(this.prediction.toLowerCase())

      e.target.classList.add('is-success')
      e.target.classList.remove('is-loading')
    },
  },
  data() {
    return {
      matches: ['qm1', 'qm2'],
      currMatch: {},
      currMatchData: {},
      prediction: '',
    }
  },
  beforeMount() {
    this.refresh(undefined)
  },
}
</script>
