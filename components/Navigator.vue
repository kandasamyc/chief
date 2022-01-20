<template>
  <div class="box flex">
    <b-field class="container" custom-class="container" :label="message">
        <b-select required v-model="selectedOption">
            <option v-for="option in options" :value="option" :key="option">{{option}}</option>
        </b-select>
        <b-button tag="nuxt-link" v-bind:to="selectedOption">
            Go
        </b-button>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: '',
    }
  },
  props: ['options','message'],
}
</script>

<style scoped>
.field, .field >>> label {
    width: fit-content;
}
</style>