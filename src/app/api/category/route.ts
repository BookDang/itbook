import { NextRequest, NextResponse } from "next/server"
import { handlerCreateCategory } from "@/repositories/categoryRepository"
import { nextResponseJson } from "@/helpers/http-response.helper"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json() 
    const result = await handlerCreateCategory(formData)
    if (!result) {
      throw new Error() 
    }
    return nextResponseJson(result, { status: 201, statusText: 'Created a new category.'})
  } catch (error) {
    return nextResponseJson({ error: 'Internal Server Error' }, { status: 500, statusText: 'Internal Server Error' })
  }
}