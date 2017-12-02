import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import exampleReducer from './exampleReducer'

const reducer = combineReducers({
  exampleReducer,
  router: routerReducer
})

export default reducer