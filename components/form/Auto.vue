<template>
  <div class="box">
    <p class="has-text-centered is-size-4 mb-4 has-text-dark">Auto</p>
    <b-field label="Auto Low Goal">
      <b-numberinput
        expanded
        size="is-large"
        placeholder="0"
        min="0"
        type="is-info"
        v-bind:autoLowGoal="autoLowGoal"
        v-on:input="$emit('update:autoLowGoal', $event)"
      ></b-numberinput>
    </b-field>
    <b-field label="Auto High Goal">
      <b-numberinput
        expanded
        size="is-large"
        placeholder="0"
        min="0"
        type="is-info"
        v-bind:autoHighGoal="autoHighGoal"
        v-on:input="$emit('update:autoHighGoal', $event)"
      ></b-numberinput>
    </b-field>
    <b-field label="Auto Misses">
      <b-numberinput
        expanded
        size="is-large"
        placeholder="0"
        min="0"
        type="is-info"
        v-bind:autoMisses="autoMisses"
        v-on:input="$emit('update:autoMisses', $event)"
      ></b-numberinput>
    </b-field>
    <b-field label="Auto Notes">
      <b-input
        maxlength="300"
        type="textarea"
        v-bind:autoNotes="autoNotes"
        v-on:input="$emit('update:autoNotes', $event)"
      ></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['autoLowGoal', 'autoHighGoal', 'autoMisses', 'autoNotes'],
}
</script>