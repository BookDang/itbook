import { createReducer } from "@reduxjs/toolkit"
import { toggleLoading } from "./actions"

const loadingReducer = createReducer(
  {
    isLoading: true,
  },
  (builder) => {
    builder
      .addCase(toggleLoading, (state, action) => {
        state.isLoading = action.payload
      })
      .addDefaultCase((state, action) => {state.isLoading = true})
  }
)

export default loadingReducer