import CategoryService from "@/services/categoryService"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchCategories = createAsyncThunk('FetchCategories', async () => {
  const response = await CategoryService.getCategories()
  return response
})