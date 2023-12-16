import { Category as CategoryDB } from "@/types/categorytypes"
import { nextResponseJson } from "@/helpers/http-response.helper"
import { handlerGetAllCategories } from "@/repositories/categoryRepository"

export async function GET() {
  try {
    const result: CategoryDB[] = await handlerGetAllCategories()
    return nextResponseJson<CategoryDB[]>(result, { status: 200, statusText: ''})
  } catch (error) {
    return nextResponseJson<CategoryDB[]>([], { status: 500, statusText: ''})
  }
}