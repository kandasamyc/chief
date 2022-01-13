<template>
  <div class="box">
    <p class="has-text-centered is-size-4 mb-4 has-text-dark">Endgame</p>
    <b-field label="Endgame Climb Time">
      <b-slider
        v-bind:climbTime="climbTime"
        v-on:input="$emit('update:climbTime', $event)"
        indicator
        ticks
        :tooltip="false"
        :min="1"
        :max="6"
      ></b-slider>
    </b-field>
    <b-field label="Attempted Climb?">
      <b-checkbox-button
        v-bind:attemptedPark="attemptedPark"
        v-on:input="$emit('update:attemptedPark', $event)"
        expanded
      >
        Attempted Park?
      </b-checkbox-button>

      <b-checkbox-button
        v-bind:attemptedHang="attemptedHang"
        v-on:input="$emit('update:attemptedHang', $event)"
        expanded
      >
        Attempted Hang?
      </b-checkbox-button>
    </b-field>
    <b-field label="Final Climb Type">
      <b-select
        v-bind:finalClimbType="finalClimbType"
        v-on:input="$emit('update:finalClimbType', $event)"
        expanded
      >
        <option value="0">No Climb</option>
        <option value="1">Park</option>
        <option value="2">Hang</option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
export default {
  props: ['climbTime', 'attemptedPark', 'attemptedHang', 'finalClimbType']
}
</script>