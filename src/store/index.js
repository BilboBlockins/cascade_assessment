import { createStore } from 'vuex'
import StatementData from '@/data/transactions.js'
import UserData from '@/data/user.js'

export default createStore({
  state: {
    statement: StatementData.Statement,
    user: UserData
  },
  mutations: {
    UPDATE_STATEMENT(state, payload) {
      console.log(state, payload)
    },
    UPDATE_USER(state, payload) {
      console.log(state, payload)
    }
  },
  actions: {
    setUserBalances(context, payload) {
      let userState = context.state.user
      let newUserState = {...userState, ...payload}
      console.log("from user state action: ", newUserState)
      context.commit('UPDATE_USER', newUserState)
    },
    payPending(context, payload) {
      let newStatement = context.state.statement
      //filter the item from the not settled list
      let currentPending = newStatement.NotSettled
      let result = currentPending.filter(tx => tx.TransactionId !== payload.TransactionId)
      newStatement.NotSettled = result
      //update the tx array for each tx removed to show it billed
      let newTxs = newStatement.Transactions.map(tx => {
        if(tx.TransactionId === payload.TransactionId) {
          return {...tx, Billed: true}
        }
        return tx
      })
      console.log('new txs from payp:', newTxs)
      newStatement.Transactions = newTxs
      console.log('in remove pending:', payload)
      context.commit('UPDATE_STATEMENT', newStatement)
    }
  }
})