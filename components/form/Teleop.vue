<template>
  <div class="box">
    <p class="has-text-centered is-size-4 mb-4 has-text-dark">Teleop</p>
    <b-field label="Teleop Low Goal">
      <b-numberinput
        expanded
        size="is-large"
        placeholder="0"
        min="0"
        type="is-info"
        v-bind:teleopLowGoal="teleopLowGoal"
        v-on:input="$emit('update:teleopLowGoal', $event)"
      ></b-numberinput>
    </b-field>
    <b-field label="Teleop High Goal">
      <b-numberinput
        expanded
        size="is-large"
        placeholder="0"
        min="0"
        type="is-info"
        v-bind:teleopHighGoal="teleopHighGoal"
        v-on:input="$emit('update:teleopHighGoal', $event)"
      ></b-numberinput>
    </b-field>
    <b-field label="Teleop Misses">
      <b-numberinput
        expanded
        size="is-large"
        placeholder="0"
        min="0"
        type="is-info"
        v-bind:teleopMisses="teleopMisses"
        v-on:input="$emit('update:teleopMisses', $event)"
      ></b-numberinput>
    </b-field>
    <b-field label="Control Panel" grouped>
      <b-select
        v-bind:controlPanel="controlPanel"
        v-on:input="$emit('update:controlPanel', $event)"
        expanded
      >
        <option value="0">Did not use</option>
        <option value="1">Level 1 Completed</option>
        <option value="2">Level 2 Completed</option>
      </b-select>
    </b-field>
    <b-field label="Shooting Zones" grouped>
      <b-select
        v-bind:shootingZones="shootingZones"
        v-on:input="$emit('update:shootingZones', $event)"
        multiple
        expanded
      >
        <option value="0">Far Trench</option>
        <option value="1">Near Trench</option>
        <option value="2">Target Zone</option>
        <option value="3">Initiation Line</option>
        <option value="4">Rendezvous Point</option>
      </b-select>
    </b-field>
    <b-field label="Teleop Notes">
      <b-input
        maxlength="300"
        type="textarea"
        v-bind:teleopNotes="teleopNotes"
        v-on:input="$emit('update:teleopNotes', $event)"
      ></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  props: ['teleopLowGoal', 'teleopHighGoal', 'teleopMisses', 'controlPanel', 'shootingZones', 'teleopNotes']
}
</script>