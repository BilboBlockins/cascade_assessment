<template>
  <top-bar/>
  <div class="container">
    <user-statement-card :user="$store.state.user"/>
  </div>
</template>

<script>
import UserStatementCard from '@/components/UserStatementCard.vue'
import TopBar from '@/components/TopBar.vue'

export default {
  components: {
    TopBar,
    UserStatementCard
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  display: flex;
  justify-content: center;
}
</style>