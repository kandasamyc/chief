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
        <template v-if="this.matchType != 'qm' && this.matchType != 'f'">
          <b-numberinput
            expanded
            :controls="false"
            v-model="setNumber"
            v-on:input="autocompleteTeam"
            required
          ></b-numberinput>
        </template>
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
      <b-field label="Preloaded Cargo?">
        <b-checkbox-button
          :native-value="true"
          v-model="preloadedCargo"
          expanded
        >
          Yes
        </b-checkbox-button>
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
          <option value="6">Opponent Tarmac</option>
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
          <option value="6">Opponent Tarmac</option>
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
      <b-field label="Low Climb">
        <b-checkbox :native-value="true" v-model="attemptedLow"> </b-checkbox>
        <b-slider
          v-model="lowClimbTime"
          label="medium"
          indicator
          ticks
          grouped
          :disabled="!attemptedLow"
          :tooltip="false"
          :min="0"
          :max="6"
        >
        </b-slider>
      </b-field>
      <b-field label="Mid Climb">
        <b-checkbox :native-value="true" v-model="attemptedMid"> </b-checkbox>
        <b-slider
          v-model="midClimbTime"
          label="medium"
          indicator
          ticks
          grouped
          :disabled="!attemptedMid"
          :tooltip="false"
          :min="0"
          :max="6"
        >
        </b-slider>
      </b-field>
      <b-field label="High Climb">
        <b-checkbox :native-value="true" v-model="attemptedHigh"> </b-checkbox>
        <b-slider
          v-model="highClimbTime"
          label="medium"
          indicator
          ticks
          grouped
          :disabled="!attemptedHigh"
          :tooltip="false"
          :min="0"
          :max="6"
        >
        </b-slider>
      </b-field>
      <b-field label="Traversal Climb">
        <b-checkbox :native-value="true" v-model="attemptedTraversal">
        </b-checkbox>
        <b-slider
          v-model="traversalClimbTime"
          label="medium"
          indicator
          ticks
          grouped
          :disabled="!attemptedTraversal"
          :tooltip="false"
          :min="0"
          :max="6"
        >
        </b-slider>
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
          <option value="3">All of the time</option>
        </b-select>
      </b-field>
      <b-field label="How well do they drive?">
        <b-select v-model="driverRating" expanded>
          <option value="0">Very Poor</option>
          <option value="1">Poor</option>
          <option value="2">Average</option>
          <option value="3">Good</option>
          <option value="4">Very Good</option>
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
        scout_id: name,
        match_key:
          '2022week0_' +
          this.matchType +
          this.matchNumber +
          (this.matchType != 'qm' && this.matchType != 'f'
            ? 'm' + this.setNumber
            : ''),
        team_number: 'frc' + this.teamNumber,
        alliance: this.alliance,
        driver_station: this.driverStation,

        preloaded_cargo: this.preloadedCargo,
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

        attempted_low: this.attemptedLow,
        low_climb_time: this.lowClimbTime,
        attemped_mid: this.attemptedMid,
        mid_climb_time: this.midClimbTime,
        attempted_high: this.attemptedHigh,
        high_climb_time: this.highClimbTime,
        attempted_traversal: this.attemptedTraversal,
        traversal_climb_time: this.traversalClimbTime,
        final_climb_type: this.finalClimbType,

        defense_time: this.defenseTime,
        driver_rating: this.driverRating,
        notes: this.notes,
      }

      console.log(data)

      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }

      // send POST request
      fetch('https://localhost:5051/add_team_datum', options)
        .then((res) =>
          document.getElementById('submitButton').classList.toggle('is-loading')
        )
        .then(
          document.getElementById('submitButton').classList.toggle('is-success')
        )
    },
    reset: function (event) {

      document.getElementById('submitButton').classList.remove('is-success')
      document.getElementById('submitButton').classList.remove('is-danger')
      this.submitMessage = ''
    },
    
  },
  mounted(){
    fetch('http://localhost:5051/api/team_ids', {method:"GET"})
        .then(res => res.json())
        .then((data) =>
          this.teamIds = data
        )
        
  },
  data() {
    return {
      teamNumber: '',
      programming_language:'',
      num_of_batteries:0,
      robot_info:"",
      rung_info:[],
      other_info:"",

      teamIds: [],
      teamMessage: '',
      teamStatus: '',
      submitMessage: '',
    }
  },
}
</script>
