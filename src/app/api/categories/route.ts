import { Prisma } from "@prisma/client"
import { NextRequest } from "next/server"
import { Category as CategoryDB } from "@/types/categorytypes"
import { nextResponseJson } from "@/helpers/http-response.helper"
import { handlerDeleteManyCategoris, handlerGetAllCategories } from "@/repositories/categoryRepository"

export async function GET() {
  try {
    const result: CategoryDB[] = await handlerGetAllCategories()
    return nextResponseJson<CategoryDB[]>(result, { status: 200, statusText: ''})
  } catch (error) {
    return nextResponseJson<CategoryDB[]>([], { status: 500, statusText: ''})
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const categories = await request.json()
    const result: Prisma.BatchPayload = await handlerDeleteManyCategoris(categories)
    return nextResponseJson<Prisma.BatchPayload>(result, { status: 200, statusText: "Romove categories success!"})
  } catch (error) {
    return nextResponseJson<Prisma.BatchPayload>({count: 0}, { status: 500, statusText: "Category deletion failed!"})
  }
}