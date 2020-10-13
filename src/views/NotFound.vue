<template>
    <div>
        <h1>This is a wrong way</h1>
        <h3>The {{ resource }} you are looking for is not here</h3>
        <router-link :to="{name: 'event-list'}">Back to the home</router-link>
    </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
