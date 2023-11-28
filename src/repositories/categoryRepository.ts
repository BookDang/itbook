import { Prisma, PrismaClient } from "@prisma/client"
import { FieldType } from "@/types/categorytypes"

const prisma = new PrismaClient()
type CreateCategory = {
  id: number
  name: string
  tags: Prisma.JsonValue
  slug: string
  successorId: number | null
  sequence: number
}

export const handlerCreateCategory = async (
  formData: FieldType
): Promise<CreateCategory | Prisma.PrismaClientKnownRequestError | boolean> => {
  try {
    const createCategory = await prisma.category.create({
      data: {
        name: formData.categoryname,
        slug: formData.categoryslug,
        // successor: {
        //   connect: {
        //     id: formData.categoryparent,
        //   },
        // },
        predecessor: {
          connect: {
            id: 1,
          },
        },
        tags: undefined,
      },
    })
    return createCategory
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("There is a unique constraint violation.")
        return error
      }
    }
    return false
  }
}
