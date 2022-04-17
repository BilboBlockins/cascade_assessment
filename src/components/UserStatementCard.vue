<template>
  <div class="user-card">

    <div class="bold">
      <div class="row-between">
        <div class="welcome">{{ `Welcome ${user.firstName} ${user.lastName}!`}}</div>
        <div>Member Id: {{user.userId}}</div>
      </div>

      <div class="row-right">Account #: {{user.accountNumber}}</div>
      <div class="row-right">Account Type: {{ user.accountType }}</div>
      
      <div>Statement Date: {{ statementDate }}</div>
      <div>Statement Balance: {{ statementBalance }}</div>
      <div>Current Balance: {{ currentBalance }}</div>
    </div>


      <div v-if="$store.state.statement.NotSettled.length">
        <div class="break-line"></div>
        <div class="bold heading">Pending Transactions:</div>
        <div v-for="transaction in $store.state.statement.NotSettled" :key="transaction.MerchantName">
          <div v-if="!transaction.Billed">
            <transaction-card :transaction="transaction"/>
          </div>
        </div>
      </div> 

      <div class="break-line"></div>
      <div v-if="$store.state.statement.Transactions.length">
        <div class="bold heading">Completed Transactions:</div> 
        <div v-for="transaction in $store.state.statement.Transactions" :key="transaction.MerchantName">
          <div v-if="transaction.Billed">
            <transaction-card :transaction="transaction"/>
          </div>
        </div>
      </div>

  </div>
</template>

<script>

import TransactionCard from '@/components/TransactionCard.vue'

export default {
  components: {
    TransactionCard
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      statementDate: '',
      statementBalance: '',
      currentBalance: '',
    }
  },
  created() {
    const oldestTx = this.getOldestTransaction()
    this.statementBalance = this.getBalance(oldestTx)
    this.statementDate = this.getDate(oldestTx)
    this.currentBalance = this.getCurrentBalance()
    this.$store.dispatch('setUserBalances', 
      {
        statementBalance: this.statementBalance, 
        currentBalance: this.currentBalance
      }
    )
  },
  updated() {
    console.log("component updated")
    this.currentBalance = this.getCurrentBalance()
  },
  methods: {
    getDate(tx) {
      return new Date(tx.TransactionDate).toLocaleDateString()
      
    },
    getBalance(tx) {
      return this.getCurrencyString(tx.AvailableBalance)
    },
    getCurrentBalance() {
      let statementBalance = parseFloat(this.statementBalance.replace('$', ''))
      let currentBalance = statementBalance;
      const txs = this.$store.state.statement.Transactions
      txs.forEach(tx => {
        if(tx.Billed) {
          currentBalance -= parseFloat(tx.Amount)
        }
      })
      return this.getCurrencyString(currentBalance)
    },
    getCurrencyString(num) {
      return num.toLocaleString(
        'en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    getOldestTransaction() {
      const txs = this.$store.state.statement.Transactions
      //Check to make sure we have txs
      if(txs.length) {
        let oldestDate = new Date(txs[0].TransactionDate)
        let oldestTx = txs[0]
        //find oldest
        for(let i=0; i<txs.length; i++) {
          console.log(new Date(txs[i].TransactionDate))
          if(new Date(txs[i].TransactionDate) < oldestDate) {
            oldestDate = new Date(txs[i].TransactionDate)
            oldestTx = txs[i]
          }
        }
        console.log(oldestTx)
        return oldestTx
      } else {
        return null
      }
    }
  }
}
</script>

<style>
.user-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  border-radius: .5rem;
  margin-bottom: 1rem;
  width: 600px;
  min-width: 380px;
  box-shadow: 0 0 18px 0 rgba(0,0,0,0.2);
}

.break-line {
  border-bottom: 1px solid grey;
  width:100%;
  margin-top: 15px;
  margin-bottom: 20px;
}

.row-right {
  display: flex;
  justify-content: flex-end;
}

.row-between {
  display: flex;
  justify-content: space-between;
}

.bold {
  font-weight: bold;
}

.heading {
  margin-bottom: 8px;
  text-decoration: underline;
}

.welcome {
  font-size: 18px;
  text-decoration: underline;
}
/* .column-center {
  display: flex;
  justify-content: center;
} */
</style>