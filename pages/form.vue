<template>
  <form v-on:submit.prevent="submit">
    <div class="box">
      <p class="has-text-centered is-size-4 mb-4 has-text-dark">Info</p>
      <b-field
        v-bind:type="validityClass"
        v-bind:message="validityMessage"
        label="Scout ID"
      >
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
      <b-field label="Preloaded Cargo">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="preloadCargo"
        ></b-numberinput>
      </b-field>
      <b-field label="Auto Low Hub">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="autoLowHub"
        ></b-numberinput>
      </b-field>
      <b-field label="Auto Upper Hub">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="autoUpperHub"
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
      <b-field label="Scored by HP">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="autoHumanScore"
        ></b-numberinput>
      </b-field>
      <b-field label="Missed by HP">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="autoHumanMiss"
        ></b-numberinput>
      </b-field>
      <b-field label="Taxied?">
        <b-checkbox-button :native-value="true" v-model="taxied" expanded>
          Yes
        </b-checkbox-button>
      </b-field>
      <b-field label="Auto Shooting Zones" grouped>
        <b-select v-model="autoShootingZones" multiple expanded>
          <option value="0">Fender</option>
          <option value="1">Elsewhere in Tarmac</option>
          <option value="2">Launchpad</option>
          <option value="3">Terminal</option>
          <option value="4">Hangar Zone</option>
          <option value="5">Elsewhere</option>
        </b-select>
      </b-field>
      <b-field label="Auto Notes">
        <b-input type="textarea" maxlength="300" v-model="autoNotes"></b-input>
      </b-field>
    </div>
    <div class="box">
      <p class="has-text-centered is-size-4 mb-4 has-text-dark">Teleop</p>
      <b-field label="Teleop Low Hub">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="teleopLowHub"
        ></b-numberinput>
      </b-field>
      <b-field label="Teleop Upper Hub">
        <b-numberinput
          type="is-info"
          expanded
          size="is-large"
          placeholder="0"
          min="0"
          v-model="teleopUpperHub"
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
      <b-field label="Shooting Zones" grouped>
        <b-select v-model="shootingZones" multiple expanded>
          <option value="0">Fender</option>
          <option value="1">Elsewhere in Tarmac</option>
          <option value="2">Launchpad</option>
          <option value="3">Terminal</option>
          <option value="4">Hangar Zone</option>
          <option value="5">Elsewhere</option>
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
        <b-checkbox-button :native-value="true" v-model="attemptedLow" expanded>
          Low
        </b-checkbox-button>

        <b-checkbox-button :native-value="true" v-model="attemptedMid" expanded>
          Mid
        </b-checkbox-button>
        <b-checkbox-button :native-value="true" v-model="attemptedHigh" expanded>
          High
        </b-checkbox-button>
        <b-checkbox-button :native-value="true" v-model="attemptedTraversal" expanded>
          Traversal
        </b-checkbox-button>
      </b-field>
      <b-field label="Final Climb Type">
        <b-select v-model="finalClimbType" expanded>
          <option value="0">No Climb</option>
          <option value="1">Low</option>
          <option value="2">Mid</option>
          <option value="3">High</option>
          <option value="4">Traversal</option>
        </b-select>
      </b-field>
    </div>
    <div class="box">
      <p class="has-text-centered is-size-4 mb-4 has-text-dark">
        Miscellaneous
      </p>
      <b-field label="How much do they play defense?">
        <b-select v-model="defenseTime" expanded>
          <option value="0">Never</option>
          <option value="1">Sometimes</option>
          <option value="2">Most of the time</option>
          <option value="3">All if the time</option>
        </b-select>
      </b-field>
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

        preload_cargo: this.preloadCargo,
        auto_low_hub: this.autoLowHub,
        auto_upper_hub: this.autoUpperHub,
        auto_misses: this.autoMisses,
        auto_human_score: this.autoHumanScore,
        auto_human_misses: this.autoHumanMiss,
        taxied: this.taxied,
        auto_shooting_zones: this.autoShootingZones,
        auto_notes: this.autoNotes,

        teleop_low_hub: this.teleopLowHub,
        teleop_upper_hub: this.teleopUpperHub,
        teleop_misses: this.teleopMisses,
        shooting_zones: this.shootingZones,
        teleop_notes: this.teleopNotes,

        climb_time: this.climbTime,
        attempted_low: this.attemptedLow,
        attemped_mid: this.attemptedMid,
        attempted_high: this.attemptedHigh,
        attempted_traversal: this.attemptedTraversal,
        final_climb_type: this.finalClimbType,

        defense_time: this.defenseTime,
        notes: this.notes,
      }

      console.log(data)

      document.getElementById('submitButton').classList.toggle('is-loading')
      document.getElementById('submitButton').classList.toggle('is-success')
    },
    reset: function (event) {
      this.scoutID = ''
      this.matchType = 'qm'
      this.matchNumber = 0
      this.teamNumber = ''
      this.alliance = ''
      this.driverStation = ''

      this.preloadCargo = 0
      this.autoLowHub = 0
      this.autoUpperHub = 0
      this.autoMisses = 0
      this.autoHumanScore = 0
      this.autoHumanMiss = 0
      this.taxied = 0
      this.autoShootingZones = 0
      this.autoNotes = ''

      this.teleopLowHub = 0
      this.teleopUpperHub = 0
      this.teleopMisses = 0
      this.shootingZones = []
      this.teleopNotes = ''

      this.climbTime = 0
      this.attemptedLow = false
      this.attemptedMid = false
      this.attemptedHigh = false
      this.attemptedTraversal = false
      this.finalClimbType = ''

      this.defense_time = ''
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
      scoutID: '',
      matchType: 'qm',
      matchNumber: 0,
      teamNumber: '',
      alliance: '',
      driverStation: '',

      preloadCargo: 0,
      autoLowHub: 0,
      autoUpperHub: 0,
      autoMisses: 0,
      autoHumanScore: 0,
      autoHumanMiss: 0,
      taxied: false,
      autoShootingZones: [],
      autoNotes: '',

      teleopLowHub: 0,
      teleopUpperHub: 0,
      teleopMisses: 0,
      shootingZones: [],
      teleopNotes: '',

      climbTime: 0,
      attemptedLow: false,
      attemptedMid: false,
      attemptedHigh: false,
      attemptedTraversal: false,
      finalClimbType: '',

      defenseTime: '',
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
