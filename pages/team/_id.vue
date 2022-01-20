<template>
  <div>
    <Navigator :options="teams" message="Pick Team" />
    <div class="box">
        <h2 class="title has-text-centered">{{ this.$route.params.id }}</h2>
    </div>
  </div>
</template>

<script>
import Navigator from '../../components/Navigator.vue'
export default {
  components: { Navigator },
  data() {
    return {
      teams: ['4099', '449'],
    }
  },
}
</script>
