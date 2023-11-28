import axios from "axios"
import { FieldType } from "@/types/categorytypes"

export const createCategory = async (categoryData: FieldType): Promise<any> => {
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

const CategoryService = {
  createCategory
}

export default CategoryService
