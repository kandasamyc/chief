<template>
  <div>
    <form v-on:submit.prevent="onSubmit">
      <base-info
        v-bind:scoutID.sync="scoutID"
        v-bind:matchType.sync="matchType"
        v-bind:matchNumber.sync="matchNumber"
        v-bind:teamNumber.sync="teamNumber"
        v-bind:alliance.sync="alliance"
        v-bind:driverStation.sync="driverStation"
      />
      <auto
        v-bind:autoLowGoal.sync="autoLowGoal"
        v-bind:autoHighGoal.sync="autoHighGoal"
        v-bind:autoMisses.sync="autoMisses"
        v-bind:autoNotes.sync="autoNotes"
      />
      <teleop
        v-bind:teleopLowGoal.sync="teleopLowGoal"
        v-bind:teleopHighGoal.sync="teleopHighGoal"
        v-bind:teleopMisses.sync="teleopMisses"
        v-bind:controlPanel.sync="controlPanel"
        v-bind:shootingZones.sync="shootingZones"
        v-bind:teleopNotes.sync="teleopNotes"
      />
      <endgame
        v-bind:climbTime.sync="climbTime"
        v-bind:attemptedPark.sync="attemptedPark"
        v-bind:attemptedHang.sync="attemptedHang"
        v-bind:finalClimbType.sync="finalClimbType"
      />
      <misc v-bind:notes.sync="notes" />

      <b-field>
        <b-button v-on:click="submit" expanded type="is-info">Submit</b-button>
      </b-field>
      <b-field>
        <b-button v-on:click="reset" expanded type="is-danger">Clear</b-button>
      </b-field>
    </form>
  </div>
</template>

<script>
import Auto from '../components/form/Auto.vue'
import BaseInfo from '../components/form/BaseInfo.vue'
import Endgame from '../components/form/Endgame.vue'
import Misc from '../components/form/Misc.vue'
import Teleop from '../components/form/Teleop.vue'
export default {
  components: { BaseInfo, Auto, Teleop, Endgame, Misc },
  methods: {
    submit: async function (event) {
      event.target.classList.toggle('is-loading')
      var data = {
        scout_id: this.scoutID,
        match_key: this.matchType + this.matchNumber,
        team_number: this.teamNumber,
        alliance: this.alliance,
        driver_station: this.driverStation,

        auto_low_goal: this.auto_low_goal,
        auto_high_goal: this.auto_high_goal,
        auto_misses: this.auto_misses,
        auto_notes: this.auto_notes,

        teleop_low_goal: this.teleop_low_goal,
        teleop_high_goal: this.teleop_high_goal,
        teleop_misses: this.teleop_misses,
        control_panel: this.control_panel,
        shooting_zones: this.shootingZones,
        teleop_notes: this.teleopNotes,

        'climb-time': this.climbTime,
        attempted_park: this.attemptedPark,
        attempted_hang: this.attemptedHang,
        final_climb_type: this.finalClimbType,
      }

      console.log(data);
      event.target.classList.toggle('is-loading')
      event.target.classList.toggle('is-success')
    },
    reset: function (event) {
      window.location.replace(window.location.pathname + window.location.search + window.location.hash);
    }
  },
  data() {
    return {
      autoLowGoal: 0,
      autoHighGoal: 0,
      autoMisses: 0,
      autoNotes: '',
      scoutID: '',
      matchType: 'qm',
      matchNumber: 0,
      teamNumber: '',
      alliance: '',
      driverStation: '',
      teleopLowGoal: 0,
      teleopHighGoal: 0,
      teleopMisses: 0,
      controlPanel: 0,
      shootingZones: Array(),
      teleopNotes: '',
      climbTime: 0,
      attemptedPark: false,
      attemptedHang: false,
      finalClimbType: '',
      notes: '',
    }
  },
}
</script>