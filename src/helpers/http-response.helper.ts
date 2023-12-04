import { NextResponse } from "next/server"

export const nextResponseJson = <T>(
  result: T,
  options: {
    status: number | undefined
    statusText: string
    // header: HeadersInit,
  }
) => {
  return NextResponse.json(result, { ...options })
}

export const response = (
  body: any, 
  headers: HeadersInit, 
  status: number | undefined,
  statusText: string | undefined
): Response => {
  // const headers = new Headers()
  // headers.append("Content-Type", "application/json")
  const response = new Response(
    body, {
    status,
    statusText,
    headers,
  })
  return response
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
}
