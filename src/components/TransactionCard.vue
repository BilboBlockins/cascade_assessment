<template>
  
  <div class="transaction">
    <div class="spacer"></div>
    <div class="row-right pad">{{ getReadableDateString(transaction.TransactionDate) }}</div>

    <div class="pad">
      <div class="bold">{{ transaction.MerchantName }} - {{ transaction.MerchantId }}</div>
      <div>Type: {{ transaction.TransactionTypeId }}</div>
      <div>{{ transaction.Description }}</div>
    </div>

    <div class="pad">
        <div class="row-between" v-if="!transaction.Billed">
          <div class="bold">Amount: {{ getCurrencyString(transaction.Amount) }}</div>
          <button class="pay-btn" @click="payInstantly()">PAY INSTANTLY</button>
        </div>
        <div v-else>
          <div class="bold">Amount: {{ getCurrencyString(transaction.Amount) }}</div>
        </div>
        <div class="spacer"></div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  methods: {
    getReadableDateString(dateString) {
      let options = {
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour:'numeric', 
        minute:'numeric'
      }
      return new Date(dateString).toLocaleDateString(
        'en-US', 
        options
      )
    },
    getCurrencyString(num) {
      return num.toLocaleString(
        'en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    payInstantly() {
      console.log(this.transaction)
      this.$store.dispatch('payPending', this.transaction)
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
.transaction:hover {
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.25);
}
.pay-btn {
  color: white;
  background: green;
  border-radius: 4px;
  padding: 8px;
  width: 120px;
  font-size: 13px;
  font-weight: bold;
}
.pad {
  margin-bottom: 15px;
  padding-left: 12px;
  padding-right: 12px;
}
.spacer {
  height: 12px;
}
</style>