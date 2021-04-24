import { combineReducers } from 'redux'

import incidentsReducer from "./reducers/incidents";

const rootReducer = combineReducers({
    incidents: incidentsReducer,
  })
  
  export default rootReducer