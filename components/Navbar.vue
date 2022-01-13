<template>
  <b-navbar type="is-dark" :fixed-top=true :centered=true>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <strong>Chief</strong>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item v-for="(item, key) of items" :key="key" tag="div">
        <NuxtLink :to="item.to" class="has-text-primary has-text-weight-medium">
          {{ item.title }}
        </NuxtLink>
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <NuxtLink to="/login" class="button is-success">
            <strong>Log in</strong>
          </NuxtLink>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Dashboard',
          to: { name: 'index' },
        },
        {
          title: 'Form',
          to: { name: 'form' },
        },
        {
          title: 'Teams',
          to: { name: 'team' },
        },
        {
          title: 'Match',
          to: { name: 'match' },
        },
        {
          title: 'Scouts',
          to: { name: 'scouts' },
        },
      ],
    }
  },
}
</script>