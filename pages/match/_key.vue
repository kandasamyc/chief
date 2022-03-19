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
    </div>
    <template v-else-if="this.$route.params.key">
    </template>
  </div>
</template>

<script>
import Navigator from '../../components/Navigator.vue'
import OddsChart from '../../components/match/oddsChart.vue'

export default {
  components: {
    Navigator,
    OddsChart
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
      var data = await fetch('https://api.team4099.com/api/get_match_data').then(
        (response) => response.json()
      )
      console.log(data['2022week0_' + this.$route.params.key])
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
      if (e != undefined) {
        console.log("here")
        if (this.$refs.oddsChart != undefined) this.$refs.oddsChart.getOdds()
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
      currMatchData:{},
      team_metrics: {},
      prediction: '',
    }
  },
mounted() {
    fetch('https://api.team4099.com/api/occurred_match_ids', { method: 'GET' })
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
