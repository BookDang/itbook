import { NextRequest } from "next/server"
import { handlerDeleteCategory } from "@/repositories/categoryRepository"
import { nextResponseJson } from "@/helpers/http-response.helper";

export async function DELETE(request: NextRequest, {params}: {params: { categoryId: number }}) {
  try {
    const {categoryId} = params
    console.log('categoryId', categoryId);
    
    const response = await handlerDeleteCategory(Number(categoryId))
    return nextResponseJson<boolean>(response, { status: 200, statusText: "" })
  } catch (error) {
    return nextResponseJson<boolean>(false, { status: 500, statusText: "" })
  }
}
