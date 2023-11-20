import axios from "axios"
import { FieldType } from "@/types/categorytypes"

export const createCategory = async (categoryData: FieldType) => {
  try {
    const response = await axios.post(`/api/category`, categoryData);
    return response.data;
  } catch(error) {
    console.error('Error creating category:', error);
    throw error
  }
}