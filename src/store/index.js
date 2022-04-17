import { createStore } from 'vuex'
import StatementData from '@/data/transactions.js'
import UserData from '@/data/user.js'

export default createStore({
  state: {
    statement: StatementData,
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
    }
  }
})