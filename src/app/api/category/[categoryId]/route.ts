import { NextRequest } from "next/server"
import { Category } from "@prisma/client"
import { handlerDeleteCategory, handlerGetCategory, handlerUpdateCategory } from "@/repositories/categoryRepository"
import { nextResponseJson } from "@/helpers/http-response.helper"
import { CategoryChildren } from "@/types/categorytypes"

export async function DELETE(request: NextRequest, { params }: { params: { categoryId: number } }) {
  try {
    const { categoryId } = params
    const response = await handlerDeleteCategory(Number(categoryId))
    return nextResponseJson<boolean>(response, { status: 200, statusText: "" })
  } catch (error) {
    return nextResponseJson<boolean>(false, { status: 500, statusText: "" })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { categoryId: number } }) {
  try {
    const { categoryId } = params
    const formData = await request.json()
    const response: Category | null = await handlerUpdateCategory(formData, Number(categoryId))
    return nextResponseJson<Category | null>(response, { status: 200, statusText: "Update category category" })
  } catch (error) {
    return nextResponseJson<null>(null, { status: 500, statusText: "" })
  }
}

export async function GET(request: NextRequest, { params }: { params: { categoryId: number } }) {
  try {
    const { categoryId } = params
    const response: CategoryChildren | null = await handlerGetCategory(Number(categoryId))
    return nextResponseJson<CategoryChildren | null>(response, { status: 200, statusText: "" })
  } catch (error) {
    return nextResponseJson<null>(null, { status: 500, statusText: "" })
  }
}
