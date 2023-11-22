import { PrismaClient } from "@prisma/client"
import { FieldType } from "@/types/categorytypes"

const prisma = new PrismaClient()

export const handlerCreateCategory = async (formData: FieldType): Promise<boolean | number> => {
  try {
    // const users: User[] = await prisma.user.findMany()
    console.log('formData', formData)    
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
