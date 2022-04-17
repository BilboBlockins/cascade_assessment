<template>
  <div class="transaction">
  </div>
</template>

<script>
export default {
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.transaction {
  box-shadow: 0 0 12px 0 rgba(0,0,0,0.2);
  border-radius: 8px;
  width: 100%;
}
</style>