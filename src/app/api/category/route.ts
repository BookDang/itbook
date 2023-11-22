import { NextRequest } from "next/server"
import { handlerCreateCategory } from "@/repositories/categoryRepository"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json() 
    const result = await handlerCreateCategory(formData)
    return new Response("Create successful!", {
      status: 200,
      statusText: ''
    })
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
  } catch (error) {
    return new Response("Request failed with status code 500", {
      status: 500,
    });
  }
}