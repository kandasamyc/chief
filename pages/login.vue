<template>
  <form v-on:submit.prevent="validate">
    <div class="box">
      <b-field label="Username">
        <b-input
          required
          type="text"
          :value="name"
          @input="changeName"
        ></b-input>
      </b-field>
      <b-field v-bind:message="submitMessage">
        <input
          id="submitButton"
          type="submit"
          class="button is-primary is-fullwidth"
          v-bind:class="validityClass"
        />
      </b-field>
    </div>
  </form>
</template>

<script>
export default {
  mounted() {
    fetch("https://api.team4099.com/api/get_all_scouts", {method:"GET"})
    .then(res => res.json())
    .then(data => Object.keys(data).forEach(scout => {
      this.validNames.push(scout)
    }))
  },
  computed: {
    name() {
      return this.$store.state.login.name
    },
    validity() {
      return this.$store.state.login.validity
    },
    validityClass() {
      return this.validity ? 'is-success' : 'is-danger'
    },
  },
  methods: {
    changeName: function (newName) {
      this.submitMessage = ''

      this.$store.commit('login/changeName', newName.toLowerCase())
    },
    validate: function () {
      document.getElementById('submitButton').classList.add('is-loading')
      var valid = this.validNames.indexOf(this.name) !== -1
      document.getElementById('submitButton').classList.remove('is-loading')
      if (valid) {
        this.$store.commit('login/changeValidity', true)
      } else {
        this.submitMessage = 'Scout ID is invalid.'
        this.$store.commit('login/changeValidity', false)
      }
    },
  },
  data() {
    return {
      scoutID: name,
      submitMessage: '',
      validNames: []
    }
  },
}
</script>
