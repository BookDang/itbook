import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { sendApiResponse } from '@/helpers/apiResponse'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const users: User[] = await prisma.user.findMany()
    // sendApiResponse(res, 200, users)
  } catch (error) {
    sendApiResponse(res, 500, { error: 'Internal Server Error' })
  }
}