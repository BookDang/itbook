import axios from "axios"
import { FieldType } from "@/types/categorytypes"

export const createCategory = async (categoryData: FieldType) => {
  try {
    console.log('createCategory', categoryData);
    
    const response = await axios.post(`/api/category`, categoryData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error creating category:", error)
    throw error
  }
}
