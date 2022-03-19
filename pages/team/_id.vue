<template>
  <div>
    <Navigator :options="teams" message="Pick Team" />
    <div class="box" v-if="this.$route.params.id">
      <h2 class="title has-text-centered">{{ this.$route.params.id }}</h2>
      <b-button class="is-fullwidth mb-4" type="is-info" v-on:click="refresh"
        >Refresh</b-button
      >
      <hr />
      <p class="has-text-centered is-size-5 mb-2">Next Matches</p>

      <table class="table is-fullwidth is-bordered">
        <tbody>
          <tr v-for="match in currTeamData.next_matches" :key="match.key">
            <td class="has-text-centered">
              <NuxtLink :to="'/match/' + match.key">{{
                match.key.toUpperCase()
              }}</NuxtLink>
            </td>
            <td class="has-text-centered">
              {{
                new Date(match.time).toLocaleString(undefined, {
                  timeStyle: 'short',
                }) +
                (new Date(match.time).getDate() == new Date().getDate()
                  ? ''
                  : ', ' +
                    new Intl.DateTimeFormat('en-US', {
                      weekday: 'short',
                    }).format(new Date(match.time)))
              }}
            </td>
            <td class="has-text-centered">{{ timeUntil(match.time) }}</td>
          </tr>
        </tbody>
      </table>
      <AutoChart class="mt-5" :team_data="currTeamData" ref="autoChart" />
      <TeleopChart class="mt-5" :team_data="currTeamData" ref="teleopChart" />
      <MiscChart class="mt-5" :team_data="currTeamData" ref="miscChart" />
      <ClimbChart class="mt-5" :team_data="currTeamData" ref="climbChart" />
      <AccuracyChart
        class="mt-5"
        :team_data="currTeamData"
        ref="accuracyChart"
      />
      <ZonesChart class="mt-5" :team_data="currTeamData" ref="zonesChart" />
      <AttemptedClimbChart class="mt-5" :team_data="currTeamData" ref="attemptedClimbChart"/>
            <ClimbTimeChart class="mt-5" :team_data="currTeamData" ref="climbTimeChart"/>

     </div>
  </div>
</template>

<script>
import AutoChart from '../../components/team/autoChart.vue'
import TeleopChart from '../../components/team/teleopChart.vue'
import MiscChart from '../../components/team/miscChart.vue'
import ClimbChart from '../../components/team/climbChart.vue'
import Navigator from '../../components/Navigator.vue'
import AccuracyChart from '../../components/team/accuracyChart.vue'
import ZonesChart from '../../components/team/zonesChart.vue'
import AttemptedClimbChart from '../../components/team/attemptedClimbChart.vue'
import ClimbTimeChart from '../../components/team/climbTimeChart.vue'

export default {
  components: {
    Navigator,
    AccuracyChart,
    ZonesChart,
    AutoChart,
    TeleopChart,
    MiscChart,
    ClimbChart,
    AttemptedClimbChart,
    ClimbTimeChart
  },
  methods: {
    refresh: function (e) {
      if (this.$route.params.id == undefined) {
        return
      }
      if (e != undefined) {
        e.target.classList.remove('is-success')
        e.target.classList.add('is-loading')
      }
      // Do the fetching
      // For now we'll look up the data
      var allData = {
        4099: {
          accuracy: { high: 0.097, low: 0.751, miss: 0.153 },
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
          next_matches: [
            {
              key: 'qm2',
              time: '2022-02-06T15:20:00-05:00',
            },
            {
              key: 'qm5',
              time: '2022-02-06T17:45:00-05:00',
            },
          ],
        },
        449: {
          accuracy: { high: 0.65, low: 0.093, miss: 0.256 },
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
          next_matches: [
            {
              key: 'qm1',
              time: '2022-02-06T15:15:00-05:00',
            },
            {
              key: 'qm10',
              time: '2022-02-06T17:15:00-05:00',
            },
          ],
        },
      }

      // this.currTeamData = allData[this.$route.params.id]
      fetch('http://localhost:5051/api/teamdatum/' + this.$route.params.id, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => (this.currTeamData = data[Object.keys(data)[0]]))
        .then((test) => {
          if (this.$refs.oddsChart != undefined) this.$refs.oddsChart.getOdds()
          if (this.$refs.teleopChart != undefined) {
            this.$refs.autoChart.getData()
            this.$refs.teleopChart.getData()
            this.$refs.miscChart.getData()
            this.$refs.zonesChart.getData()
            this.$refs.accuracyChart.getData()
            this.$refs.climbChart.getData()
            this.$refs.attemptedClimbChart.getData()
            this.$refs.climbTimeChart.getData()
          }

          if (e != undefined) {
            e.target.classList.remove('is-loading')
            e.target.classList.add('is-success')
          }
        })
    },
    timeUntil: function (date) {
      // Utility to add leading zero
      function z(n) {
        return (n < 10 ? '0' : '') + n
      }

      // Convert string to date object
      var d = new Date(date)
      var diff = d - new Date()

      // Allow for previous times
      var sign = diff < 0 ? '-' : ''
      diff = Math.abs(diff)

      // Get time components
      var hours = (diff / 3.6e6) | 0
      var mins = ((diff % 3.6e6) / 6e4) | 0
      var secs = Math.round((diff % 6e4) / 1e3)

      // Return formatted string
      return sign + z(hours) + ':' + z(mins) + ':' + z(secs)
    },
  },
  data() {
    return {
      teams: [],
      currTeamData: {
        accuracy: {},
        auto: {},
        climb: {},
        misc: {},
        teleop: {},
        zones: {},
        attempted_climbs:{},
        climb_time:{}
      },
    }
  },
  mounted() {
    fetch('http://localhost:5051/api/team_ids', { method: 'GET' })
      .then((res) => res.json())
      .then((data) =>
        data.forEach((team) => {
          this.teams.push(team)
        })
      )
    this.refresh(undefined)
  },
}
</script>
