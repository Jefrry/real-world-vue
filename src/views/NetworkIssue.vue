<template>
    <div>
        <h1>Wow!</h1>
        <h3>You have got some network issues</h3>
        <router-link :to="{name: 'event-list'}">Back to the home</router-link>
    </div>
</template>

<script>
export default {
  name: 'NetworkIssue'
}
</script>

<style scoped>
</style>
