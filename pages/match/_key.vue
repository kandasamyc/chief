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
    <div v-if="this.$route.params.key && Object.entries(this.currMatchData).length > 0" class="box">
        Occurred
    </div>
    <div v-else class="box">
        Planned
    </div>
  </div>
</template>

<script>
import Navigator from '../../components/Navigator.vue'
export default {
  components: { Navigator },
  computed: {
    timeLabel: function () {
      if (Object.entries(this.currMatch).length == 0){
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
      if (this.$route.params.key == undefined){
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
        e.target.classList.remove('is-loading')
        e.target.classList.add('is-success')
      }
      console.log("hello")
    },
  },
  data() {
    return {
      matches: ['qm1', 'qm2'],
      currMatch: {

      },
      currMatchData: {
      },
    }
  },
  mounted() {
    this.refresh(undefined)
  },
}
</script>
