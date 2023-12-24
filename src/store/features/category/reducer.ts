import { createReducer } from "@reduxjs/toolkit"
import { Category } from "@/types/categorytypes"
import { fetchCategories } from "./actions";

type CategoriesState = {
  categories: Category[]
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
}

const categoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCategories.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.loading = false
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? 'An error occurred.'
    });
})

export default categoryReducer