import { NextRequest, NextResponse } from "next/server"
import { nextResponseJson } from "@/helpers/http-response.helper"
import { handlerGetAllCategories } from "@/repositories/categoryRepository"
import { Category } from "@prisma/client"

export async function GET() {
  try {
    const result = await handlerGetAllCategories()
    return nextResponseJson<Category[]>(result, { status: 200, statusText: ''})
  } catch (error) {
    return nextResponseJson<Category[]>([], { status: 500, statusText: ''})
  }
}