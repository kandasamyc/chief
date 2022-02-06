<template>
  <b-navbar type="is-dark" :fixed-top="true" :centered="true">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <strong>Chief</strong>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="div">
        <NuxtLink to="/" class="has-text-primary has-text-weight-medium">
          Dashboard
        </NuxtLink>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <NuxtLink to="/form" class="has-text-primary has-text-weight-medium">
          Form
        </NuxtLink>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <NuxtLink to="/match/" class="has-text-primary has-text-weight-medium">
          Matches
        </NuxtLink>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <NuxtLink to="/team/" class="has-text-primary has-text-weight-medium">
          Teams
        </NuxtLink>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <NuxtLink to="/scouts" class="has-text-primary has-text-weight-medium">
          Scouts
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
          to: { name: 'match/_key' },
        },
        {
          title: 'Match',
          to: { name: 'team/_id' },
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
