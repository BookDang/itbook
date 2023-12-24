import { combineReducers } from "@reduxjs/toolkit"
import loadingReducer from "./features/loading/reducer"
import categoryReducer from "./features/category/reducer"

const rootReducer = combineReducers({
  loading: loadingReducer,
  category: categoryReducer
})

export default rootReducer