import { NextRequest } from "next/server"
import { handlerCreateCategory, handlerDeleteCategory } from "@/repositories/categoryRepository"
import { nextResponseJson } from "@/helpers/http-response.helper"
import { Category, Prisma } from "@prisma/client"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const result = await handlerCreateCategory(formData)
    if (result instanceof Prisma.PrismaClientKnownRequestError) {
      if (result.code === "P2002") {
        return nextResponseJson<boolean | Prisma.PrismaClientKnownRequestError>(result, {
          status: 422,
          statusText: "There is a unique constraint violation.",
        })
      }
    }
    if (!result) {
      throw new Error()
    }
    return nextResponseJson<Category>(result as Category, { status: 201, statusText: "Created a new category." })
  } catch (error) {
    return nextResponseJson<any>(
      { error: "Internal Server Error" },
      { status: 500, statusText: "Internal Server Error" }
    )
  }
}

export async function DELETE(request: NextRequest, params: { categoryId: number }) {
  try {
    const {categoryId} = params
    const response = handlerDeleteCategory(Number(categoryId))
    return true
  } catch (error) {
    return nextResponseJson<any>(
      { error: "Internal Server Error" },
      { status: 500, statusText: "Internal Server Error" }
    )
  }
}
