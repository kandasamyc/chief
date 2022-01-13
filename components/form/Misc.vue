<template>
  <div class="box">
    <p class="has-text-centered is-size-4 mb-4 has-text-dark">Miscellaneous</p>
    <b-field label="Notes">
      <b-input
        maxlength="300"
        type="textarea"
        v-bind:notes="notes"
        v-on:notes="$emit('update:notes', $event)"
      ></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  props: ['notes'],
}
</script>