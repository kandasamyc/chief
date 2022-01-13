<template>
  <div class="box">
    <p class="has-text-centered is-size-4 mb-4 has-text-dark">Info</p>
    <b-field label="Scout ID">
      <b-input
        type="text"
        v-bind:scoutID="scoutID"
        v-on:input="$emit('update:scoutID', $event)"
      ></b-input>
    </b-field>
    <b-field label="Match Key" grouped>
      <b-select
        v-bind:matchType="matchType"
        v-on:input="$emit('update:matchType', $event)"
      >
        <option value="qm">qm</option>
        <option value="qf">qf</option>
        <option value="sf">sf</option>
        <option value="f">f</option>
      </b-select>
      <b-numberinput
        expanded
        :controls="false"
        v-bind:matchNumber="matchNumber"
        v-on:input="$emit('update:matchNumber', $event)"
      ></b-numberinput>
    </b-field>
    <b-field label="Team Number">
      <b-input
        v-bind:teamNumber="teamNumber"
        v-on:input="$emit('update:teamNumber', $event)"
      ></b-input>
    </b-field>
    <b-field label="Alliance" grouped>
      <b-select
        v-bind:alliance="alliance"
        v-on:input="$emit('update:alliance', $event)"
        expanded
      >
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </b-select>
    </b-field>
    <b-field label="Driver Station" grouped>
      <b-select
        v-bind:driverStation="driverStation"
        v-on:input="$emit('update:driverStation', $event)"
        expanded
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['scoutID', 'matchType', 'matchNumber', 'teamNumber', 'alliance', 'driverStation'],
}
</script>
