<template>
  <form v-on:submit.prevent="submit">
    <div class="box">
      <p class="has-text-centered is-size-4 mb-4 has-text-dark">Info</p>
      <b-field v-bind:type="validityClass" v-bind:message="validityMessage" label="Scout ID">
        <b-input v-bind:value="name" disabled required></b-input>
      </b-field>
      <b-field label="Match Key" grouped>
        <b-select required v-on:input="autocompleteTeam" v-model="matchType">
          <option value="qm">qm</option>
          <option value="qf">qf</option>
          <option value="sf">sf</option>
          <option value="f">f</option>
        </b-select>
        <b-numberinput
          expanded
          :controls="false"
          v-model="matchNumber"
          v-on:input="autocompleteTeam"
          required
        ></b-numberinput>
      </b-field>
      <b-field label="Alliance" grouped>
        <b-select
          v-on:input="autocompleteTeam"
          v-model="alliance"
          required
          expanded
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </b-select>
      </b-field>
      <b-field label="Driver Station" grouped>
        <b-select
          v-on:input="autocompleteTeam"
          v-model="driverStation"
          required
          expanded
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </b-select>
      </b-field>
      <b-field
        v-bind:message="teamMessage"
        v-bind:type="teamStatus"
        label="Team Number"
      >
        <b-input
          disabled
          custom-class="has-text-grey"
          v-model="teamNumber"
        ></b-input>
      </b-field>
    </div>
    <div class="box">
      <p class="has-text-centered is-size-4 mb-4 has-text-dark">Auto</p>
      <b-field label="Auto Low Goal">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="autoLowGoal"
        ></b-numberinput>
      </b-field>
      <b-field label="Auto High Goal">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="autoHighGoal"
        ></b-numberinput>
      </b-field>
      <b-field label="Auto Misses">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="autoMisses"
        ></b-numberinput>
      </b-field>
      <b-field label="Auto Notes">
        <b-input type="textarea" maxlength="300" v-model="autoNotes"></b-input>
      </b-field>
    </div>
    <div class="box">
      <p class="has-text-centered is-size-4 mb-4 has-text-dark">Teleop</p>
      <b-field label="Teleop Low Goal">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="teleopLowGoal"
        ></b-numberinput>
      </b-field>
      <b-field label="Teleop High Goal">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="teleopHighGoal"
        ></b-numberinput>
      </b-field>
      <b-field label="Teleop Misses">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="teleopMisses"
        ></b-numberinput>
      </b-field>
      <b-field label="Control Panel" grouped>
        <b-select v-model="controlPanel" expanded>
          <option value="0">Did not use</option>
          <option value="1">Level 1 Completed</option>
          <option value="2">Level 2 Completed</option>
        </b-select>
      </b-field>
      <b-field label="Shooting Zones" grouped>
        <b-select v-model="shootingZones" multiple expanded>
          <option value="0">Far Trench</option>
          <option value="1">Near Trench</option>
          <option value="2">Target Zone</option>
          <option value="3">Initiation Line</option>
          <option value="4">Rendezvous Point</option>
        </b-select>
      </b-field>
      <b-field label="Teleop Notes">
        <b-input
          type="textarea"
          maxlength="300"
          v-model="teleopNotes"
        ></b-input>
      </b-field>
    </div>
    <div class="box">
      <p class="has-text-centered is-size-4 mb-4 has-text-dark">Endgame</p>
      <b-field label="Endgame Climb Time">
        <b-slider
          v-model="climbTime"
          label="medium"
          indicator
          ticks
          :tooltip="false"
          :min="1"
          :max="6"
        >
        </b-slider>
      </b-field>
      <b-field label="Attempted Climb?">
        <b-checkbox class="is-medium" v-model="attemptedPark" expanded>
          Park
        </b-checkbox>

        <b-checkbox class="is-medium" v-model="attemptedHang" expanded>
          Hang
        </b-checkbox>
      </b-field>
      <b-field label="Final Climb Type">
        <b-select v-model="finalClimbType" expanded>
          <option value="0">No Climb</option>
          <option value="1">Park</option>
          <option value="2">Hang</option>
        </b-select>
      </b-field>
    </div>
    <div class="box">
      <p class="has-text-centered is-size-4 mb-4 has-text-dark">
        Miscellaneous
      </p>
      <b-field label="Notes">
        <b-input type="textarea" maxlength="300" v-model="notes"></b-input>
      </b-field>
    </div>

    <b-field v-bind:message="submitMessage">
      <input
        id="submitButton"
        type="submit"
        class="button is-primary is-fullwidth"
      />
    </b-field>
    <b-field>
      <b-button id="resetButton" type="is-danger" v-on:click="reset" expanded
        >Clear</b-button
      >
    </b-field>
  </form>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$store.state.login.name
    },
    validity() {
      return this.$store.state.login.validity
    },
    validityClass() {
      return this.$store.state.login.validity ? 'is-success' : 'is-danger'
    },
    validityMessage() {
      return this.$store.state.login.validity ? '' : 'No Scout ID given.'
    },
  },
  components: {},
  methods: {
    submit: function (event) {
      if (this.teamNumber == '') {
        document.getElementById('submitButton').classList.add('is-danger')
        this.submitMessage = 'Team Number is not valid.'
        return
      }
      if (!this.validity) {
        document.getElementById('submitButton').classList.add('is-danger')
        this.submitMessage = 'Scout ID is not valid.'
        return
      }
      document.getElementById('submitButton').classList.remove('is-danger')
      this.submitMessage = ''
      document.getElementById('submitButton').classList.toggle('is-loading')
      var data = {
        scout_id: this.scoutID,
        match_key: this.matchType + this.matchNumber,
        team_number: this.teamNumber,
        alliance: this.alliance,
        driver_station: this.driverStation,

        auto_low_goal: this.autoLowGoal,
        auto_high_goal: this.autoHighGoal,
        auto_misses: this.autoMisses,
        auto_notes: this.autoNotes,

        teleop_low_goal: this.teleopLowGoal,
        teleop_high_goal: this.teleopHighGoal,
        teleop_misses: this.teleopMisses,
        control_panel: this.controlPanel,
        shooting_zones: this.shootingZones,
        teleop_notes: this.teleopNotes,

        climb_time: this.climbTime,
        attempted_park: this.attemptedPark,
        attempted_hang: this.attemptedHang,
        final_climb_type: this.finalClimbType,
      }

      console.log(data)
      document.getElementById('submitButton').classList.toggle('is-loading')
      document.getElementById('submitButton').classList.toggle('is-success')
    },
    reset: function (event) {
      this.autoLowGoal = 0
      this.autoHighGoal = 0
      this.autoMisses = 0
      this.autoNotes = ''
      this.scoutID = ''
      this.matchType = 'qm'
      this.matchNumber = 0
      this.teamNumber = ''
      this.alliance = ''
      this.driverStation = ''
      this.teleopLowGoal = 0
      this.teleopHighGoal = 0
      this.teleopMisses = 0
      this.controlPanel = 0
      this.shootingZones = []
      this.teleopNotes = ''
      this.climbTime = 0
      this.attemptedPark = false
      this.attemptedHang = false
      this.finalClimbType = ''
      this.notes = ''
      document.getElementById('submitButton').classList.remove('is-success')
      document.getElementById('submitButton').classList.remove('is-danger')
      this.submitMessage = ''
    },
    autocompleteTeam: function (event) {
      if (
        this.matchType != null &&
        this.matchNumber > 0 &&
        this.alliance != '' &&
        this.driverStation != null
      ) {
        try {
          this.teamNumber =
            this.teamsInMatch[this.matchType + String(this.matchNumber)][
              this.alliance
            ][this.driverStation - 1]
          this.teamStatus = ''
          this.teamMessage = ''
        } catch (error) {
          this.teamNumber = ''
          this.teamStatus = 'is-danger'
          this.teamMessage = 'No such team for the given parameters'
        }
      } else {
        this.teamNumber = ''
      }
    },
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
      shootingZones: [],
      teleopNotes: '',
      climbTime: 0,
      attemptedPark: false,
      attemptedHang: false,
      finalClimbType: '',
      notes: '',
      teamsInMatch: {
        qm1: {
          red: ['4099', '2363', '614'],
          blue: ['449', '613', '612'],
        },
      },
      teamMessage: '',
      teamStatus: '',
      submitMessage: '',
    }
  },
}
</script>
