import axios from "axios"
import { Category as CategoryDB, FieldType } from "@/types/categorytypes"

const createCategory = async (categoryData: FieldType): Promise<any> => {
  try {
    
    const response = await axios.post(`/api/category`, categoryData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response
  } catch (error: any) {
    console.error("Error creating category:", error)
    return error.response
  }
}

const getCategories = async (): Promise<CategoryDB[]> => {
  try {
    const response = await axios.get('/api/categories')
    if (response.status !== 200) return []
    return response.data
  } catch (error: any) {
    return []
  }
}

const CategoryService = {
  createCategory,
  getCategories
}

export default CategoryService
