import { combineReducers } from "@reduxjs/toolkit"
import loadingReducer from "./features/loading/reducer"

const rootReducer = combineReducers({
  loading: loadingReducer
})

export default rootReducer