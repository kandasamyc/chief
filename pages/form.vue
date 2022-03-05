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
          '2022dc305_' +
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
      fetch('https://api.team4099.com/add_team_datum', options)
        .then((res) =>
          document.getElementById('submitButton').classList.toggle('is-loading')
        )
        .then(
          document.getElementById('submitButton').classList.toggle('is-success')
        )
    },
    reset: function (event) {
      this.scoutID = ''
      this.matchType = 'qm'
      this.matchNumber = 0
      this.setNumber = 0
      this.teamNumber = ''
      this.alliance = ''
      this.driverStation = ''

      this.preloadedCargo = false
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

      this.attemptedLow = false
      this.lowClimbTime = 0
      this.attemptedMid = false
      this.midClimbTime = 0
      this.attemptedHigh = false
      this.highClimbTime = 0
      this.attemptedTraversal = false
      this.traversalClimbTime = 0
      this.finalClimbType = '0'

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
        (this.matchType === 'qm' ||
          this.matchType === 'f' ||
          this.setNumber > 0) &&
        this.alliance != '' &&
        this.driverStation != null
      ) {
        console.log(
          this.matchType +
            String(this.matchNumber) +
            (this.matchType != 'qm' ? 'm' + String(this.setNumber) : '')
        )
        try {
          this.teamNumber =
            this.teamsInMatch[
              this.matchType +
                String(this.matchNumber) +
                (this.matchType != 'qm' ? 'm' + String(this.setNumber) : '')
            ][this.alliance][this.driverStation - 1]
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
      setNumber: 0,
      teamNumber: '',
      alliance: '',
      driverStation: '',

      preloadedCargo: false,
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

      lowClimbTime: 0,
      attemptedLow: false,
      midClimbTime: 0,
      attemptedMid: false,
      highClimbTime: 0,
      attemptedHigh: false,
      traversalClimbTime: 0,
      attemptedTraversal: false,
      finalClimbType: '0',

      defenseTime: '',
      notes: '',

      teamsInMatch: {
        qm1: {
          blue: [611, 2900, 888],
          red: [836, 8622, 1895],
        },
        qm2: {
          blue: [2988, 2912, 3793],
          red: [8326, 4099, 612],
        },
        qm3: {
          blue: [2849, 4242, 620],
          red: [5830, 2914, 4505],
        },
        qm4: {
          blue: [611, 8622, 2912],
          red: [2988, 8326, 1895],
        },
        qm5: {
          blue: [2914, 620, 3793],
          red: [888, 4099, 5830],
        },
        qm6: {
          blue: [836, 2849, 2900],
          red: [612, 4242, 4505],
        },
        qm7: {
          blue: [2988, 2914, 888],
          red: [2912, 1895, 620],
        },
        qm8: {
          blue: [612, 888, 8622],
          red: [4242, 2912, 2914],
        },
        qm9: {
          blue: [2849, 4505, 836],
          red: [3793, 611, 8326],
        },
        qm10: {
          blue: [612, 888, 8622],
          red: [4242, 2912, 2914],
        },
        qm11: {
          blue: [620, 888, 836],
          red: [4099, 836, 611],
        },
        qm12: {
          blue: [8326, 2900, 4505],
          red: [3793, 5830, 1895],
        },
        qm13: {
          blue: [611, 2900, 888],
          red: [836, 8622, 1895],
        },
        qm14: {
          blue: [611, 2849, 5830],
          red: [8622, 2900, 3793],
        },
        qm15: {
          blue: [4505, 612, 2988],
          red: [1895, 2914, 8326],
        },
        qm16: {
          blue: [836, 4242, 611],
          red: [612, 3793, 2914],
        },
        qm17: {
          blue: [1895, 2849, 888],
          red: [4099, 5830, 2988],
        },
        qm18: {
          blue: [2912, 4505, 620],
          red: [2900, 8326, 8622],
        },
        qm19: {
          blue: [4099, 3793, 4242],
          red: [2914, 611, 2988],
        },
        qm20: {
          blue: [888, 620, 2900],
          red: [2849, 8622, 8326],
        },
        qm21: {
          blue: [836, 612, 2912],
          red: [1895, 4505, 5830],
        },
        qm22: {
          blue: [2900, 4242, 2914],
          red: [888, 8326, 2988],
        },
        qm23: {
          blue: [4505, 2912, 4099],
          red: [8622, 3793, 2849],
        },
        qm24: {
          blue: [620, 5830, 612],
          red: [1895, 836, 611],
        },
        qm25: {
          blue: [2900, 2912, 2849],
          red: [3793, 2988, 4242],
        },
        qm26: {
          blue: [8622, 1895, 2914],
          red: [5830, 836, 8326],
        },
        qm27: {
          blue: [4505, 612, 611],
          red: [4099, 888, 620],
        },
        qm28: {
          blue: [5830, 2988, 2900],
          red: [2914, 3793, 836],
        },
        qm29: {
          blue: [8622, 4505, 4099],
          red: [4242, 1895, 888],
        },
        qm30: {
          blue: [611, 2849, 612],
          red: [8326, 620, 2912],
        },
        qm31: {
          blue: [2988, 836, 8622],
          red: [3793, 888, 4505],
        },
        qm32: {
          blue: [2849, 2914, 4099],
          red: [2900, 1895, 612],
        },
        qm33: {
          blue: [620, 611, 5830],
          red: [2912, 8326, 4242],
        },
      },
      teamMessage: '',
      teamStatus: '',
      submitMessage: '',
    }
  },
}
</script>
