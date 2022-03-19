<template>
  <div>
    <Navigator :options="matches" message="Pick Match" />
    <div v-if="this.$route.params.key" class="box">
      <p class="is-size-3 has-text-weight-medium has-text-centered">
        {{ this.$route.params.key.toUpperCase() }}
      </p>
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
      <div class="box">
        <AutoChart
          class="mt-2"
          :team_data="team_metrics"
          ref="autoChart"
        />
        <TeleopChart
          class="mt-5"
          :team_data="team_metrics"
          ref="teleopChart"
        />
        <MiscChart
          class="mt-5"
          :team_data="team_metrics"
          ref="miscChart"
        />
        <ZonesChart
          class="mt-5"
          :team_data="team_metrics"
          ref="zonesChart"
        />
        <ClimbChart
          class="mt-5"
          :team_data="team_metrics"
          ref="climbChart"
        />
        <AccuracyChart
          class="mt-5"
          :team_data="team_metrics"
          ref="accuracyChart"
        />
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
    refresh: async function (e) {
      if (this.$route.params.key == undefined) {
        return
      }
      if (e != undefined) {
        e.target.classList.remove('is-success')
        e.target.classList.add('is-loading')
      }
      // Do the fetching
      // For now we'll look up the data
      var data = await fetch('http://localhost:5051/api/get_match_data').then(
        (response) => response.json()
      )
      console.log('2022week0_' + this.$route.params.key)
      var currMatch = data['2022week0_' + this.$route.params.key]['currMatch']
      currMatch['alliances'] = [
        {
          color: 'red',
          teams: currMatch['alliances']['red'].map(function (e) {
            return e
          }),
        },
        {
          color: 'blue',
          teams: currMatch['alliances']['blue'].map(function (e) {
            return e
          }),
        },
      ]
      var currMatchData = data['2022week0_' + this.$route.params.key]['currMatchData']
      this.currMatch = currMatch
      this.currMatchData = currMatchData != undefined ? currMatchData : {}
      this.team_metrics = data['2022week0_' + this.$route.params.key]['team_metrics']
      if (e != undefined) {
        console.log("here")
        if (this.$refs.oddsChart != undefined) this.$refs.oddsChart.getOdds()
        if (this.$refs.teleopChart != undefined) {
          console.log("here2")
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
      matches: [],
      currMatch: {},
      currMatchData: {},
      team_metrics: {},
      prediction: '',
    }
  },
mounted() {
    fetch('http://localhost:5051/api/match_ids', { method: 'GET' })
      .then((res) => res.json())
      .then((data) =>
        data.forEach((match) => {
          this.matches.push(match.substring(match.indexOf("_") +1))
        })
      )
    this.refresh(undefined)
  },
}
</script>
