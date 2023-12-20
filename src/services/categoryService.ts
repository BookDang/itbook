import axios from "axios"
import { Category, Prisma } from "@prisma/client"
import { CategoryChildren, Category as CategoryDB, FieldType } from "@/types/categorytypes"
import { error } from "console"

const createCategory = async (categoryData: FieldType): Promise<any> => {
  try {
    const response = await axios.post("/api/category", categoryData, {
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

const updateCategory = async (categoryData: FieldType, categoryId: number): Promise<any> => {
  try {
    const response = await axios.put("/api/category/" + categoryId, categoryData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response
  } catch (error: any) {
    console.error("Error updating category:", error)
    return error.response
  }
}

const getCategories = async (): Promise<CategoryDB[]> => {
  try {
    const response = await axios.get("/api/categories")
    if (response.status !== 200) return []
    return response.data
  } catch (error: any) {
    return []
  }
}

const getCategory = async (categoryId: number): Promise<CategoryChildren | null> => {
  try {
    const response = await axios.get("/api/category/" + categoryId)
    if (response.status !== 200) return null
    return response.data
  } catch (error: any) {
    return null
  }
}

const deleleCategory = async (categoryId: number): Promise<boolean> => {
  try {
    const response = await axios.delete("/api/category/" + categoryId)
    if (response.status !== 200) return false
    return true
  } catch (error) {
    return false
  }
}

const deleleCategorys = async (categories: number[]): Promise<Prisma.BatchPayload> => {
  try {
    const response = await axios.delete("/api/categories", {data: categories})
    if (response.status !== 200) {
      throw new Error()
    }
    return response.data
  } catch (error) {
    return {count: 0}
  }
}

const CategoryService = {
  createCategory,
  getCategory,
  getCategories,
  deleleCategory,
  updateCategory,
  deleleCategorys
}

export default CategoryService
