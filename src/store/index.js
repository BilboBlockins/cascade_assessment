import { createStore } from 'vuex'
import StatementData from '@/data/transactions.js'

export default createStore({
  state: {
    statement: StatementData
  }
})